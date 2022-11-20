import { describe, it, expect } from "vitest"
import { Account } from "./account"

describe("Create account", () => {
  it("should create an account", () => {
    const account = new Account(100)

    expect(account).toBeInstanceOf(Account)
  })

  it("should credit account's balance", () => {
    const account = new Account(100)
    account.balance += 100

    expect(account.balance).toEqual(200)
  })

  it("should debit account's balance", () => {
    const account = new Account(100)
    account.balance -= 100

    expect(account.balance).toEqual(0)
  })
})
