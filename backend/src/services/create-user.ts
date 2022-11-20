import { User } from "../entities/user"
import { Account } from "../entities/account"
import { CreateAccount } from "./create-account"
import { UserRepository } from "../repositories/user-repository"
import { AccountRepository } from "../repositories/account-repository"
import { signToken } from "../utils/signToken"

interface CreateUserRequest {
  username: string
  password: string
}

interface CreateUserResponse {
  user: {
    username: string
    account: Account
  }
  token: string
}

export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({ username, password }: CreateUserRequest): Promise<CreateUserResponse> {
    let user = await this.userRepository.findByUsername(username)

    if (user) {
      throw new Error("Nome de usuário já existe")
    }

    user = new User(username, password)

    await this.userRepository.save(user)

    const token = signToken({ user }, user.username)

    const createAccountService = new CreateAccount(this.accountRepository)
    const account = await createAccountService.execute({ balance: 10000, user }) // balance in cents

    return {
      user: {
        username: user.username,
        account
      },
      token
    }
  }
}
