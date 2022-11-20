import { describe, it, expect } from "vitest"
import { Account } from "../entities/account"
import { CreateAccount } from "./create-account"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"
import { User } from "../entities/user"

describe("Create account", () => {
  it("should create an account", () => {
    const accountRepository = new InMemoryAccountRepository()
    const user = new User("johndoe", "Password123")

    const sut = new CreateAccount(accountRepository)

    expect(sut.execute({ balance: 10000, user })).resolves.toBeInstanceOf(Account)
  })
})
