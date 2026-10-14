import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { ProductCard } from "@/components/cards"
import { PinterestSaveButton } from "@/components/pinterest-save-button"
import { headingToId } from "@/lib/heading"
import Table from "@/components/portable-text/Table"
import MessageBox from "@/components/portable-text/MessageBox"

/* =========================================================
   HELPERS
========================================================= */

function extractBlockText(value: any, children: any): string {
  if (Array.isArray(value?.children)) {
    return value.children.map((c: any) => c?.text || "").join("")
  }
  if (Array.isArray(children)) {
    return children
      .map((child) =>
        typeof child === "string" ? child : child?.props?.children || ""
      )
      .join("")
  }
  return String(children || "")
}

function isDisclosureParagraph(text: string): boolean {
  const lower = text.toLowerCase()
  return (
    lower.includes("affiliate") ||
    lower.includes("commission") ||
    lower.includes("amazon associate") ||
    lower.includes("trusted partners")
  )
}

/* =========================================================
   PORTABLE TEXT COMPONENT FACTORY
========================================================= */

function createComponents(firstParagraphKey?: string): PortableTextComponents {
  return {
    block: {
      normal: ({ children, value }: any) => {
        const applyDropCap =
          Boolean(firstParagraphKey) && value?._key === firstParagraphKey

        return (
          <p
            className={`mb-6 text-[1.0625rem] md:text-[1.125rem] leading-[1.8] text-foreground/90 antialiased ${
              applyDropCap ? "drop-cap" : ""
            }`}
          >
            {children}
          </p>
        )
      },

      h1: ({ children, value }: any) => {
        const id = headingToId(extractBlockText(value, children))
        return (
          <h2
            id={id}
            className="scroll-mt-28 mt-14 mb-5 font-serif text-3xl sm:text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-foreground"
          >
            {children}
          </h2>
        )
      },

      h2: ({ children, value }: any) => {
        const id = headingToId(extractBlockText(value, children))
        return (
          <h2
            id={id}
            className="scroll-mt-28 mt-12 md:mt-16 mb-4 font-serif text-2xl sm:text-3xl md:text-[2.15rem] font-semibold leading-[1.2] tracking-[-0.015em] text-foreground"
          >
            {children}
          </h2>
        )
      },

      h3: ({ children, value }: any) => {
        const id = headingToId(extractBlockText(value, children))
        return (
          <h3
            id={id}
            className="scroll-mt-24 mt-9 md:mt-12 mb-3 font-serif text-xl sm:text-2xl md:text-[1.6rem] font-semibold leading-[1.28] tracking-[-0.01em] text-foreground"
          >
            {children}
          </h3>
        )
      },

      h4: ({ children, value }: any) => {
        const id = headingToId(extractBlockText(value, children))
        return (
          <h4
            id={id}
            className="scroll-mt-24 mt-7 mb-2.5 font-sans text-base sm:text-lg font-semibold leading-snug text-foreground"
          >
            {children}
          </h4>
        )
      },

      blockquote: ({ children }: any) => (
        <blockquote className="my-8 md:my-10 rounded-r-2xl border-l-[3px] border-accent bg-muted/50 px-6 py-5 font-serif text-xl md:text-2xl italic leading-relaxed text-foreground">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }: any) => (
        <ul className="my-6 ml-5 list-disc space-y-2.5 text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-foreground/90 marker:text-accent">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="my-6 ml-5 list-decimal space-y-2.5 text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-foreground/90 marker:font-semibold marker:text-accent">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }: any) => <li className="pl-1.5">{children}</li>,
      number: ({ children }: any) => <li className="pl-1.5">{children}</li>,
    },

    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-foreground/85">{children}</em>
      ),
      link: ({ children, value }: any) => {
        const href = value?.href || "#"
        const isInternal = href.startsWith("/") || href.startsWith("#")

        if (isInternal) {
          return (
            <Link
              href={href}
              className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent hover:text-foreground"
            >
              {children}
            </Link>
          )
        }

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent hover:text-foreground"
          >
            {children}
          </a>
        )
      },
    },

    types: {
      image: ({ value }: any) => {
        if (!value?.asset?.url) return null

        return (
          <figure className="group my-10 md:my-12">
            <div className="relative overflow-hidden rounded-2xl bg-muted shadow-xs">
              <PinterestSaveButton
                imageUrl={value.asset.url}
                description={value.caption || value.alt || ""}
              />
              <Image
                src={value.asset.url}
                alt={value.alt || "VelvetNest editorial image"}
                width={1200}
                height={1500}
                sizes="(max-width: 768px) 100vw, 720px"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </div>

            {value.caption && (
              <figcaption className="mt-3 text-center text-xs sm:text-sm italic text-muted-foreground">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },

      amazonProduct: ({ value }: any) => {
        const product = value?.productData
        if (!product) return null

        return (
          <div className="my-10">
            <ProductCard
              title={product.title}
              image={product.image || undefined}
              link={product.amazonUrl}
              recommendation={value.recommendation}
              category={value.label || "Editor's Pick"}
            />
          </div>
        )
      },

      table: ({ value }: any) => <Table value={value} />,

      messageBox: ({ value }: any) => <MessageBox value={value} />,

      linkBlock: ({ value }: any) => (
        <div className="my-8 flex justify-center">
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background no-underline shadow-xs hover:bg-accent hover:text-white"
          >
            <span>{value.text}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ),

      comparison: ({ value }: any) => (
        <section className="my-10">
          {value.title && (
            <h3 className="mb-5 text-center font-serif text-2xl sm:text-3xl font-semibold text-foreground">
              {value.title}
            </h3>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h4 className="mb-2.5 font-serif text-xl font-semibold text-foreground">
                {value.leftTitle}
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {value.leftText}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <h4 className="mb-2.5 font-serif text-xl font-semibold text-foreground">
                {value.rightTitle}
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {value.rightText}
              </p>
            </div>
          </div>
        </section>
      ),

      callout: ({ value }: any) => (
        <aside className="my-9 rounded-2xl border border-border bg-muted/50 p-6 sm:p-7 shadow-xs">
          {value.title && (
            <div className="mb-2.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-accent" />
              <h4 className="font-serif text-xl font-semibold text-foreground m-0">
                {value.title}
              </h4>
            </div>
          )}

          {value.text && (
            <p className="mb-0 text-base leading-relaxed text-foreground/85">
              {value.text}
            </p>
          )}

          {value?.buttonText && value?.buttonLink && (
            <div className="mt-5">
              <a
                href={value.buttonLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs sm:text-sm font-medium text-background !no-underline shadow-xs hover:bg-accent hover:text-white"
              >
                <span>{value.buttonText}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          )}

          {value.products?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 pt-2">
              {value.products.map((product: any, index: number) => (
                <a
                  key={index}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground !no-underline hover:border-accent hover:text-accent"
                >
                  <span>{product.name}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              ))}
            </div>
          )}
        </aside>
      ),
    },
  }
}

/* =========================================================
   MAIN EXPORT
========================================================= */

export function CustomPortableText({ value }: { value: any[] }) {
  const blocks = Array.isArray(value) ? value : []

  /* Deterministically find the first eligible paragraph for the editorial drop-cap */
  const firstEligibleBlock = blocks.find((block) => {
    if (block?._type !== "block" || (block?.style && block.style !== "normal")) {
      return false
    }
    const text =
      block?.children?.map((c: any) => c?.text || "").join(" ").trim() || ""
    return text.length > 40 && !isDisclosureParagraph(text)
  })

  const components = createComponents(firstEligibleBlock?._key)

  return (
    <div className="mx-auto max-w-[68ch]">
      <PortableText value={blocks} components={components} />
    </div>
  )
              }
                                   
