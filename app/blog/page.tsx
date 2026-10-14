import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/cards"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "The Journal — Fashion, Home Decor & Lifestyle",
  description:
    "Explore effortless fashion inspiration, warm minimalist interiors, beauty favorites, and intentional living guides curated by VelvetNest.",
  alternates: {
    canonical: "https://www.thevelvetnest.site/blog",
  },
}

/* =========================================================
   CATEGORY FILTER PILLS
========================================================= */

const filterCategories = [
  { slug: "", label: "All Stories", href: "/blog" },
  { slug: "fashion", label: "Fashion", href: "/blog?category=fashion" },
  {
    slug: "outfit-ideas",
    label: "Outfit Ideas",
    href: "/blog?category=outfit-ideas",
  },
  {
    slug: "home-decor",
    label: "Home Decor",
    href: "/blog?category=home-decor",
  },
  { slug: "beauty", label: "Beauty", href: "/blog?category=beauty" },
  { slug: "self-care", label: "Self Care", href: "/blog?category=self-care" },
]

/* =========================================================
   DATA FETCHING
========================================================= */

async function getPosts(category?: string) {
  const query = category
    ? `*[
        _type == "post" &&
        category->slug.current == $category
      ] | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
        readingTime,
        featured,
        "slug": slug.current,
        mainImage,
        "category": category->title
      }`
    : `*[_type == "post"]
      | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        excerpt,
        publishedAt,
        readingTime,
        featured,
        "slug": slug.current,
        mainImage,
        "category": category->title
      }`

  return await client.fetch(query, { category })
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
   TYPES
========================================================= */

interface BlogPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

/* =========================================================
   BLOG ARCHIVE PAGE
========================================================= */

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams

  const [posts, storefrontCTA, about] = await Promise.all([
    getPosts(category),
    client.fetch(`
      *[_type == "storefrontCTA"][0]{
        title,
        description,
        buttonText,
        buttonLink,
        image
      }
    `),
    client.fetch(`
      *[_type == "aboutPage"][0]{
        title,
        subtitle,
        description,
        image
      }
    `),
  ])

  const featuredPost = posts?.[0]
  const remainingPosts = posts?.slice(1) || []

  const activeCategoryObj = filterCategories.find(
    (item) => item.slug === (category || "")
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* =========================================================
            1. EDITORIAL JOURNAL HEADER
        ========================================================= */}
        <section className="border-b border-border bg-muted/25 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              The VelvetNest Journal
            </p>

            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.12] tracking-[-0.02em] text-foreground">
              {activeCategoryObj && activeCategoryObj.slug
                ? `${activeCategoryObj.label} Edit`
                : "Stories & Inspiration"}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Effortless personal style, warm minimalist interiors, beauty
              rituals, and intentional everyday living—thoughtfully curated for
              modern living.
            </p>
          </div>
        </section>

        {/* =========================================================
            2. STICKY CATEGORY FILTER BAR
        ========================================================= */}
        <section className="sticky top-16 md:top-[72px] z-30 border-b border-border bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-start sm:justify-center gap-2 overflow-x-auto px-5 py-3.5 no-scrollbar">
            {filterCategories.map((item) => {
              const isActive = (category || "") === item.slug

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </section>

        {/* =========================================================
            3. EMPTY STATE (If a filtered category has 0 posts)
        ========================================================= */}
        {(!posts || posts.length === 0) && (
          <section className="mx-auto max-w-3xl px-5 py-20 text-center">
            <div className="rounded-3xl border border-dashed border-border bg-card p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Coming Soon
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
                No articles in this collection yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                We are currently preparing new stories for this topic. In the
                meantime, explore our full journal archive.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:bg-accent hover:text-white"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        )}

        {/* =========================================================
            4. LEAD FEATURED STORY
        ========================================================= */}
        {featuredPost && (
          <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                Featured Story
              </p>
              <span className="text-xs text-muted-foreground">
                {posts.length} {posts.length === 1 ? "Article" : "Articles"}
              </span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-xs lg:grid-cols-12"
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-muted">
                <Image
                  src={
                    featuredPost.mainImage
                      ? urlFor(featuredPost.mainImage).width(1400).url()
                      : "/about-image.webp"
                  }
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {featuredPost.category && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-background/95 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
                      {featuredPost.category}
                    </span>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {formatShortDate(featuredPost.publishedAt)}
                  {featuredPost.readingTime
                    ? ` • ${featuredPost.readingTime} min read`
                    : ""}
                </p>

                <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.18] tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt && (
                  <p className="mt-4 line-clamp-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                )}

                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground group-hover:text-accent">
                    <span>Read Full Story</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* =========================================================
            5. REMAINING ARTICLES GRID
        ========================================================= */}
        {remainingPosts.length > 0 && (
          <section className="border-t border-border py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                    Curated Archive
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-foreground">
                    Latest Stories
                  </h2>
                </div>

                {category && (
                  <Link
                    href="/blog"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Clear Filter
                  </Link>
                )}
              </div>

              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post: any) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    excerpt={post.excerpt}
                    image={
                      post.mainImage
                        ? urlFor(post.mainImage).width(800).url()
                        : undefined
                    }
                    category={post.category}
                    date={formatShortDate(post.publishedAt)}
                    readingTime={post.readingTime}
                    slug={post.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            6. STOREFRONT CTA
        ========================================================= */}
        {storefrontCTA && (
          <section className="border-t border-border py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-3xl bg-[#221d1a] text-white shadow-lg">
                <div className="grid items-center lg:grid-cols-2">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] bg-[#2c2623]">
                    {storefrontCTA?.image && (
                      <Image
                        src={urlFor(storefrontCTA.image).width(1200).url()}
                        alt={storefrontCTA.title || "VelvetNest Storefront"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="p-8 sm:p-12 md:p-16">
                    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d6b06f]">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Shop Our Favorites</span>
                    </div>

                    <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] text-white">
                      {storefrontCTA?.title}
                    </h2>

                    <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/75">
                      {storefrontCTA?.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href={
                          storefrontCTA?.buttonLink || "https://a.co/d/0i54mdf3"
                        }
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-2 rounded-full bg-[#d6b06f] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1917] hover:bg-[#e3c287]"
                      >
                        <span>
                          {storefrontCTA?.buttonText || "Visit Storefront"}
                        </span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>

                      <Link
                        href="/amazon-finds"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/10"
                      >
                        <span>Amazon Finds</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            7. ABOUT SECTION
        ========================================================= */}
        {about && (
          <section className="border-t border-border py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="grid items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                    {about?.image && (
                      <Image
                        src={urlFor(about.image).width(1000).url()}
                        alt="About VelvetNest"
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                    About VelvetNest
                  </p>

                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] text-foreground">
                    {about?.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {about?.description}
                  </p>

                  <Link
                    href="/about"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-foreground hover:text-background"
                  >
                    <span>Read Our Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
               }
                                   
