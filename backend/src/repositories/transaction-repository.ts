import { Transaction } from "../entities/transaction"

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>
  findAllByUsername(username: string): Promise<Transaction[]>
}
