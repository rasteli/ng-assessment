import { useState } from "react"
import clsx from "clsx"
import { CaretDown } from "phosphor-react"
import * as Select from "@radix-ui/react-select"

import { Text } from "../../components/Text"
import { Heading } from "../../components/Heading"
import { SelectItem } from "../../components/SelectItem"

import { formatCreationDate } from "../../utils/formatCreationDate"
import { formatBalanceToBRL } from "../../utils/formatBalanceToBRL"

import { useAuth } from "../../contexts/AuthContext"
import { useTransaction } from "../../contexts/TransactionContext"

export function TransactionTable() {
  const { user } = useAuth()
  const { transactions } = useTransaction()

  const [sorting, setSorting] = useState<"asc" | "desc">("desc")
  const [transactionType, setTransactionType] = useState("all")

  const sortingFunctions = {
    asc: (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
    desc: (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
  }

  const transactionsByType = transactions
    .filter(transaction => {
      if (transactionType === "all") return true

      return transactionType === "recipient"
        ? transaction.creditedAccount.id === user?.account.id
        : transaction.debitedAccount.id === user?.account.id
    })
    .sort((a, b) => sortingFunctions[sorting](a.createdAt, b.createdAt))

  function toggleSorting() {
    setSorting(sorting === "asc" ? "desc" : "asc")
  }

  return (
    <main className="flex flex-col md:mx-[5.75rem] max-lg:mx-10 max-lg:mt-10">
      <div className="flex items-center">
        <Heading className="flex-1">Todas as transações</Heading>

        <Select.Root onValueChange={value => setTransactionType(value)}>
          <Select.Trigger className="flex items-center justify-center gap-3 text-gray-100 border-[1px] border-gray-100 rounded px-3 py-1">
            <Select.Value placeholder="Filtrar por" />
            <Select.Icon>
              <CaretDown size={20} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="z-20 overflow-hidden bg-gray-700 rounded text-gray-100 shadow-md">
              <Select.Viewport className="p-2">
                <Select.Group>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sender">Sou remetente</SelectItem>
                  <SelectItem value="recipient">Sou destinatário</SelectItem>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="flex-1 overflow-auto mt-16 max-h-[600px] rounded-lg">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="p-4">
                <Text className="font-bold">Valor</Text>
              </th>
              <th className="p-4">
                <Text className="font-bold">Remetente</Text>
              </th>
              <th className="p-4">
                <Text className="font-bold">Destinatário</Text>
              </th>
              <th className="p-4 flex gap-3 items-center">
                <Text className="font-bold">Feita em</Text>
                <button
                  onClick={toggleSorting}
                  className={clsx("text-gray-100 outline-none transition-all", {
                    "rotate-180": sorting === "asc",
                    "rotate-0": sorting === "desc"
                  })}
                >
                  <CaretDown size={28} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsByType.map(transaction => (
              <tr key={transaction.id} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="p-4">
                  <Text>{formatBalanceToBRL(transaction.value)}</Text>
                </td>
                <td className="p-4">
                  <Text>{transaction.debitedAccount.User.username}</Text>
                </td>
                <td className="p-4">
                  <Text>{transaction.creditedAccount.User.username}</Text>
                </td>
                <td className="p-4">
                  <Text>{formatCreationDate(transaction.createdAt)}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
