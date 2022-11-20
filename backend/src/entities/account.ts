import { User } from "./user"

export class Account {
  public id?: string
  public user?: User
  public balance: number

  constructor(balance: number, user?: User) {
    this.user = user
    this.balance = balance
  }
}
