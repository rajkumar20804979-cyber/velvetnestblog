// lib/amazon/enrich-products.ts

import {
  getAmazonProduct,
  normalizeAmazonProduct,
} from "./creators-api"

type AmazonProductBlock = {
  _type: "amazonProduct"
  inputType?: "asin" | "affiliateLink"
  asin?: string
  affiliateLink?: string
  recommendation?: string
  label?: string
  [key: string]: any
}

/**
 * Extract an ASIN from a normal Amazon product URL.
 *
 * Supports URLs such as:
 * https://www.amazon.com/dp/B0XXXXXXXX
 * https://www.amazon.com/gp/product/B0XXXXXXXX
 * https://amazon.com/dp/B0XXXXXXXX/?tag=example-20
 */
function extractAsinFromAmazonUrl(
  url: string
): string | null {
  try {
    const parsedUrl = new URL(url)

    const match = parsedUrl.pathname.match(
      /(?:\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/i
    )

    if (!match) {
      return null
    }

    return match[1].toUpperCase()
  } catch {
    return null
  }
}

/**
 * Get the ASIN from an Amazon Product Sanity block.
 *
 * The block can use either:
 * - a manually entered ASIN
 * - an Amazon affiliate/product URL
 */
function getAsinFromBlock(
  block: AmazonProductBlock
): string | null {
  if (block.inputType === "asin") {
    const asin = block.asin?.trim().toUpperCase()

    if (!asin || !/^[A-Z0-9]{10}$/.test(asin)) {
      return null
    }

    return asin
  }

  if (block.inputType === "affiliateLink") {
    if (!block.affiliateLink) {
      return null
    }

    return extractAsinFromAmazonUrl(
      block.affiliateLink
    )
  }

  // Fallback for blocks where inputType has not been set.
  if (block.asin) {
    const asin = block.asin.trim().toUpperCase()

    if (/^[A-Z0-9]{10}$/.test(asin)) {
      return asin
    }
  }

  if (block.affiliateLink) {
    return extractAsinFromAmazonUrl(
      block.affiliateLink
    )
  }

  return null
}

/**
 * Enriches Amazon Product blocks in a Portable Text body
 * with product information retrieved from Amazon Creators API.
 *
 * All other Portable Text blocks are returned unchanged.
 */
export async function enrichAmazonProducts(
  body: any[]
): Promise<any[]> {
  if (!Array.isArray(body)) {
    return body
  }

  const amazonBlocks = body.filter(
    (block): block is AmazonProductBlock =>
      block?._type === "amazonProduct"
  )

  if (amazonBlocks.length === 0) {
    return body
  }

  const enrichedProducts = await Promise.all(
    amazonBlocks.map(async (block) => {
      const asin = getAsinFromBlock(block)

      if (!asin) {
        console.error(
          "Amazon Product: Could not determine ASIN.",
          {
            inputType: block.inputType,
          }
        )

        return {
          ...block,
          productData: null,
        }
      }

      try {
        const amazonItem =
          await getAmazonProduct(asin)

        if (!amazonItem) {
          console.error(
            `Amazon Product: No product found for ASIN ${asin}.`
          )

          return {
            ...block,
            productData: null,
          }
        }

        return {
          ...block,
          productData:
            normalizeAmazonProduct(amazonItem),
        }
      } catch (error) {
        console.error(
          `Amazon Product: Failed to fetch ASIN ${asin}.`,
          error
        )

        return {
          ...block,
          productData: null,
        }
      }
    })
  )

  let amazonIndex = 0

  return body.map((block) => {
    if (block?._type !== "amazonProduct") {
      return block
    }

    const enrichedBlock =
      enrichedProducts[amazonIndex]

    amazonIndex += 1

    return enrichedBlock
  })
}
