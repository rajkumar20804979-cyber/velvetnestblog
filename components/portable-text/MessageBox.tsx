import { PortableText, type PortableTextComponents } from "@portabletext/react"
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react"

const boxVariants = {
  tip: {
    icon: Sparkles,
    label: "Stylist Tip",
    container: "border-accent/35 bg-muted/55",
    iconColor: "text-accent",
  },
  note: {
    icon: BookOpen,
    label: "Editor's Note",
    container: "border-border bg-card",
    iconColor: "text-muted-foreground",
  },
  warning: {
    icon: AlertTriangle,
    label: "Keep in Mind",
    container: "border-amber-700/30 bg-amber-950/[0.04]",
    iconColor: "text-amber-700",
  },
  success: {
    icon: CheckCircle2,
    label: "Key Takeaway",
    container: "border-emerald-800/25 bg-emerald-950/[0.04]",
    iconColor: "text-emerald-800",
  },
  info: {
    icon: Info,
    label: "Quick Context",
    container: "border-border bg-muted/40",
    iconColor: "text-accent",
  },
}

const contentComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 last:mb-0 text-[15px] sm:text-base leading-relaxed text-foreground/85">
        {children}
      </p>
    ),
  },
}

export default function MessageBox({ value }: any) {
  const variantKey = (value?.boxType as keyof typeof boxVariants) || "note"
  const variant = boxVariants[variantKey] || boxVariants.note
  const Icon = variant.icon

  return (
    <aside
      className={`not-prose my-9 rounded-2xl border p-6 shadow-xs ${variant.container}`}
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <Icon className={`h-4 w-4 shrink-0 ${variant.iconColor}`} />
        <h4 className="font-serif text-lg font-semibold tracking-tight text-foreground">
          {value?.title || variant.label}
        </h4>
      </div>

      <div className="pl-6.5">
        <PortableText value={value?.content} components={contentComponents} />
      </div>
    </aside>
  )
}
