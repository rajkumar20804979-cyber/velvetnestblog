"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, List } from "lucide-react"

interface TOCItem {
  text: string
  level: string
  id: string
}

interface MobileTOCProps {
  items?: TOCItem[]
}

export default function MobileTOC({ items = [] }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!items.length) return null

  return (
    <div className="rounded-2xl border border-border bg-card/90 shadow-2xs">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          <List className="h-4 w-4 text-accent" />
          <span className="font-serif text-lg font-medium text-foreground">
            Table of Contents
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {items.length}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav
          aria-label="Mobile Table of Contents"
          className="border-t border-border/70 px-5 py-4"
        >
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li
                key={item.id}
                className={item.level === "h3" ? "pl-4" : ""}
              >
                <Link
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-2.5 text-sm leading-snug text-muted-foreground hover:text-foreground"
                >
                  <span className="text-[11px] font-medium text-accent">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
