import { describe, it, expect } from "vitest"
import { CreateTransaction } from "./create-transaction"
import { Transaction } from "../entities/transaction"
import { User } from "../entities/user"

import { CreateAccount } from "./create-account"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"
import { InMemoryTransactionRepository } from "../repositories/in-memory/in-memory-transaction-repository"

describe("Create transaction", () => {
  it("should create a transaction", async () => {
    const sender = new User("johndoe", "Password123")
    const recipient = new User("janedoe", "Password123")

    const accountRepository = new InMemoryAccountRepository()
    const transactionRepository = new InMemoryTransactionRepository()

    const createAccount = new CreateAccount(accountRepository)

    await createAccount.execute({ balance: 100 })
    await createAccount.execute({ balance: 100 })

    const sut = new CreateTransaction(transactionRepository, accountRepository)

    const transaction = await sut.execute({
      sender: sender.username,
      recipient: recipient.username,
      value: 50
    })

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.debitedAccount.balance).toEqual(50)
    expect(transaction.creditedAccount.balance).toEqual(150)
  })
})
