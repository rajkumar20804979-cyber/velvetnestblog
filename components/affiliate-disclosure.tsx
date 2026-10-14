import Link from "next/link"

export function AffiliateDisclosure() {
  return (
    <div className="mb-8 rounded-xl border border-border/80 bg-muted/35 px-4 py-3">
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold uppercase tracking-wider text-foreground">
          Disclosure:
        </span>{" "}
        VelvetNest is reader-supported. When you shop through links on our site,
        we may earn a small affiliate commission at no extra cost to you.{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-accent underline underline-offset-4 hover:text-foreground"
        >
          Learn more
        </Link>
        .
      </p>
    </div>
  )
}
