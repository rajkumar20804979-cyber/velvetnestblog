"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface TOCItem {
  text: string
  level: string
  id: string
}

interface TableOfContentsProps {
  items?: TOCItem[]
}

export default function TableOfContents({ items = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "")

  useEffect(() => {
    if (!items.length) return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-15% 0px -75% 0px",
        threshold: 0,
      }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [items])

  if (!items.length) return null

  return (
    <nav
      aria-label="Table of Contents"
      className="rounded-2xl border border-border/80 bg-card/80 p-5 backdrop-blur-md"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
        In This Article
      </p>

      <ul className="mt-4 max-h-[calc(100vh-16rem)] space-y-2.5 overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id

          return (
            <li
              key={item.id}
              className={item.level === "h3" ? "pl-3.5" : ""}
            >
              <Link
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`group flex items-start gap-2.5 text-[13px] leading-snug transition-colors ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`mt-2 h-[1.5px] shrink-0 transition-all duration-200 ${
                    isActive
                      ? "w-4 bg-accent"
                      : "w-2 bg-border group-hover:w-3 group-hover:bg-accent/60"
                  }`}
                />
                <span className="line-clamp-2">{item.text}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
