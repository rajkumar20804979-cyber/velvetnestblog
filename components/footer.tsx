import Link from "next/link"
import { Mail, ArrowUpRight } from "lucide-react"
import { FaPinterestP } from "react-icons/fa"
import { NewsletterForm } from "@/components/newsletter-form"

/* =========================================================
   FOOTER LINKS
========================================================= */

const footerLinks = {
  categories: [
    { href: "/category/fashion", label: "Fashion" },
    { href: "/category/outfit-ideas", label: "Outfit Ideas" },
    { href: "/category/home-decor", label: "Home Decor" },
    { href: "/category/beauty", label: "Beauty" },
    { href: "/category/self-care", label: "Self Care" },
  ],
  curated: [
    { href: "/blog", label: "All Articles", external: false },
    { href: "/amazon-finds", label: "Curated Amazon Finds", external: false },
    {
      href: "https://a.co/d/0i54mdf3",
      label: "Amazon Storefront",
      external: true,
    },
    { href: "/search", label: "Search Archive", external: false },
  ],
  company: [
    { href: "/about", label: "About VelvetNest" },
    { href: "/contact", label: "Contact & Collaborations" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
}

/* =========================================================
   FOOTER COMPONENT
========================================================= */

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* EDITORIAL NEWSLETTER BAND */}
      <section className="border-b border-border bg-muted/40 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-accent">
            The Velvet Edit
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-[-0.02em] text-foreground">
            Curated inspiration for slow, beautiful living.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Join readers receiving weekly capsule wardrobe ideas, warm minimalist
            home finds, and seasonal beauty rituals straight to their inbox.
          </p>

          <div className="mt-8">
            <NewsletterForm />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Thoughtfully sent. Unsubscribe anytime. Read our{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* MAIN DIRECTORY FOOTER */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* BRAND COLUMN (5 cols) */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-block">
                <span className="font-serif text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground">
                  VelvetNest
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                An editorial lifestyle destination dedicated to effortless
                personal style, cozy interiors, beauty rituals, and elevated
                everyday living.
              </p>

              {/* SOCIAL ICONS */}
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="https://www.pinterest.com/velvetnestworld/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VelvetNest on Pinterest"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                >
                  <FaPinterestP className="h-4 w-4" />
                </Link>

                <Link
                  href="mailto:hello@thevelvetnest.site"
                  aria-label="Email VelvetNest"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* NAVIGATION COLUMNS (7 cols) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              {/* CATEGORIES */}
              <div>
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  Categories
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.categories.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* EXPLORE & SHOP */}
              <div>
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  Explore
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.curated.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* COMPANY & LEGAL */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  Information
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT & FTC COMPLIANCE NOTE */}
          <div className="mt-14 border-t border-border pt-8">
            <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground md:flex-row md:items-center">
              <p>
                © {new Date().getFullYear()} VelvetNest. All rights reserved.
              </p>
              <p className="max-w-xl text-left md:text-right leading-relaxed">
                VelvetNest participates in the Amazon Services LLC Associates
                Program. As an Amazon Associate, we earn from qualifying
                purchases at no extra cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
      }
      
