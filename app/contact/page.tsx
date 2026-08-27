import type { Metadata } from "next"
import Link from "next/link"
import { Instagram, Youtube, Mail } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact | VelvetNest - Get in Touch",
  description:
    "Have a question, collaboration idea, or feedback? Get in touch with VelvetNest by email or through the contact form.",
  openGraph: {
    title: "Contact | VelvetNest",
    description:
      "Have a question, collaboration idea, or feedback? Get in touch with VelvetNest by email or through the contact form.",
  },
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@thevelvetnest.site",
    href: "mailto:hello@thevelvetnest.site",
  },
]

const faqs = [
  {
    question: "How do I shop your Amazon finds?",
    answer:
      "Simply click on a product on the Amazon Finds page and you'll be directed to the relevant product page on Amazon. As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.",
  },
  {
    question: "Do you accept sponsored content?",
    answer:
      "I selectively consider collaborations with brands whose products, services, and values are a good fit for VelvetNest. Any sponsored content will be clearly disclosed, and recommendations will remain relevant to the topic and useful to readers.",
  },
  {
    question: "Can I submit a guest post?",
    answer:
      "I'm not currently accepting guest posts, but I appreciate your interest. If this policy changes in the future, I'll update this page.",
  },
  {
    question: "How often do you post new content?",
    answer:
      "I regularly publish new articles and update existing content with useful ideas, recommendations, and seasonal inspiration.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>

        {/* HERO */}

        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Get in Touch
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Let&apos;s Connect
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Have a question, collaboration idea, or feedback? Fill out the
              form below or reach out directly by email.
            </p>

          </div>
        </section>

        {/* CONTACT FORM & INFO */}

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

              {/* FORM */}

              <div>

                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Send a Message
                </h2>

                <p className="mt-2 text-muted-foreground">
                  I do my best to respond within 2–3 business days.
                </p>

                <ContactForm />

              </div>

              {/* CONTACT INFO */}

              <div className="lg:pl-8">

                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Contact Info
                </h2>

                <div className="mt-8 space-y-6">

                  {contactInfo.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>

                      <div>

                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>

                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-lg font-medium transition-colors hover:text-accent"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-lg font-medium">
                            {item.value}
                          </p>
                        )}

                      </div>

                    </div>
                  ))}

                </div>

                {/* SOCIAL LINKS */}

                <div className="mt-12">

                  <h3 className="text-lg font-semibold">
                    Follow Along
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Connect with VelvetNest on social media for fashion,
                    home decor, beauty, and lifestyle inspiration.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">

                    {/* Pinterest */}

                    <Link
                      href="https://www.pinterest.com/velvetnestworld/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>

                      Pinterest
                    </Link>

                    {/* Instagram */}

                    <Link
                      href="https://www.instagram.com/velvetnestworld/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Link>

                    {/* YouTube */}

                    <Link
                      href="https://www.youtube.com/@velvetnestworld"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Link>

                  </div>

                </div>

                {/* RESPONSE TIME */}

                <div className="mt-12 rounded-2xl border border-border bg-secondary/30 p-6">

                  <h3 className="font-semibold">
                    Response Time
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    I read messages personally and do my best to respond
                    within 2–3 business days. For press or media inquiries,
                    please select &quot;Press &amp; Media&quot; as your
                    subject.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* FAQ */}

        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">

          <div className="mx-auto max-w-3xl px-4">

            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="mt-12 space-y-6">

              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-card p-6"
                >

                  <h3 className="font-semibold">
                    {faq.question}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {faq.answer}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
        }
