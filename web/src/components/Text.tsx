import { Slot } from "@radix-ui/react-slot"
import { clsx } from "clsx"

export interface TextProps {
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export function Text({ size = "md", children, asChild, className }: TextProps) {
  const Comp = asChild ? Slot : "span"

  const clsxClass = clsx("text-gray-100", className, {
    "text-xs": size === "sm",
    "text-sm": size === "md",
    "text-md": size === "lg"
  })

  return <Comp className={clsxClass}>{children}</Comp>
}
