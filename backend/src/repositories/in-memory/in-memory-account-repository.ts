import { Account } from "../../entities/account"
import { AccountRepository } from "../account-repository"

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = []

  async save(account: Account): Promise<void> {
    this.accounts.push(account)
  }

  async findByUsername(username: string): Promise<Account | undefined> {
    return this.accounts.find(account => account.user?.username === username)
  }
}
