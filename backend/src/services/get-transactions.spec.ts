import { describe, expect, it } from "vitest"
import { Transaction } from "../entities/transaction"
import { User } from "../entities/user"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"
import { InMemoryTransactionRepository } from "../repositories/in-memory/in-memory-transaction-repository"
import { CreateAccount } from "./create-account"
import { CreateTransaction } from "./create-transaction"
import { GetTransactions } from "./get-transactions"

describe("Get Transactions", () => {
  it("should return a list of transactions", async () => {
    const sender = new User("johndoe", "Password123")
    const recipient = new User("janedoe", "Password123")

    const accountRepository = new InMemoryAccountRepository()
    const transactionRepository = new InMemoryTransactionRepository()

    const createAccount = new CreateAccount(accountRepository)

    await createAccount.execute({ balance: 10000, user: sender })
    await createAccount.execute({ balance: 10000, user: recipient })

    const createTransaction = new CreateTransaction(transactionRepository, accountRepository)

    await createTransaction.execute({
      sender: sender.username,
      recipient: recipient.username,
      value: 50
    })

    const sut = new GetTransactions(transactionRepository)

    const transactions = await sut.execute({ username: sender.username })

    transactions.forEach(transaction => expect(transaction).toBeInstanceOf(Transaction))
  })
})
