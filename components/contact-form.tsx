"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setIsSubmitting(true)

    setStatus({
      type: null,
      message: "",
    })

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        )
      }

      form.reset()

      setStatus({
        type: "success",
        message:
          "Message sent successfully! Thank you for reaching out. I'll get back to you within 2–3 business days.",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      {/* Honeypot spam field */}
      <div
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium"
          >
            First Name
          </label>

          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            maxLength={100}
            className="mt-2"
            placeholder="Jane"
            autoComplete="given-name"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium"
          >
            Last Name
          </label>

          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            maxLength={100}
            className="mt-2"
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>

      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>

        <Input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          className="mt-2"
          placeholder="jane@example.com"
          autoComplete="email"
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium"
        >
          Subject
        </label>

        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="
            mt-2
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            py-2
            text-sm
            ring-offset-background
            focus:outline-none
            focus:ring-2
            focus:ring-ring
            focus:ring-offset-2
          "
        >
          <option value="" disabled>
            Select a topic
          </option>

          <option value="general">
            General Inquiry
          </option>

          <option value="collaboration">
            Brand Collaboration
          </option>

          <option value="press">
            Press &amp; Media
          </option>

          <option value="feedback">
            Feedback
          </option>

          <option value="other">
            Other
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          className="
            mt-2
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            py-2
            text-sm
            ring-offset-background
            placeholder:text-muted-foreground
            focus:outline-none
            focus:ring-2
            focus:ring-ring
            focus:ring-offset-2
          "
          placeholder="Your message..."
        />
      </div>

      {/* Privacy notice */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        By submitting this form, you agree that VelvetNest may use
        the information you provide to respond to your inquiry.
        Please see our{" "}
        <a
          href="/privacy-policy"
          className="text-accent underline-offset-4 hover:underline"
        >
          Privacy Policy
        </a>{" "}
        for more information.
      </p>

      {/* Status */}
      {status.type && (
        <div
          role="alert"
          className={
            status.type === "success"
              ? "rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
              : "rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          }
        >
          {status.message}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
            }
