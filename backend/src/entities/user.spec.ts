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
      "Username must be at least 3 characters long"
    )

    expect(() => new User("johndoe", "Password")).toThrowError(
      "Password must contain at least 1 number"
    )

    expect(() => new User("johndoe", "123")).toThrowError(
      "Password must be at least 8 characters long"
    )

    expect(() => new User("johndoe", "password123")).toThrowError(
      "Password must contain at least 1 uppercase letter"
    )
  })
})
