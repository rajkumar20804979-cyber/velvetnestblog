"use client"

import { useState } from "react"
import { Check, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "velvetnest-popup-seen"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setStatus("idle")
    setMessage("")

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
        setStatus("success")
        setMessage("Thanks for subscribing! Please check your inbox.")
        setEmail("")
        /* Prevent the popup from interrupting users who already subscribed in the footer */
        try {
          localStorage.setItem(STORAGE_KEY, Date.now().toString())
        } catch {
          /* ignore */
        }
      } else {
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          required
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address..."
          className="h-12 flex-1 rounded-full border-border bg-card px-5 text-sm focus-visible:ring-1 focus-visible:ring-accent"
        />

        <Button
          type="submit"
          disabled={loading}
          className="h-12 rounded-full bg-foreground px-7 text-xs font-semibold uppercase tracking-[0.2em] text-background hover:bg-accent hover:text-white"
        >
          {loading ? "Joining..." : "Subscribe"}
        </Button>
      </form>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-medium ${
            status === "success" ? "text-emerald-800" : "text-red-700"
          }`}
        >
          {status === "success" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
