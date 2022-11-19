import { User } from "../../entities/user"
import { prismaClient } from "../../prisma"
import { UserRepository } from "../user-repository"

export class DatabaseUserRepository implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        username
      },
      include: {
        account: true
      }
    })

    return user
  }

  async save(user: User): Promise<void> {
    await prismaClient.user.create({
      data: {
        username: user.username,
        password: user.password,
        account: {
          create: {
            balance: 10000 // balance in cents
          }
        }
      }
    })
  }
}
