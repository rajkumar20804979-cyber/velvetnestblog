import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const quickDestinations = [
  { label: "Fashion", href: "/category/fashion" },
  { label: "Outfit Ideas", href: "/category/outfit-ideas" },
  { label: "Home Decor", href: "/category/home-decor" },
  { label: "Beauty", href: "/category/beauty" },
  { label: "Self Care", href: "/category/self-care" },
  { label: "Amazon Finds", href: "/amazon-finds" },
]

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex flex-1 items-center justify-center px-5 py-20 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Error 404
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground">
            This page has moved or no longer exists.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            We couldn&apos;t find the page you were looking for, but there is
            plenty of inspiration waiting for you across the journal.
          </p>

          {/* Primary Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-accent hover:text-white"
            >
              <span>Return Home</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/search"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:border-accent"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search Articles</span>
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Explore Popular Collections
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {quickDestinations.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
      }
