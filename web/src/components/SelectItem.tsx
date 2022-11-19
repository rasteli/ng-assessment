import * as Select from "@radix-ui/react-select"
import { Check } from "phosphor-react"

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {
  children: React.ReactNode
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <Select.Item
      className="cursor-pointer hover:bg-cyan-500 hover:text-gray-900 font-semibold rounded flex gap-1 py-1 px-2 outline-none items-center"
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
