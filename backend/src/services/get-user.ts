import { User } from "../entities/user"
import { UserRepository } from "../repositories/user-repository"

interface GetUserRequest {
  username: string
}

type GetUserResponse = User | null

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ username }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    return user
  }
}
