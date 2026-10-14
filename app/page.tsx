import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import readingTime from "reading-time"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { BlogCard } from "@/components/cards"
import { Button } from "@/components/ui/button"

import { extractPortableText } from "@/lib/search"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

export const revalidate = 60

const categoryPills = [
  { label: "All Stories", href: "/blog", active: true },
  { label: "Fashion", href: "/category/fashion", active: false },
  { label: "Outfit Ideas", href: "/category/outfit-ideas", active: false },
  { label: "Home Decor", href: "/category/home-decor", active: false },
  { label: "Beauty", href: "/category/beauty", active: false },
  { label: "Self Care", href: "/category/self-care", active: false },
]

const faqs = [
  {
    question: "What is VelvetNest?",
    answer:
      "VelvetNest is a curated digital publication featuring effortless fashion inspiration, warm minimalist home decor ideas, beauty rituals, self-care guides, and handpicked Amazon finds.",
  },
  {
    question: "How often are new articles published?",
    answer:
      "We publish new seasonal style guides, room makeovers, and curated shopping edits every week.",
  },
  {
    question: "How do you select the products you recommend?",
    answer:
      "Every item featured in our articles and Amazon Finds directory is independently selected by our editorial team for its quality, timeless aesthetic, and everyday value.",
  },
]

