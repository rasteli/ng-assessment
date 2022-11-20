import { Request, Response } from "express"
import { CreateTransaction } from "../services/create-transaction"

import { DatabaseAccountRepository } from "../repositories/database/database-account-repository"
import { DatabaseTransactionRepository } from "../repositories/database/database-transaction-repository"

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { username } = request
    const { value, recipient } = request.body

    if (username === recipient) {
      return response.status(403).json({ error: "Você não pode transferir para si mesmo" })
    }

    const accountRepository = new DatabaseAccountRepository()
    const transactionRepository = new DatabaseTransactionRepository()

    try {
      const service = new CreateTransaction(transactionRepository, accountRepository)

      const result = await service.execute({
        value,
        recipient,
        sender: username
      })

      return response.status(201).json(result)
    } catch (error: any) {
      return response.status(403).json({ error: error.message })
    }
  }
}
