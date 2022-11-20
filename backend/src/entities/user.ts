import { hashPassowrd } from "../utils/bcryption"

const NUMBERS = "0123456789"
const UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export class User {
  public username: string
  public password: string

  constructor(username: string, password: string) {
    if (username.length < 3) {
      throw new Error("Nome de usuário deve ter pelo menos 3 caracteres")
    }

    if (password.length < 8) {
      throw new Error("Senha deve ter pelo menos 8 caracteres")
    }

    // check if password has at least 1 number
    if (!password.split("").some(char => NUMBERS.includes(char))) {
      throw new Error("Senha deve ter pelo menos 1 número")
    }

    // check if password has at least 1 upper case letter
    if (!password.split("").some(char => UPPER_CASE.includes(char))) {
      throw new Error("Senha deve ter pelo menos 1 letra maiúscula")
    }

    this.username = username
    this.password = hashPassowrd(password)
  }
}
