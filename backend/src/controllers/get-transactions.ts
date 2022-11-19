import { Request, Response } from "express"
import { GetTransactions } from "../services/get-transactions"
import { DatabaseTransactionRepository } from "../repositories/database/database-transaction-repository"

export class GetTransactionsController {
  async handle(request: Request, response: Response) {
    const { username } = request

    const transactionRepository = new DatabaseTransactionRepository()
    const service = new GetTransactions(transactionRepository)

    const result = await service.execute({ username })

    return response.status(200).json(result)
  }
}
