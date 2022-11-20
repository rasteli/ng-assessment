import { Account } from "../entities/account"
import { User } from "../entities/user"
import { AccountRepository } from "../repositories/account-repository"

interface CreateAccountRequest {
  user: User
  balance: number
}

type CreateAccountResponse = Account

export class CreateAccount {
  constructor(private AccountRepository: AccountRepository) {}

  async execute({ balance, user }: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = new Account(balance, user)

    await this.AccountRepository.save(account)

    return account
  }
}
