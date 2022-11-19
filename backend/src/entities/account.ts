import { User } from "./user"

export class Account {
  public id?: string
  public balance: number

  constructor(balance: number) {
    this.balance = balance
  }
}
