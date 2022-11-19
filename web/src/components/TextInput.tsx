import { Slot } from "@radix-ui/react-slot"

// Root
export interface TextInputRootProps {
  children: React.ReactNode
}

function TextInputRoot({ children }: TextInputRootProps) {
  return (
    <div className="flex items-center gap-3 h-12 bg-gray-800 px-4 py-3 rounded w-full focus-within:ring-2 ring-cyan-300">
      {children}
    </div>
  )
}

// Input
interface TextInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function TextInputField(props: TextInputFieldProps) {
  return (
    <input
      className="bg-transparent flex-1 placeholder:text-gray-400 text-gray-100 text-xs outline-none"
      {...props}
    />
  )
}

// Icon
interface TextInputIconProps {
  children: React.ReactNode
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-400">{children}</Slot>
}

export const TextInput = {
  Root: TextInputRoot,
  Icon: TextInputIcon,
  Field: TextInputField
}
