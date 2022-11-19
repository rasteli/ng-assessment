import { Request, Response } from "express"
import { CreateUser } from "../services/create-user"
import { DatabaseUserRepository } from "../repositories/database/database-user-repository"
import { DatabaseAccountRepository } from "../repositories/database/database-account-repository"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const userRepository = new DatabaseUserRepository()
    const accountRepository = new DatabaseAccountRepository()

    try {
      const service = new CreateUser(userRepository, accountRepository)

      const result = await service.execute({ username, password })

      return response.status(201).json(result)
    } catch (error: any) {
      return response.status(403).json({ error: error.message })
    }
  }
}
