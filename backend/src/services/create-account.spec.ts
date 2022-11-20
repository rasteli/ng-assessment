import { describe, it, expect } from "vitest"
import { Account } from "../entities/account"
import { CreateAccount } from "./create-account"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"

describe("Create account", () => {
  it("should create an account", () => {
    const accountRepository = new InMemoryAccountRepository()
    const sut = new CreateAccount(accountRepository)

    expect(sut.execute({ balance: 100 })).resolves.toBeInstanceOf(Account)
  })
})
