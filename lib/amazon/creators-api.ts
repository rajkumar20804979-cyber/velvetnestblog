// lib/amazon/creators-api.ts

type AmazonImage = {
  url: string;
  height?: number;
  width?: number;
};

type AmazonItem = {
  asin: string;
  detailPageURL?: string;
  images?: {
    primary?: {
      large?: AmazonImage;
      medium?: AmazonImage;
      small?: AmazonImage;
    };
  };
  itemInfo?: {
    title?: {
      displayValue?: string;
    };
    features?: {
      displayValues?: string[];
    };
  };
};

type AmazonGetItemsResponse = {
  itemsResult?: {
    items?: AmazonItem[];
  };
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
};

type AmazonTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

const AMAZON_TOKEN_URL = "https://api.amazon.com/auth/o2/token";
const AMAZON_API_URL = "https://creatorsapi.amazon";
const AMAZON_MARKETPLACE =
  process.env.AMAZON_MARKETPLACE || "www.amazon.com";

const AMAZON_PARTNER_TAG = process.env.AMAZON_PARTNER_TAG;

let cachedToken: CachedToken | null = null;

/**
 * Gets an OAuth access token from Amazon Creators API.
 *
 * Amazon access tokens are valid for 1 hour.
 * We keep the token in memory and reuse it until it is
 * close to expiration.
 */
async function getAccessToken(): Promise<string> {
  const credentialId = process.env.AMAZON_CREDENTIAL_ID;
  const credentialSecret = process.env.AMAZON_CREDENTIAL_SECRET;

  if (!credentialId) {
    throw new Error(
      "Missing AMAZON_CREDENTIAL_ID environment variable."
    );
  }

  if (!credentialSecret) {
    throw new Error(
      "Missing AMAZON_CREDENTIAL_SECRET environment variable."
    );
  }

  // Reuse the cached token if it still has more than
  // 60 seconds remaining.
  if (
    cachedToken &&
    cachedToken.expiresAt > Date.now() + 60_000
  ) {
    return cachedToken.accessToken;
  }

  const response = await fetch(AMAZON_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: credentialId,
      client_secret: credentialSecret,
      scope: "creatorsapi::default",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Amazon authentication failed (${response.status}): ${errorText}`
    );
  }

  const data =
    (await response.json()) as AmazonTokenResponse;

  if (!data.access_token) {
    throw new Error(
      "Amazon authentication succeeded but no access token was returned."
    );
  }

  cachedToken = {
    accessToken: data.access_token,

    // Keep a small safety margin before Amazon's
    // reported expiration time.
    expiresAt:
      Date.now() +
      Math.max(data.expires_in - 60, 60) * 1000,
  };

  return data.access_token;
}

/**
 * Retrieve Amazon product information by ASIN.
 *
 * This function is intended to run only on the server.
 */
export async function getAmazonProduct(
  asin: string
): Promise<AmazonItem | null> {
  if (!AMAZON_PARTNER_TAG) {
    throw new Error(
      "Missing AMAZON_PARTNER_TAG environment variable."
    );
  }

  const normalizedAsin = asin.trim().toUpperCase();

  if (!normalizedAsin) {
    throw new Error("Amazon ASIN is required.");
  }

  const accessToken = await getAccessToken();

  const response = await fetch(
    `${AMAZON_API_URL}/catalog/v1/getItems`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "x-marketplace": AMAZON_MARKETPLACE,
      },
      body: JSON.stringify({
        itemIds: [normalizedAsin],
        itemIdType: "ASIN",
        marketplace: AMAZON_MARKETPLACE,
        partnerTag: AMAZON_PARTNER_TAG,

        resources: [
          "images.primary.large",
          "images.primary.medium",
          "images.primary.small",
          "itemInfo.title",
          "itemInfo.features",
        ],
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Amazon GetItems request failed (${response.status}): ${errorText}`
    );
  }

  const data =
    (await response.json()) as AmazonGetItemsResponse;

  if (data.errors && data.errors.length > 0) {
    const firstError = data.errors[0];

    throw new Error(
      `Amazon API error${
        firstError.code ? ` (${firstError.code})` : ""
      }: ${
        firstError.message || "Unknown Amazon API error."
      }`
    );
  }

  const item = data.itemsResult?.items?.[0];

  if (!item) {
    return null;
  }

  return item;
}

/**
 * Converts an Amazon API item into the small set of
 * product information our Velvet Nest components need.
 */
export function normalizeAmazonProduct(
  item: AmazonItem
) {
  return {
    asin: item.asin,

    title:
      item.itemInfo?.title?.displayValue ||
      "Amazon Product",

    image:
      item.images?.primary?.large?.url ||
      item.images?.primary?.medium?.url ||
      item.images?.primary?.small?.url ||
      null,

    amazonUrl:
      item.detailPageURL ||
      `https://${AMAZON_MARKETPLACE}/dp/${item.asin}?tag=${AMAZON_PARTNER_TAG}`,

    features:
      item.itemInfo?.features?.displayValues || [],
  };
    }
