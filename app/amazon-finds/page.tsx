import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Sparkles, ShoppingBag } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/cards"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export const revalidate = 60

const AMAZON_STOREFRONT_URL = "https://a.co/d/0i6traEg"

export const metadata: Metadata = {
  title: "Curated Amazon Finds — Home Decor, Fashion & Beauty",
  description:
    "Shop VelvetNest's handpicked Amazon finds, from elevated neutral home decor and organization essentials to capsule wardrobe staples and beauty favorites.",
  alternates: {
    canonical: "https://www.thevelvetnest.site/amazon-finds",
  },
}

async function getAmazonFinds() {
  try {
    return await client.fetch(`
      *[_type == "amazonFind"] | order(_createdAt desc){
        _id,
        title,
        price,
        originalPrice,
        category,
        recommendation,
        link,
        amazonUrl,
        image
      }
    `)
  } catch {
    return []
  }
}

export default async function AmazonFindsPage() {
  const products = await getAmazonFinds()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* =========================================================
            1. SHOPPABLE EDITORIAL HERO
        ========================================================= */}
        <section className="border-b border-border bg-muted/35 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>The VelvetNest Edit</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground">
              Curated Amazon Finds
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Affordable luxury for your wardrobe and home. Every piece is
              hand-selected for its timeless design, elevated texture, and
              everyday utility.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={AMAZON_STOREFRONT_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-white"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Open Full Amazon Storefront</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:border-accent"
              >
                <span>Read Shopping Guides</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. PRODUCTS GRID OR STOREFRONT PORTALS
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <AffiliateDisclosure />
          </div>

          {products && products.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item: any) => (
                <ProductCard
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  category={item.category || "Amazon Find"}
                  recommendation={item.recommendation}
                  link={item.link || item.amazonUrl || AMAZON_STOREFRONT_URL}
                  image={
                    item.image
                      ? typeof item.image === "string"
                        ? item.image
                        : urlFor(item.image).width(600).url()
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            /* Curated Storefront Category Portals if no individual products are in Sanity yet */
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Cozy Neutral Home & Decor",
                  desc: "Bouclé accents, ceramic vases, linen bedding, and warm ambient lighting.",
                  badge: "Home Edit",
                },
                {
                  title: "Capsule Wardrobe Staples",
                  desc: "Elevated basics, tailored layers, and timeless accessories that look designer.",
                  badge: "Fashion Edit",
                },
                {
                  title: "Beauty & Daily Rituals",
                  desc: "Vanity organizers, skincare tools, and spa-worthy self-care essentials.",
                  badge: "Beauty Edit",
                },
              ].map((collection) => (
                <a
                  key={collection.title}
                  href={AMAZON_STOREFRONT_URL}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
                >
                  <div>
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {collection.badge}
                    </span>
                    <h2 className="mt-4 font-serif text-2xl font-medium text-foreground group-hover:text-accent">
                      {collection.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {collection.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground group-hover:text-accent">
                    <span>Shop Collection on Amazon</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
              }
