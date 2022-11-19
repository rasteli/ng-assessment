import { useState } from "react"
import { Wallet } from "phosphor-react"

import { Button } from "../../components/Button"
import { Heading } from "../../components/Heading"
import { Text } from "../../components/Text"
import { TextInput } from "../../components/TextInput"

import { useAuth } from "../../contexts/AuthContext"
import { useTransaction } from "../../contexts/TransactionContext"
import { formatBalanceToBRL } from "../../utils/formatBalanceToBRL"

export function SidePanel() {
  const [value, setValue] = useState("")
  const [recipient, setRecipient] = useState("")

  const { user } = useAuth()
  const { transactions, createTransaction } = useTransaction()

  const balanceInCents = user?.account.balance
  const balance = balanceInCents && formatBalanceToBRL(balanceInCents)

  const lastCashIn = transactions.find(
    transaction => transaction.creditedAccount.id === user?.account.id
  )
  const lastCashInValue = formatBalanceToBRL(lastCashIn?.value || 0)

  const lastCashOut = transactions.find(
    transaction => transaction.debitedAccount.id === user?.account.id
  )
  const lastCashOutValue = formatBalanceToBRL(lastCashOut?.value || 0)

  async function handleCreateTransaction(e: React.FormEvent) {
    e.preventDefault()

    const valueInCents = Number(value) * 100
    await createTransaction(recipient, valueInCents)

    setValue("")
    setRecipient("")
  }

  return (
    <aside className="mx-10 relative">
      <div className="border-r-[1px] border-gray-400 h-full absolute top-0 -right-10" />

      <div className="bg-cyan-500 p-3 rounded flex flex-col gap-10">
        <Heading className="text-gray-700">Saldo atual</Heading>
        <Text className="text-3xl font-bold text-gray-900">{balance}</Text>
      </div>

      <div className="my-10 border-b-[1px] border-gray-400" />

      <div>
        <Heading>Últimas transações</Heading>

        <div className="flex gap-16 mt-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded bg-gray-100 w-10 h-10">
              <Wallet size={32} />
            </div>
            <div className="flex flex-col">
              <Text size="sm" className="text-gray-400">
                Último <span className="italic">cash-in</span>
              </Text>
              <Text className="font-semibold">{lastCashInValue}</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded bg-gray-100 w-10 h-10">
              <Wallet size={32} />
            </div>
            <div className="flex flex-col">
              <Text size="sm" className="text-gray-400">
                Último <span className="italic">cash-out</span>
              </Text>
              <Text className="font-semibold">{lastCashOutValue}</Text>
            </div>
          </div>
        </div>

        <div className="my-10 border-b-[1px] border-gray-400" />
      </div>

      <div>
        <Heading>Área de transferência</Heading>

        <form
          onSubmit={handleCreateTransaction}
          className="mt-10 flex flex-col gap-4 items-stretch"
        >
          <label htmlFor="recipient">
            <Text className="text-gray-100 font-semibold">Para quem você quer transferir?</Text>
            <TextInput.Root>
              <TextInput.Field
                required
                id="recipient"
                placeholder="Digite o nome de usuário"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </TextInput.Root>
          </label>
          <label htmlFor="value">
            <Text className="text-gray-100 font-semibold">Quanto você quer transferir?</Text>
            <TextInput.Root>
              <TextInput.Field
                required
                id="value"
                placeholder="R$0,00"
                type="number"
                min={0.01}
                max={balanceInCents! / 100}
                step={0.01}
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </TextInput.Root>
          </label>

          <Button type="submit" className="mt-4">
            Transferir
          </Button>
        </form>
      </div>
    </aside>
  )
}
