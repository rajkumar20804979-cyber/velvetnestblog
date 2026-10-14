import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/cards"

import { client } from "@/sanity/lib/client"
import { categoryPostsQuery, categoryCountQuery } from "@/lib/queries"

/* =========================================================
   CATEGORY CONFIGURATION
========================================================= */

const categories = [
  "fashion",
  "outfit-ideas",
  "home-decor",
  "beauty",
  "self-care",
]

const categoryMeta: Record<
  string,
  { title: string; subtitle: string; manifesto: string }
> = {
  fashion: {
    title: "Fashion",
    subtitle: "Timeless Style & Wardrobe Essentials",
    manifesto:
      "Effortless capsule wardrobes, seasonal trend edits, and elevated everyday pieces designed to outlast fleeting fads.",
  },
  "outfit-ideas": {
    title: "Outfit Ideas",
    subtitle: "Curated Lookbooks for Every Occasion",
    manifesto:
      "From relaxed weekend uniform formulas to polished workwear and seasonal styling guides you can recreate with pieces you own.",
  },
  "home-decor": {
    title: "Home Decor",
    subtitle: "Warm Minimalist Interiors & Cozy Spaces",
    manifesto:
      "Thoughtful room makeovers, small-space styling tips, and tactile neutral decor to turn every corner of your home into a sanctuary.",
  },
  beauty: {
    title: "Beauty",
    subtitle: "Skincare Rituals & Everyday Glow",
    manifesto:
      "Tested skincare routines, minimalist makeup favorites, and gentle beauty rituals that prioritize healthy, radiant skin.",
  },
  "self-care": {
    title: "Self Care",
    subtitle: "Slow Living & Intentional Daily Habits",
    manifesto:
      "Mindful morning routines, restorative evening rituals, and grounded wellness practices for a calmer, more intentional life.",
  },
}

/* =========================================================
   TYPES
========================================================= */

type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

function formatShortDate(dateString?: string) {
  if (!dateString) return "Recently Published"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const info = categoryMeta[slug]

  if (!info) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${info.title} — ${info.subtitle}`,
    description: info.manifesto,
    alternates: {
      canonical: `https://www.thevelvetnest.site/category/${slug}`,
    },
  }
}

/* =========================================================
   CATEGORY PAGE
========================================================= */

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page = "1" } = await searchParams

  if (!categories.includes(slug)) {
    notFound()
  }

  const currentPage = Math.max(1, Number(page) || 1)
  const POSTS_PER_PAGE = 9
  const start = (currentPage - 1) * POSTS_PER_PAGE

  const [posts, totalPosts] = await Promise.all([
    client.fetch(categoryPostsQuery, {
      slug,
      start,
      end: start + POSTS_PER_PAGE,
    }),
    client.fetch(categoryCountQuery, { slug }),
  ])

  const totalPages = Math.ceil((totalPosts || 0) / POSTS_PER_PAGE)
  const info = categoryMeta[slug]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* =========================================================
            1. EDITORIAL CATEGORY HERO
        ========================================================= */}
        <section className="relative overflow-hidden border-b border-border bg-[#1c1917]">
          <div className="absolute inset-0">
            <Image
              src={`/categories/${slug}.jpg`}
              alt={info.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 md:py-32 text-center text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e2c48e]">
              {info.subtitle}
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-[-0.02em]">
              {info.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85">
              {info.manifesto}
            </p>
          </div>
        </section>

        {/* =========================================================
            2. TOPIC SWITCHER BAR
        ========================================================= */}
        <section className="border-b border-border bg-card/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-2 overflow-x-auto px-5 py-3.5 no-scrollbar">
            <Link
              href="/blog"
              className="shrink-0 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:border-accent hover:text-foreground"
            >
              All Topics
            </Link>

            {categories.map((catSlug) => {
              const isActive = catSlug === slug
              return (
                <Link
                  key={catSlug}
                  href={`/category/${catSlug}`}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "border border-border bg-background text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  {categoryMeta[catSlug]?.title || catSlug}
                </Link>
              )
            })}
          </div>
        </section>

        {/* =========================================================
            3. ARTICLES GRID
        ========================================================= */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {(!posts || posts.length === 0) ? (
              <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card px-8 py-20 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                  Coming Soon
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
                  No articles in {info.title} yet
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We are curating new stories for this section. Browse our other
                  lifestyle categories in the meantime.
                </p>
                <Link
                  href="/blog"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:bg-accent hover:text-white"
                >
                  <span>Explore All Articles</span>
                </Link>
              </div>
            ) : (
              <>
                {/* SECTION HEADER */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                      Curated Collection
                    </p>
                    <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-medium text-foreground">
                      {info.title} Articles
                    </h2>
                  </div>

                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Showing {posts.length} of {totalPosts || posts.length}{" "}
                    {(totalPosts || posts.length) === 1 ? "Story" : "Stories"}
                  </p>
                </div>

                {/* 3-COLUMN EDITORIAL GRID */}
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post: any) => (
                    <BlogCard
                      key={post._id}
                      title={post.title}
                      excerpt={post.excerpt}
                      image={post.mainImage?.asset?.url}
                      category={post.category?.title || info.title}
                      date={formatShortDate(post.publishedAt)}
                      slug={post.slug?.current || post.slug}
                      featured={post.featured}
                      readingTime={post.readingTime}
                    />
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination"
                    className="mt-16 flex items-center justify-center gap-2 border-t border-border pt-10"
                  >
                    {currentPage > 1 && (
                      <Link
                        href={`/category/${slug}?page=${currentPage - 1}`}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-medium text-foreground hover:border-accent"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Prev</span>
                      </Link>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1
                      const isActive = currentPage === pageNum
                      return (
                        <Link
                          key={pageNum}
                          href={`/category/${slug}?page=${pageNum}`}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-foreground text-background"
                              : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}

                    {currentPage < totalPages && (
                      <Link
                        href={`/category/${slug}?page=${currentPage + 1}`}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-medium text-foreground hover:border-accent"
                      >
                        <span>Next</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
