import { NextResponse } from "next/server"
import {
  getAmazonProduct,
  normalizeAmazonProduct,
} from "@/lib/amazon/creators-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asin = searchParams.get("asin")

  if (!asin) {
    return NextResponse.json(
      {
        success: false,
        error: "Please provide an ASIN.",
      },
      { status: 400 }
    )
  }

  try {
    const item = await getAmazonProduct(asin)

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          error: "Amazon returned no product for this ASIN.",
        },
        { status: 404 }
      )
    }

    const product = normalizeAmazonProduct(item)

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error("Amazon API test failed:", error)

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Amazon API error.",
      },
      { status: 500 }
    )
  }
      }
