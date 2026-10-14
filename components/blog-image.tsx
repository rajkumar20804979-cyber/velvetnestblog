"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import { PinterestSaveButton } from "@/components/pinterest-save-button"

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  showPinButton?: boolean
}

export default function BlogImage({
  src,
  alt,
  caption,
  showPinButton = true,
}: BlogImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <figure className="group my-10 md:my-12">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setOpen(true)
            }
          }}
          aria-label={`Zoom image: ${alt}`}
          className="relative cursor-zoom-in overflow-hidden rounded-2xl bg-muted shadow-xs"
        >
          {showPinButton && (
            <PinterestSaveButton
              imageUrl={src}
              description={caption || alt}
            />
          )}

          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </div>

        {caption && (
          <figcaption className="mt-3 text-center text-xs sm:text-sm italic text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
      />
    </>
  )
          }
