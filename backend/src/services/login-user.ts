import { compareHash } from "../utils/bcryption"
import { UserRepository } from "../repositories/user-repository"
import { signToken } from "../utils/signToken"
import { User } from "../entities/user"

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  user: Omit<User, string>
  token: string
}

// Exclude keys from user
function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ username, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    if (!compareHash(password, user.password)) {
      throw new Error("Senha incorreta")
    }

    const token = signToken({ user }, user.username)

    return { user: exclude(user, ["password"]), token }
  }
}
