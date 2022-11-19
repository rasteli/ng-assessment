import { Account } from "../entities/account"

export interface Recipient {
  [key: string]: string
}

export interface AccountRepository {
  save(account: Account): Promise<void>
  findByUsername(username: string): Promise<Account | undefined>
}
