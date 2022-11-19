import { describe, it, expect } from "vitest"
import { User } from "../entities/user"
import { CreateUser } from "./create-user"
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository"
import { InMemoryAccountRepository } from "../repositories/in-memory/in-memory-account-repository"

describe("Create user", () => {
  it("should create a user with an account", async () => {
    const userRepository = new InMemoryUserRepository()
    const accountRepository = new InMemoryAccountRepository()

    const sut = new CreateUser(userRepository, accountRepository)
    const response = await sut.execute({ username: "johndoe", password: "Password123" })

    expect(response.user).toBeInstanceOf(User)
    expect(response.account?.balance).toBe(100)
  })

  it("should not create a user with the same username", async () => {
    const userRepository = new InMemoryUserRepository()
    const accountRepository = new InMemoryAccountRepository()
    const sut = new CreateUser(userRepository, accountRepository)

    const username = "johndoe"
    const password = "Password123"

    await sut.execute({ username, password })

    expect(sut.execute({ username, password })).rejects.toThrowError("Username already in use")
  })
})
