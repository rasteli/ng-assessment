import { describe, it, expect } from "vitest"
import { Account } from "./account"
import { User } from "./user"

describe("Create account", () => {
  it("should create an account", () => {
    const user = new User("johndoe", "Password123")
    const account = new Account(user, 100)

    expect(account).toBeInstanceOf(Account)
  })

  it("should credit account's balance", () => {
    const user = new User("johndoe", "Password123")
    const account = new Account(user, 100)
    account.balance += 100

    expect(account.balance).toEqual(200)
  })

  it("should debit account's balance", () => {
    const user = new User("johndoe", "Password123")
    const account = new Account(user, 100)
    account.balance -= 100

    expect(account.balance).toEqual(0)
  })
})
