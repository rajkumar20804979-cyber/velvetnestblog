"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { FaPinterestP } from "react-icons/fa"
import { motion } from "framer-motion"

/* =========================================================
   BLOG CARD
========================================================= */

interface BlogCardProps {
  title: string
  excerpt?: string
  image?: string
  category?: string
  date?: string
  slug?: string
  featured?: boolean
  readingTime?: number | string
}

export function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  slug,
  featured = false,
  readingTime,
}: BlogCardProps) {
  const imageSrc = image || "/about-image.webp"
  const [imageLoaded, setImageLoaded] = useState(false)

  const postUrl = slug && slug.length > 0 ? `/blog/${slug}` : "/blog"

  const handlePinterestShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${postUrl}`
        : ""

    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      shareUrl
    )}&media=${encodeURIComponent(imageSrc)}&description=${encodeURIComponent(
      title
    )}`

    window.open(pinterestUrl, "_blank", "width=750,height=600")
  }

  const formattedReadingTime =
    typeof readingTime === "number" ? `${readingTime} min read` : readingTime

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Link href={postUrl} className="flex flex-1 flex-col">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority={featured}
            onLoad={() => setImageLoaded(true)}
            className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? "scale-100 opacity-100" : "scale-102 opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* CATEGORY PILL */}
          <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
            <span className="rounded-full bg-background/95 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-2xs backdrop-blur-md">
              {category || "Lifestyle"}
            </span>

            {featured && (
              <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-background">
                Featured
              </span>
            )}
          </div>

          {/* PINTEREST SAVE BUTTON */}
          <button
            type="button"
            onClick={handlePinterestShare}
            aria-label={`Pin "${title}" to Pinterest`}
            title="Save to Pinterest"
            className="absolute right-3.5 top-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-90 shadow-2xs backdrop-blur-md transition-all hover:bg-[#E60023] hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
          >
            <FaPinterestP className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-1 flex-col pt-5">
          {(date || formattedReadingTime) && (
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {date && <span>{date}</span>}
              {date && formattedReadingTime && <span className="text-border">•</span>}
              {formattedReadingTime && <span>{formattedReadingTime}</span>}
            </div>
          )}

          <h3 className="line-clamp-2 font-serif text-xl sm:text-2xl font-medium leading-[1.25] tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )}

          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all group-hover:gap-2.5 group-hover:text-accent">
              <span>Read Story</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

/* =========================================================
   PRODUCT CARD (Works in grids & inside blog posts)
========================================================= */

interface ProductCardProps {
  title: string
  price?: string
  originalPrice?: string
  image?: string
  link?: string
  category?: string
  recommendation?: string
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  link,
  category,
  recommendation,
}: ProductCardProps) {
  const imageSrc = image || "/about-image.webp"
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="not-prose group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <a
        href={link || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex flex-1 flex-col"
      >
        {/* PRODUCT IMAGE */}
        <div className="relative aspect-square w-full overflow-hidden bg-white p-4">
          <Image
            src={imageSrc}
            alt={title}
            fill
            onLoad={() => setImageLoaded(true)}
            className={`object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* EDITORIAL BADGE */}
          <div className="absolute left-3.5 top-3.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur-md">
              <Sparkles className="h-2.5 w-2.5 text-accent" />
              <span>{category || "VelvetNest Pick"}</span>
            </span>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-1 flex-col border-t border-border/60 p-5">
          <h3 className="line-clamp-2 font-serif text-xl font-medium leading-snug text-foreground group-hover:text-accent">
            {title}
          </h3>

          {recommendation && (
            <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {recommendation}
            </p>
          )}

          {(price || originalPrice) && (
            <div className="mt-3 flex items-baseline gap-2.5">
              {price && (
                <span className="text-base font-semibold text-foreground">
                  {price}
                </span>
              )}
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          )}

          {/* ALWAYS-VISIBLE CTA BUTTON FOR MOBILE & DESKTOP CONVERSION */}
          <div className="mt-auto pt-4">
            <span className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors group-hover:bg-accent group-hover:text-white">
              <span>Shop on Amazon</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  )
          }
