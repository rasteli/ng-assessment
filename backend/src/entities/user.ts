import { hashPassowrd } from "../utils/bcryption"

const NUMBERS = "0123456789"
const UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export class User {
  public username: string
  public password: string

  constructor(username: string, password: string) {
    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long")
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long")
    }

    // check if password has at least 1 number
    if (!password.split("").some(char => NUMBERS.includes(char))) {
      throw new Error("Password must contain at least 1 number")
    }

    // check if password has at least 1 upper case letter
    if (!password.split("").some(char => UPPER_CASE.includes(char))) {
      throw new Error("Password must contain at least 1 uppercase letter")
    }

    this.username = username
    this.password = hashPassowrd(password)
  }
}
