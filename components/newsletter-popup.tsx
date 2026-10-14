"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "velvetnest-popup-seen"
const COOLDOWN_DAYS = 14

export function NewsletterPopup() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleClose = useCallback(() => {
    setIsOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString())
    } catch {
      /* ignore storage errors in private browsing */
    }
  }, [])

  /* Trigger after 45s OR 50% scroll depth (disabled inside Sanity Studio) */
  useEffect(() => {
    if (pathname?.startsWith("/studio")) return

    try {
      const seenTimestamp = localStorage.getItem(STORAGE_KEY)
      if (seenTimestamp) {
        const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000
        if (Date.now() - Number(seenTimestamp) < cooldownMs) {
          return
        }
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      return
    }

    let triggered = false

    const triggerPopup = () => {
      if (triggered) return
      triggered = true
      setIsOpen(true)
      window.removeEventListener("scroll", handleScroll)
    }

    const timer = setTimeout(triggerPopup, 45000)

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 400 && window.scrollY / scrollHeight >= 0.5) {
        triggerPopup()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch(
        "https://app.kit.com/forms/9530025/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email_address: email,
          }),
        }
      )

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          handleClose()
        }, 2800)
      } else {
        setErrorMessage("Could not subscribe right now. Please try again.")
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close newsletter popup"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-md transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <div className="grid md:grid-cols-12">
                {/* EDITORIAL IMAGE SIDE (Uses about-image.webp so duplicate newsletter-popup.jpg can be deleted) */}
                <div className="relative hidden md:block md:col-span-5 bg-muted">
                  <Image
                    src="/about-image.webp"
                    alt="VelvetNest Editorial"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* CONTENT SIDE */}
                <div className="p-7 sm:p-10 md:col-span-7">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                    <Sparkles className="h-3 w-3" />
                    <span>The Velvet Edit</span>
                  </div>

                  <h2
                    id="newsletter-popup-title"
                    className="mt-3 font-serif text-3xl sm:text-4xl font-medium leading-[1.12] tracking-[-0.02em] text-foreground"
                  >
                    Curated inspiration for slow, beautiful living.
                  </h2>

                  <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                    Join our weekly letter for capsule wardrobe ideas, cozy
                    minimalist decor, beauty rituals, and our favorite Amazon
                    finds.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <Input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      aria-label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-full border-border bg-card px-5 text-sm focus-visible:ring-1 focus-visible:ring-accent"
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 w-full rounded-full bg-foreground text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-accent hover:text-white"
                    >
                      {loading ? "Joining..." : "Subscribe Free"}
                    </Button>
                  </form>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="mt-3 text-xs font-medium text-red-700"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>
                      No spam.{" "}
                      <Link
                        href="/privacy-policy"
                        onClick={handleClose}
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        Privacy Policy
                      </Link>
                    </span>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="font-medium text-muted-foreground hover:text-foreground"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* SUCCESS STATE */
              <div className="px-8 py-16 sm:py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-6 w-6" />
                </div>

                <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-medium text-foreground">
                  Welcome to VelvetNest
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Thank you for joining! Check your inbox soon for weekly style
                  edits, cozy home inspiration, and curated finds.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
