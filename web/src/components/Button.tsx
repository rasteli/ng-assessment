import clsx from "clsx"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export function Button({ children, asChild, className }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const clsxClass = clsx(
    className,
    "text-sm w-full outline-none font-semibold px-4 py-3 rounded bg-cyan-500 transition-all hover:bg-cyan-300 focus:ring-2 ring-gray-100"
  )

  return <Comp className={clsxClass}>{children}</Comp>
}
