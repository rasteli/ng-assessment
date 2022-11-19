import { Request, Response } from "express"
import { DatabaseUserRepository } from "../repositories/database/database-user-repository"
import { LoginUser } from "../services/login-user"

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const userRepository = new DatabaseUserRepository()

    try {
      const loginUser = new LoginUser(userRepository)
      const result = await loginUser.execute({ username, password })

      return response.status(200).json(result)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}
