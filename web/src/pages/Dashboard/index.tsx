import * as Select from "@radix-ui/react-select"
import { CaretDown, SignOut } from "phosphor-react"

import { formatCreationDate } from "../../utils/formatCreationDate"

import { SidePanel } from "./SidePanel"
import { Logo } from "../../components/Logo"
import { Text } from "../../components/Text"
import { Heading } from "../../components/Heading"
import { SelectItem } from "../../components/SelectItem"

import { useAuth } from "../../contexts/AuthContext"
import { useTransaction } from "../../contexts/TransactionContext"
import { formatBalanceToBRL } from "../../utils/formatBalanceToBRL"

export function Dashboard() {
  const { user, signOut } = useAuth()
  const { transactions } = useTransaction()

  return (
    <>
      <header className="flex items-center mt-3 mx-4 pb-3 border-b-[1px] border-gray-400">
        <div className="flex items-center flex-1 gap-6">
          <Logo width={80} height={80} />
          <Heading>Olá, {user?.username}</Heading>
        </div>
        <button className="text-red-400" title="Sair da conta" onClick={signOut}>
          <SignOut size={40} />
        </button>
      </header>

      <div className="grid grid-cols-[25%_75%] my-12">
        <SidePanel />

        <main className="flex flex-col mx-[5.75rem]">
          <div className="flex items-center">
            <Heading className="flex-1">Todas as transações</Heading>
            <Select.Root>
              <Select.Trigger className="flex items-center justify-center gap-3 text-gray-100 border-[1px] border-gray-100 rounded px-3 py-1">
                <Select.Value placeholder="Filtrar por" />
                <Select.Icon>
                  <CaretDown size={20} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-gray-700 rounded text-gray-100 shadow-md">
                  <Select.Viewport className="p-2">
                    <Select.Group>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="sender">Sou remetente</SelectItem>
                      <SelectItem value="recipeint">Sou destinatário</SelectItem>
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
                  <th className="p-4">
                    <Text className="font-bold">Feita em</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
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
      </div>
    </>
  )
}
