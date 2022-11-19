import { Transaction } from "../entities/transaction"
import { TransactionRepository } from "../repositories/transaction-repository"

interface GetTransactionsRequest {
  username: string
}

type GetTransactionsResponse = Transaction[]

export class GetTransactions {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute({ username }: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    return await this.transactionRepository.findAllByUsername(username)
  }
}
