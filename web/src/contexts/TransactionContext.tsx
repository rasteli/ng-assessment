import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "./AuthContext"

interface Transaction {
  id: string
  value: number
  createdAt: string
  creditedAccount: {
    id: string
    User: {
      username: string
    }
  }
  debitedAccount: {
    id: string
    User: {
      username: string
    }
  }
}

interface TransactionProviderProps {
  children: React.ReactNode
}

interface TransactionContextData {
  transactions: Transaction[]
  createTransaction(recipient: string, value: number): Promise<void>
}

const TransactionContext = createContext({} as TransactionContextData)

export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("@ng:token")

      if (!token) return

      api.defaults.headers.authorization = `Bearer ${token}`

      const response = await api.get("/transactions")

      setTransactions(response.data)
    })()
  }, [user])

  async function createTransaction(recipient: string, value: number) {
    await api.post("/transactions", {
      recipient,
      value
    })
  }

  const value: TransactionContextData = {
    transactions,
    createTransaction
  }

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}
