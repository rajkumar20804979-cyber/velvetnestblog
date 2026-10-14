"use client"

import { useEffect, useState } from "react"
import { Link as LinkIcon, Check } from "lucide-react"
import {
  FaPinterestP,
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: "Pinterest",
      icon: <FaPinterestP className="h-3.5 w-3.5" />,
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-3.5 w-3.5" />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="h-3.5 w-3.5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: <FaXTwitter className="h-3.5 w-3.5" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="h-3.5 w-3.5" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ]

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url || window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed", error)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${item.name}`}
          title={`Share on ${item.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
        >
          {item.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        title="Copy link"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-emerald-700">Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  )
}
