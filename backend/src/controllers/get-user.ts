import { Request, Response } from "express"
import { GetUser } from "../services/get-user"
import { DatabaseUserRepository } from "../repositories/database/database-user-repository"

export class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request

    const userRepository = new DatabaseUserRepository()

    try {
      const service = new GetUser(userRepository)

      const result = await service.execute({ username })

      return response.status(200).json(result)
    } catch (error: any) {
      return response.status(404).json({ error: error.message })
    }
  }
}
