import { Transaction } from "../../entities/transaction"
import { TransactionRepository } from "../transaction-repository"

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = []

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async findAllByUsername(username: string): Promise<Transaction[]> {
    return this.transactions
  }
}
