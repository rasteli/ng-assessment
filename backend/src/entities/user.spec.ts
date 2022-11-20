import { describe, it, expect } from "vitest"
import { User } from "./user"
import { compareHash } from "../utils/bcryption"

describe("Create user", () => {
  it("should create a user", () => {
    const username = "johndoe"
    const password = "Password123"

    const user = new User(username, password)

    expect(user).toBeInstanceOf(User)
    expect(compareHash(password, user.password)).toBe(true)
  })

  it("should not create a user whose props doesn't meet the requirements", () => {
    expect(() => new User("jo", "Password123")).toThrowError(
      "Nome de usuário deve ter pelo menos 3 caracteres"
    )

    expect(() => new User("johndoe", "Password")).toThrowError("Senha deve ter pelo menos 1 número")

    expect(() => new User("johndoe", "123")).toThrowError("Senha deve ter pelo menos 8 caracteres")

    expect(() => new User("johndoe", "password123")).toThrowError(
      "Senha deve ter pelo menos 1 letra maiúscula"
    )
  })
})
