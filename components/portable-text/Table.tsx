import { PortableText, type PortableTextComponents } from "@portabletext/react"
import Link from "next/link"

interface TableProps {
  value: {
    caption?: string
    hasHeader?: boolean
    rows: {
      cells: {
        content: any
        align?: "left" | "center" | "right"
      }[]
    }[]
  }
}

/* Custom cell renderer so global .prose paragraph margins don't bloat table rows */
const cellComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="!m-0 text-sm leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => {
      const href = value?.href || "#"
      const isInternal = href.startsWith("/") || href.startsWith("#")

      if (isInternal) {
        return (
          <Link
            href={href}
            className="font-medium text-accent underline underline-offset-4 hover:text-foreground"
          >
            {children}
          </Link>
        )
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-medium text-accent underline underline-offset-4 hover:text-foreground"
        >
          {children}
        </a>
      )
    },
  },
}

export default function Table({ value }: TableProps) {
  const { caption, hasHeader = true, rows = [] } = value || {}

  if (!rows.length) return null

  const headerRow = hasHeader ? rows[0] : null
  const bodyRows = hasHeader ? rows.slice(1) : rows

  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          {headerRow && (
            <thead>
              <tr className="border-b border-border bg-muted/70">
                {headerRow.cells.map((cell, index) => (
                  <th
                    key={index}
                    style={{ textAlign: cell.align || "left" }}
                    className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground"
                  >
                    <PortableText
                      value={cell.content}
                      components={cellComponents}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody className="divide-y divide-border/70">
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-muted/30 even:bg-muted/15"
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{ textAlign: cell.align || "left" }}
                    className="px-5 py-4 align-top"
                  >
                    <PortableText
                      value={cell.content}
                      components={cellComponents}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-xs italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
    }
