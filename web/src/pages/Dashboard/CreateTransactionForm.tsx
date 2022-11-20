import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

import { Text } from "../../components/Text"
import { Button } from "../../components/Button"
import { TextInput } from "../../components/TextInput"
import { useTransaction } from "../../contexts/TransactionContext"

interface CreateTransactionForm {
  balanceInCents: number
}

export function CreateTransactionForm({ balanceInCents }: CreateTransactionForm) {
  const { createTransaction } = useTransaction()

  const [value, setValue] = useState("")
  const [recipient, setRecipient] = useState("")

  const isValueEmpty = value.length === 0
  const isRecipientEmpty = recipient.length === 0

  async function handleCreateTransaction(e: React.FormEvent) {
    e.preventDefault()

    try {
      const valueInCents = Number(value) * 100
      await createTransaction(recipient, valueInCents)

      setValue("")
      setRecipient("")
    } catch (error: any) {
      toast.error(error.response.data.error, {
        toastId: "create-transaction-error"
      })
    }
  }

  return (
    <form onSubmit={handleCreateTransaction} className="mt-10 flex flex-col gap-4 items-stretch">
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
            max={balanceInCents / 100}
            step={0.01}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </TextInput.Root>
      </label>

      <Button type="submit" className="mt-4" disabled={isRecipientEmpty || isValueEmpty}>
        Transferir
      </Button>

      <ToastContainer draggable position="bottom-left" />
    </form>
  )
}
