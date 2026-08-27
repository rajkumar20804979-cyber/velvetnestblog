import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About | VelvetNest - Fashion, Home & Lifestyle Blog",
  description:
    "Learn about VelvetNest and discover fashion inspiration, home decor ideas, beauty, self-care, and thoughtful lifestyle content.",
  openGraph: {
    title: "About | VelvetNest",
    description:
      "Learn about VelvetNest and discover fashion inspiration, home decor ideas, beauty, self-care, and thoughtful lifestyle content.",
  },
}

const values = [
  {
    title: "Intentional Living",
    description:
      "I believe in choosing thoughtfully—whether that means building a more useful wardrobe, creating a welcoming home, or making everyday routines feel a little more meaningful.",
  },
  {
    title: "Accessible Style",
    description:
      "Looking put-together shouldn't have to break the bank. I share practical ideas, affordable finds, and inspiration for creating a style that feels personal.",
  },
  {
    title: "Transparent Recommendations",
    description:
      "I believe readers should know when a recommendation may earn VelvetNest a commission. Affiliate relationships are clearly disclosed throughout the website.",
  },
  {
    title: "Cozy Aesthetics",
    description:
      "Life should feel beautiful and comfortable. I'm drawn to warm, inviting spaces and timeless style that makes everyday life feel a little more special.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <section className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Text */}
              <div className="order-2 lg:order-1">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  About VelvetNest
                </p>

                <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                  Hi, I&apos;m So Glad You Found Me
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Welcome to VelvetNest—my cozy corner of the internet where I
                  share inspiration around timeless fashion, beautiful home
                  spaces, beauty, self-care, and living with intention and
                  style.
                </p>

                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  I created VelvetNest as a creative space to bring together
                  ideas, inspiration, and carefully considered recommendations
                  for everyday life. Whether you&apos;re refreshing your
                  wardrobe, decorating a room, or simply looking for a little
                  inspiration, I hope you find something here that feels useful
                  and inspiring.
                </p>

                {/* Pinterest */}
                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="https://www.pinterest.com/velvetnestworld/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-border p-3 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="VelvetNest on Pinterest"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="group overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/5] bg-card">
                      <Image
                        src="/about-image.webp"
                        alt="VelvetNest fashion and lifestyle inspiration"
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-accent/30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            MY STORY
        =================================================== */}

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              My Story
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Growing up, I was always drawn to the little details that can
                make an outfit feel complete or turn a space into somewhere
                you genuinely want to spend time. I&apos;ve always enjoyed
                discovering ideas, comparing possibilities, and finding pieces
                that bring a sense of personality to everyday life.
              </p>

              <p>
                I created VelvetNest as a place to bring those interests
                together. The name comes from my love of soft, luxurious
                textures and the idea of creating a welcoming nest—a home and
                lifestyle that feels comfortable, beautiful, and personal.
              </p>

              <p>
                Today, VelvetNest is growing into a space for readers who enjoy
                thoughtful style, beautiful spaces, practical ideas, and a
                little everyday inspiration. Whether you&apos;re here for an
                outfit idea, home decor inspiration, beauty content, or simply
                something enjoyable to read, I&apos;m glad you&apos;re here.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            VALUES
        =================================================== */}

        <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              What I Believe In
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-lg font-semibold text-accent">
                    {index + 1}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            WHAT YOU'LL FIND
        =================================================== */}

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              What You&apos;ll Find Here
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">

              {/* Fashion */}
              <Link
                href="/blog?category=fashion"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                    alt="Fashion and outfit inspiration"
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      Fashion &amp; Style
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                      Outfit ideas, wardrobe tips, seasonal style inspiration,
                      and practical fashion guides.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Home Decor */}
              <Link
                href="/blog?category=home-decor"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                    alt="Home decor and interior inspiration"
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      Home Decor
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                      Decorating ideas, room inspiration, organization tips,
                      and ways to create beautiful spaces on different budgets.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Beauty & Self Care */}
              <Link
                href="/blog?category=beauty"
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80"
                    alt="Beauty and self-care inspiration"
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-semibold text-white">
                      Beauty &amp; Self Care
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                      Beauty tips, skincare and hair-care ideas, self-care
                      inspiration, and thoughtfully selected products.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================
            TRANSPARENCY & AFFILIATE RECOMMENDATIONS
        =================================================== */}

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Transparency &amp; Recommendations
              </h2>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Some products and services mentioned on VelvetNest may be
                  linked through affiliate programs. If you make a qualifying
                  purchase through one of these links, VelvetNest may receive
                  a commission at no additional cost to you.
                </p>

                <p>
                  Affiliate relationships do not change our goal of providing
                  useful and relevant content. Recommendations are selected
                  based on their relevance to the topic, features, usefulness,
                  style, and overall fit for the content.
                </p>

                <p>
                  When an article contains affiliate links, we provide an
                  affiliate disclosure so that you can understand our
                  relationship with the products or services mentioned.
                </p>

                <p>
                  You can learn more on our{" "}
                  <Link
                    href="/affiliate-disclosure"
                    className="font-medium text-accent hover:underline"
                  >
                    Affiliate Disclosure
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WORK WITH ME
        =================================================== */}

        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Collaborations
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Work With Me
              </h2>

              <p className="mt-4 text-lg text-muted-foreground">
                I&apos;m open to collaborations and partnerships with brands
                whose products, services, and values are a natural fit for
                VelvetNest. For collaboration inquiries, please get in touch.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="mailto:hello@thevelvetnest.site">
                    <Mail className="mr-2 h-4 w-4" />
                    hello@thevelvetnest.site
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
        }
