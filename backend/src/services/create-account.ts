import { Account } from "../entities/account"
import { AccountRepository } from "../repositories/account-repository"

interface CreateAccountRequest {
  balance: number
}

type CreateAccountResponse = Account

export class CreateAccount {
  constructor(private AccountRepository: AccountRepository) {}

  async execute({ balance }: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = new Account(balance)

    await this.AccountRepository.save(account)

    return account
  }
}
