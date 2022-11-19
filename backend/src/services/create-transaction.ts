import { Account } from "../entities/account"
import { Transaction } from "../entities/transaction"

import { AccountRepository } from "../repositories/account-repository"
import { TransactionRepository } from "../repositories/transaction-repository"

interface CreateTransactionRequest {
  sender: string
  recipient: string
  value: number
}

type CreateTransactionResponse = Transaction

export class CreateTransaction {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({
    sender,
    recipient,
    value
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const debitedAccount = await this.accountRepository.findByUsername(sender)
    const creditedAccount = await this.accountRepository.findByUsername(recipient)

    if (!debitedAccount || !creditedAccount) {
      throw new Error("Account not found")
    }

    if (debitedAccount.balance < value) {
      throw new Error("Insufficient funds")
    }

    const transaction = new Transaction(debitedAccount, creditedAccount, value)

    await this.transactionRepository.save(transaction)

    return transaction
  }
}
