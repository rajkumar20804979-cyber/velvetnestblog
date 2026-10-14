import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react"
import readingTime from "reading-time"

import { CustomPortableText } from "@/components/portable-text"
import { AffiliateDisclosure } from "@/components/affiliate-disclosure"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReadingProgress } from "@/components/reading-progress"
import TableOfContents from "@/components/table-of-contents"
import MobileTOC from "@/components/mobile-toc"
import ShareButtons from "./ShareButtons"

import { headingToId } from "@/lib/heading"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { enrichAmazonProducts } from "@/lib/amazon/enrich-products"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

/* =========================================================
   SANITY DATA FETCHING
========================================================= */

async function getPost(slug: string) {
  const query = `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    excerpt,
    publishedAt,
    _updatedAt,
    featured,
    readingTime,
    tags,
    markdownBody,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    pinterestTitle,
    pinterestDescription,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          url
        }
      },
      _type == "callout" => {
        ...,
        buttonText,
        buttonLink,
        products[]{
          name,
          link
        }
      }
    },
    mainImage{
      asset->{
        url
      },
      alt,
      caption
    },
    category->{
      title,
      "slug": slug.current
    }
  }
  `

  return await client.fetch(query, { slug })
}

/* =========================================================
   HELPERS
========================================================= */

function getTableOfContents(body: any[] = []) {
  return body
    .filter(
      (block) =>
        block?._type === "block" &&
        (block?.style === "h2" || block?.style === "h3")
    )
    .map((block) => {
      const text =
        block?.children
          ?.map((child: any) => child?.text || "")
          .join("") || ""

      return {
        text,
        level: block.style,
        id: headingToId(text),
      }
    })
    .filter((item) => item.text.trim().length > 0)
}

function getPlainText(blocks: any[] = []) {
  return blocks
    .map((block) =>
      block?.children
        ?.map((child: any) => child?.text || "")
        .join("") || ""
    )
    .join(" ")
}

function formatDate(dateString?: string) {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/* =========================================================
   SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  const metaTitle = post.seoTitle || post.title
  const metaDescription = post.seoDescription || post.excerpt || ""
  const ogImage = post.mainImage?.asset?.url

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      url: `https://www.thevelvetnest.site/blog/${post.slug}`,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `https://www.thevelvetnest.site/blog/${post.slug}`,
    },
  }
}

/* =========================================================
   BLOG POST PAGE
========================================================= */

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await client.fetch(
    `
    *[
      _type == "post" &&
      slug.current != $slug &&
      category->title == $category
    ]
    | order(publishedAt desc)
    [0...3]{
      _id,
      title,
      excerpt,
      publishedAt,
      mainImage,
      "slug": slug.current,
      category->{
        title,
        "slug": slug.current
      }
    }
    `,
    {
      slug,
      category: post.category?.title || "",
    }
  )

  const enrichedBody = Array.isArray(post.body)
    ? await enrichAmazonProducts(post.body)
    : post.body

  /* Only pass H2s to TOC if you prefer a compact list, or H2+H3 */
  const toc = getTableOfContents(enrichedBody || []).filter(
    (item) => item.level === "h2"
  )

  const plainText = post.markdownBody
    ? post.markdownBody
    : getPlainText(enrichedBody || [])

  const stats = readingTime(plainText)
  const readMinutes = Math.max(1, Math.ceil(stats.minutes))

  /* Structured Data for Google Discover & Rich Snippets */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || "",
    image: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "VelvetNest Editorial",
      url: "https://www.thevelvetnest.site/about",
    },
    publisher: {
      "@type": "Organization",
      name: "VelvetNest",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thevelvetnest.site/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.thevelvetnest.site/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <ReadingProgress />
      <Header />

      <main className="bg-background">
        {/* =====================================================
            EDITORIAL ARTICLE HEADER
        ===================================================== */}
        <header className="border-b border-border/70 pt-10 pb-12 md:pt-16 md:pb-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 text-center">
            {/* Breadcrumb & Category Pill */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Articles</span>
              </Link>

              {post.category && (
                <>
                  <span className="text-border">•</span>
                  <Link
                    href={`/category/${post.category.slug}`}
                    className="rounded-full bg-muted px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white"
                  >
                    {post.category.title}
                  </Link>
                </>
              )}
            </div>

            {/* Article Title */}
            <h1 className="mx-auto max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.12] tracking-[-0.02em] text-foreground">
              {post.title}
            </h1>

            {/* Subtitle / Standfirst Excerpt */}
            {post.excerpt && (
              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg md:text-[1.15rem] leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            )}

            {/* Editorial Byline & Metadata */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                By VelvetNest Editorial
              </span>

              <span className="text-border">|</span>

              {post.publishedAt && (
                <div className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              )}

              <span className="text-border">|</span>

              <div className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>{readMinutes} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            HERO FEATURE IMAGE
        ===================================================== */}
        {post.mainImage?.asset?.url && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 md:pt-12">
            <figure>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-muted shadow-sm">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
              {post.mainImage.caption && (
                <figcaption className="mt-3 text-center text-xs italic text-muted-foreground">
                  {post.mainImage.caption}
                </figcaption>
              )}
            </figure>
          </section>
        )}

        {/* =====================================================
            MAIN READING GRID (Sticky TOC + 68ch Article Body)
        ===================================================== */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT RAIL: Sticky Desktop Table of Contents */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-8">
                {toc.length > 0 && <TableOfContents items={toc} />}
                <div className="border-t border-border pt-6">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Share Article
                  </p>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </aside>

            {/* CENTER COLUMN: Constrained 68ch Article Prose */}
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="mx-auto max-w-[68ch]">
                {/* Subtle Reader-Supported Disclosure */}
                <AffiliateDisclosure />

                {/* Collapsible Mobile TOC & Share Bar */}
                <div className="my-6 lg:hidden space-y-4">
                  {toc.length > 0 && <MobileTOC items={toc} />}
                  <div className="flex items-center justify-between border-y border-border/70 py-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Share
                    </span>
                    <ShareButtons title={post.title} />
                  </div>
                </div>

                {/* Article Content */}
                <article className="prose max-w-none">
                  {post.markdownBody ? (
                    <ReactMarkdown>{post.markdownBody}</ReactMarkdown>
                  ) : (
                    <CustomPortableText value={enrichedBody} />
                  )}
                </article>

                {/* Post Tags Footer */}
                {post.tags?.length > 0 && (
                  <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                    <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Topics:
                    </span>
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-foreground"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Bottom Share Bar */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-6">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="font-serif text-lg font-medium text-foreground">
                      Enjoyed this piece? Share it with a friend.
                    </span>
                  </div>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RELATED ARTICLES
        ===================================================== */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Keep Exploring
                  </p>
                  <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium tracking-[-0.02em] text-foreground">
                    More in {post.category?.title || "The Edit"}
                  </h2>
                </div>
                <Link
                  href={
                    post.category?.slug
                      ? `/category/${post.category.slug}`
                      : "/blog"
                  }
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground underline underline-offset-4 hover:text-accent"
                >
                  View All →
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related: any) => (
                  <Link
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={
                          related.mainImage
                            ? urlFor(related.mainImage).width(700).url()
                            : "/about-image.webp"
                        }
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {related.category?.title && (
                        <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                          {related.category.title}
                        </span>
                      )}
                      <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug text-foreground group-hover:text-accent line-clamp-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {related.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
            }
              
