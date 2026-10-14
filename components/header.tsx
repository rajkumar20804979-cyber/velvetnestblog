"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, Search, X, ArrowUpRight } from "lucide-react"
import { FaPinterestP } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

import { SearchDialog } from "@/components/search-dialog"

/* =========================================================
   TYPES
========================================================= */

interface HeaderProps {
  posts?: {
    title: string
    slug: string
    category?: string
    excerpt?: string
    tags?: string[]
    searchContent?: string
  }[]
}

/* =========================================================
   NAVIGATION DATA
========================================================= */

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/blog", label: "Articles", external: false },
  { href: "/amazon-finds", label: "Amazon Finds", external: false },
  {
    href: "https://a.co/d/0i54mdf3",
    label: "Storefront",
    external: true,
  },
  { href: "/about", label: "About", external: false },
  { href: "/contact", label: "Contact", external: false },
]

const categories = [
  { label: "Fashion", slug: "fashion" },
  { label: "Outfit Ideas", slug: "outfit-ideas" },
  { label: "Home Decor", slug: "home-decor" },
  { label: "Beauty", slug: "beauty" },
  { label: "Self Care", slug: "self-care" },
]

/* =========================================================
   HEADER COMPONENT
========================================================= */

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* Scroll listener for compact glass header */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  /* Lock background scroll when mobile menu is open */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  /* Keyboard shortcut (Cmd+K / Ctrl+K) to open search */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "border-b border-border/80 bg-background/90 backdrop-blur-md shadow-[0_4px_24px_rgba(28,25,23,0.04)]"
            : "border-b border-transparent bg-background/60 backdrop-blur-xs"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-16 md:h-[72px]" : "h-20 md:h-[88px]"
            }`}
          >
            {/* MOBILE MENU TRIGGER */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted/60 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* BRAND LOGO (Uses span instead of h1 to preserve single H1 per page for SEO) */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none"
            >
              <Image
                src="/logo.png"
                alt="VelvetNest Logo"
                width={42}
                height={42}
                priority
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span
                  className={`font-serif font-semibold tracking-[-0.02em] text-foreground transition-all duration-300 leading-none ${
                    isScrolled
                      ? "text-2xl md:text-[1.75rem]"
                      : "text-[1.65rem] md:text-[2.1rem]"
                  }`}
                >
                  VelvetNest
                </span>
                <span className="hidden md:block mt-1 text-[9px] font-medium uppercase tracking-[0.26em] text-muted-foreground">
                  Fashion • Home • Lifestyle
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-7 xl:gap-8"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)

                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="header-active-underline"
                        className="absolute bottom-0 left-0 h-[1.5px] w-full bg-accent"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* RIGHT ACTIONS (SEARCH + SOCIAL) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search articles"
                className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent/50 hover:text-foreground"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline font-normal">Search...</span>
                <kbd className="hidden md:inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="https://www.pinterest.com/velvetnestworld/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VelvetNest on Pinterest"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card/60 text-muted-foreground hover:border-accent/50 hover:text-foreground"
              >
                <FaPinterestP className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-5 py-6 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
                <nav
                  aria-label="Mobile Navigation"
                  className="flex flex-col space-y-3"
                >
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href)

                    return link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center justify-between py-2 font-serif text-2xl font-medium text-muted-foreground hover:text-foreground"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`py-1.5 font-serif text-2xl font-medium transition-colors ${
                          isActive
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* CLICKABLE CATEGORY PILLS */}
                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Browse by Topic
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-accent hover:text-accent"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* MOBILE SOCIAL FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-xs text-muted-foreground">
                    Follow for daily inspiration
                  </span>
                  <Link
                    href="https://www.pinterest.com/velvetnestworld/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-foreground hover:text-accent"
                  >
                    <FaPinterestP className="h-4 w-4" />
                    <span>Pinterest</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH MODAL */}
      <SearchDialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts || []}
      />
    </>
  )
}
