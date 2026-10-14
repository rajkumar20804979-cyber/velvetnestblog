import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import GoogleAnalytics from "@/components/GoogleAnalytics"
import Clarity from "@/components/Clarity"
import AnalyticsWrapper from "@/components/AnalyticsWrapper"
import { NewsletterPopup } from "@/components/newsletter-popup"

import "./globals.css"

/* ===================================================
   FONTS (With True Calligraphic Italics for Editorial Feel)
=================================================== */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

/* ===================================================
   GLOBAL SEO & METADATA
=================================================== */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thevelvetnest.site"),

  title: {
    default: "VelvetNest | Elevated Fashion, Cozy Home Decor & Lifestyle",
    template: "%s | VelvetNest",
  },

  description:
    "Discover effortless fashion inspiration, warm minimalist home decor ideas, curated Amazon finds, beauty rituals, and intentional everyday living.",

  keywords: [
    "fashion blog",
    "fashion trends",
    "outfit ideas",
    "capsule wardrobe",
    "home decor",
    "living room decor",
    "bedroom decor",
    "small space decor",
    "luxury home decor",
    "amazon finds",
    "amazon home finds",
    "amazon fashion finds",
    "beauty rituals",
    "skincare routine",
    "self care",
    "cozy minimalist home",
    "lifestyle publication",
  ],

  authors: [
    {
      name: "VelvetNest Editorial",
      url: "https://www.thevelvetnest.site/about",
    },
  ],

  creator: "VelvetNest",
  publisher: "VelvetNest",
  category: "Lifestyle",
  applicationName: "VelvetNest",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VelvetNest",
  },

  verification: {
    google: "Nxjp-fOBqHLoS2smYE_TIJzSf_dh0_URnb-AZu3JeGg",
    other: {
      "p:domain_verify": "69d7bd25e2bed4760b6ebd58e1dee5ff",
    },
  },

  other: {
    "google-adsense-account": "ca-pub-4903920054540457",
  },

  alternates: {
    /* Dynamic relative canonical prevents child pages from pointing to homepage */
    canonical: "./",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thevelvetnest.site",
    siteName: "VelvetNest",
    title: "VelvetNest | Elevated Fashion, Cozy Home Decor & Lifestyle",
    description:
      "Curated fashion inspiration, warm interiors, beauty finds, and elevated everyday living.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VelvetNest — Fashion, Home & Lifestyle",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VelvetNest | Elevated Fashion, Cozy Home Decor & Lifestyle",
    description:
      "Fashion, home decor, beauty, and cozy luxury inspiration.",
    creator: "@velvetnestworld",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  referrer: "origin-when-cross-origin",

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
}

/* ===================================================
   STRUCTURED DATA (Schema.org @graph)
=================================================== */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.thevelvetnest.site/#organization",
      name: "VelvetNest",
      url: "https://www.thevelvetnest.site",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thevelvetnest.site/logo.png",
      },
      sameAs: ["https://www.pinterest.com/velvetnestworld"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.thevelvetnest.site/#website",
      url: "https://www.thevelvetnest.site",
      name: "VelvetNest",
      publisher: {
        "@id": "https://www.thevelvetnest.site/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.thevelvetnest.site/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

/* ===================================================
   ROOT LAYOUT
=================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}

        <NewsletterPopup />

        {/* Analytics & Tracking */}
        <AnalyticsWrapper />
        <GoogleAnalytics />
        <Clarity />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
      }
    
