import { describe, it, expect } from "vitest"
import { User } from "../entities/user"
import { Account } from "../entities/account"
import { CreateAccount } from "./create-account"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"

describe("Create account", () => {
  it("should create an account", () => {
    const accountRepository = new InMemoryAccountRepository()
    const sut = new CreateAccount(accountRepository)

    const user = new User("johndoe", "Password123")

    expect(sut.execute({ user, balance: 100 })).resolves.toBeInstanceOf(Account)
  })
})
