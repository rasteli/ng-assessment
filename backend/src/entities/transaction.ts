import { Account } from "./account"

export class Transaction {
  public debitedAccount: Account
  public creditedAccount: Account
  public value: number
  public createdAt: Date

  constructor(debitedAccount: Account, creditedAccount: Account, value: number) {
    this.debitedAccount = debitedAccount
    this.creditedAccount = creditedAccount
    this.value = value
    this.createdAt = new Date()

    this.debitedAccount.balance -= value
    this.creditedAccount.balance += value
  }
}