function formatShortDate(dateString?: string) {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function HomePage() {
  const [hero, categories, searchPosts, blogPosts, storefrontCTA, about] =
    await Promise.all([
      client.fetch(`
        *[_type == "hero"][0]{
          eyebrow,
          title,
          subtitle,
          buttonText,
          buttonLink,
          heroImage
        }
      `),
      client.fetch(`
        *[_type == "category"]
        | order(title asc){
          _id,
          title,
          "slug": slug.current,
          image,
          "count": count(*[_type == "post" && references(^._id)])
        }
      `),
      client.fetch(`
        *[_type == "post"]{
          title,
          excerpt,
          "slug": slug.current,
          "category": category->title,
          tags,
          "searchContent": pt::text(body)
        }
      `),
      client.fetch(`
        *[_type == "post"]
        | order(featured desc, publishedAt desc)[0...6]{
          _id,
          title,
          excerpt,
          publishedAt,
          "slug": slug.current,
          mainImage,
          featured,
          markdownBody,
          body,
          "category": category->title
        }
      `),
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

  const processedBlogPosts = (blogPosts || []).map((post: any) => {
    const plainText = post.markdownBody
      ? post.markdownBody
      : extractPortableText(post.body)
    const stats = readingTime(plainText || "")

    return {
      ...post,
      readingTime: `${Math.max(1, Math.ceil(stats.minutes))} min read`,
    }
  })

  const featuredPost =
    processedBlogPosts.find((post: any) => post.featured) ||
    processedBlogPosts[0]

  const regularPosts = featuredPost
    ? processedBlogPosts.filter((post: any) => post._id !== featuredPost._id)
    : []

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header posts={searchPosts} />

      <main className="flex-1">
        {/* =========================================================
            1. EDITORIAL HERO
        ========================================================= */}
        <section className="relative overflow-hidden">
          <div className="relative h-[78vh] min-h-[520px] max-h-[760px] w-full bg-[#1c1917]">
            {hero?.heroImage && (
              <Image
                src={urlFor(hero.heroImage).width(1800).url()}
                alt={hero?.title || "VelvetNest Editorial Hero"}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={80}
                className="object-cover"
              />
            )}

            {/* Layered Editorial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />

            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e2c48e]">
                    {hero?.eyebrow || "Welcome To VelvetNest"}
                  </p>

                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium leading-[1.08] tracking-[-0.02em] text-white">
                    {hero?.title ||
                      "Elevated style, cozy interiors & intentional living."}
                  </h1>

                  {hero?.subtitle && (
                    <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-white/85">
                      {hero.subtitle}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full bg-[#d6b06f] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1917] hover:bg-[#e3c287]"
                    >
                      <Link href={hero?.buttonLink || "/blog"}>
                        {hero?.buttonText || "Explore Articles"}
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-white/80 bg-white/10 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xs hover:bg-white hover:text-[#1c1917]"
                    >
                      <Link href="/amazon-finds">Curated Amazon Finds</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. BRAND MANIFESTO BAR
        ========================================================= */}
        <section className="border-b border-border bg-muted/35 py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
              The Editorial Standard
            </p>
            <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl md:text-4xl font-medium leading-snug text-foreground">
              Timeless fashion, warm minimalist interiors, and affordable
              everyday luxury—curated for how you actually live.
            </h2>
          </div>
        </section>

        {/* =========================================================
            3. VISUAL CATEGORY PORTALS
        ========================================================= */}
        {categories?.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 md:py-24">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                    Browse by Topic
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-foreground">
                    Explore VelvetNest
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                >
                  <span>Full Archive</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category: any, index: number) => (
                <Reveal key={category._id} delay={0.05 * index}>
                  <Link
                    href={`/category/${category.slug}`}
                    className={`group relative block overflow-hidden rounded-2xl bg-muted ${
                      index === 0 && categories.length === 5
                        ? "aspect-[4/3] sm:col-span-2 lg:col-span-2 lg:aspect-[16/9]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    {category?.image && (
                      <Image
                        src={urlFor(category.image).width(1000).url()}
                        alt={category.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/75" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
                          {typeof category.count === "number"
                            ? `${category.count} ${
                                category.count === 1 ? "Article" : "Articles"
                              }`
                            : "Collection"}
                        </p>
                        <h3 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-white">
                          {category.title}
                        </h3>
                      </div>

                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================
            4. FEATURED & LATEST STORIES
        ========================================================= */}
        <section className="border-y border-border bg-muted/25 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                    Latest Editorial
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-foreground">
                    Trending on VelvetNest
                  </h2>
                </div>

                {/* Quick Category Filter Bar */}
                <div className="flex flex-wrap gap-2">
                  {categoryPills.map((pill) => (
                    <Link
                      key={pill.href}
                      href={pill.href}
                      className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                        pill.active
                          ? "bg-foreground text-background"
                          : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                      }`}
                    >
                      {pill.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* LEAD FEATURED ARTICLE */}
            {featuredPost && (
              <div className="mt-12">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-xs lg:grid-cols-12"
                >
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden bg-muted">
                    <Image
                      src={
                        featuredPost.mainImage
                          ? urlFor(featuredPost.mainImage).width(1400).url()
                          : "/about-image.webp"
                      }
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-accent/15 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                        Featured Story
                      </span>
                      {featuredPost.category && (
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          • {featuredPost.category}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.18] tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent">
                      {featuredPost.title}
                    </h3>

                    {featuredPost.excerpt && (
                      <p className="mt-4 line-clamp-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatShortDate(featuredPost.publishedAt)}</span>
                      <span>•</span>
                      <span>{featuredPost.readingTime}</span>
                    </div>

                    <div className="mt-7">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground group-hover:text-accent">
                        <span>Read Full Article</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* RECENT ARTICLES GRID */}
            {regularPosts.length > 0 && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post: any) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    category={post.category}
                    date={formatShortDate(post.publishedAt)}
                    readingTime={post.readingTime}
                    image={
                      post.mainImage
                        ? urlFor(post.mainImage).width(800).url()
                        : undefined
                    }
                  />
                ))}
              </div>
            )}

            <div className="mt-14 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-foreground bg-transparent px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. CURATED STOREFRONT CTA (Fixed 2-Column Grid)
        ========================================================= */}
        {storefrontCTA && (
          <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="overflow-hidden rounded-3xl bg-[#221d1a] text-[#f7f3ee] shadow-lg">
              <div className="grid items-center lg:grid-cols-2">
                {/* LEFT COLUMN: IMAGE */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] w-full bg-[#2c2623]">
                  {storefrontCTA?.image && (
                    <Image
                      src={urlFor(storefrontCTA.image).width(1200).url()}
                      alt={storefrontCTA?.title || "VelvetNest Curated Storefront"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* RIGHT COLUMN: CONTENT */}
                <div className="p-8 sm:p-12 md:p-16">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d6b06f]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Curated Favorites</span>
                  </div>

                  <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] text-white">
                    {storefrontCTA?.title || "Shop Our Curated Amazon Edit"}
                  </h2>

                  {storefrontCTA?.description && (
                    <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/75">
                      {storefrontCTA.description}
                    </p>
                  )}

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
                      <span>Browse All Finds</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            6. ABOUT VELVETNEST
        ========================================================= */}
        {about && (
          <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 md:py-20">
            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-xs">
                    {about?.image && (
                      <Image
                        src={urlFor(about.image).width(1000).url()}
                        alt={about?.title || "About VelvetNest"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                    Behind VelvetNest
                  </p>

                  <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-[-0.02em] text-foreground">
                    {about?.title || "Designed for slow, intentional living."}
                  </h2>

                  {about?.subtitle && (
                    <p className="mt-4 font-serif text-xl italic text-foreground/85">
                      {about.subtitle}
                    </p>
                  )}

                  {about?.description && (
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {about.description}
                    </p>
                  )}
                  <div className="mt-8">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-accent hover:text-white"
                    >
                      <span>Read Our Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* =========================================================
            7. EDITORIAL FAQ & POPULAR TOPICS
        ========================================================= */}
        <section className="border-t border-border bg-muted/20 py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                Reader Guide
              </p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
             <div className="mt-10 grid gap-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-7"
                >
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Styled Popular Topic Pills */}
            <div className="mt-14 border-t border-border pt-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Popular Destinations
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {categoryPills.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                  >
                    {topic.label}
                  </Link>
                ))}
                <Link
                  href="/amazon-finds"
                  className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-medium text-accent hover:bg-accent hover:text-white"
                >
                  Amazon Finds
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
            
                  
    
