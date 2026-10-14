"use client"

import { FaPinterestP } from "react-icons/fa"

interface Props {
  imageUrl: string
  description: string
}

export function PinterestSaveButton({ imageUrl, description }: Props) {
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : ""
    const absoluteMedia =
      imageUrl.startsWith("http") || typeof window === "undefined"
        ? imageUrl
        : `${window.location.origin}${imageUrl}`

    const url = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      pageUrl
    )}&media=${encodeURIComponent(
      absoluteMedia
    )}&description=${encodeURIComponent(description)}`

    window.open(url, "_blank", "width=750,height=600,noopener,noreferrer")
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      aria-label="Save image to Pinterest"
      title="Pin to Pinterest"
      className="absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-2 text-xs font-semibold text-foreground opacity-95 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#E60023] hover:text-white sm: opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
    >
      <FaPinterestP className="h-3.5 w-3.5 text-[#E60023] transition-colors group-hover:text-current hover:text-white" />
      <span className="hidden sm:inline tracking-wide">Save</span>
    </button>
  )
}
