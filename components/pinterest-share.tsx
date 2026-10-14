"use client"

import { FaPinterestP } from "react-icons/fa"

interface PinterestShareProps {
  url?: string
  media: string
  description: string
  className?: string
  children?: React.ReactNode
}

export function PinterestShare({
  url,
  media,
  description,
  className = "",
  children,
}: PinterestShareProps) {
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "")

    const absoluteMedia =
      media.startsWith("http") || typeof window === "undefined"
        ? media
        : `${window.location.origin}${media}`

    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      shareUrl
    )}&media=${encodeURIComponent(
      absoluteMedia
    )}&description=${encodeURIComponent(description)}`

    window.open(
      pinterestUrl,
      "_blank",
      "width=750,height=600,noopener,noreferrer"
    )
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share on Pinterest"
      className={
        className ||
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-[#E60023] hover:bg-[#E60023] hover:text-white"
      }
    >
      {children || (
        <>
          <FaPinterestP className="h-3.5 w-3.5" />
          <span>Pin for Later</span>
        </>
      )}
    </button>
  )
}
