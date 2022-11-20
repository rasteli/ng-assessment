import { describe, it, expect } from "vitest"
import { Transaction } from "./transaction"
import { Account } from "./account"

describe("Create transaction", () => {
  it("should create a transaction and modify the balance of the accounts", () => {
    const value = 100
    const originalDebitedAccountBalance = 100
    const originalCreditedAccountBalance = 300

    const debitedAccount = new Account(originalDebitedAccountBalance)
    const creditedAccount = new Account(originalCreditedAccountBalance)

    const transaction = new Transaction(debitedAccount, creditedAccount, value)

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.debitedAccount.balance).toEqual(originalDebitedAccountBalance - value)
    expect(transaction.creditedAccount.balance).toEqual(originalCreditedAccountBalance + value)
  })
})
