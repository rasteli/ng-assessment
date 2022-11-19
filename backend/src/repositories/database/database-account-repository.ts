import { Account } from "../../entities/account"
import { prismaClient } from "../../prisma"
import { AccountRepository } from "../account-repository"

export class DatabaseAccountRepository implements AccountRepository {
  async findByUsername(username: string): Promise<Account | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username
      },
      include: {
        account: true
      }
    })

    // @ts-ignore
    return user?.account
  }

  async save(account: Account): Promise<void> {}
}
