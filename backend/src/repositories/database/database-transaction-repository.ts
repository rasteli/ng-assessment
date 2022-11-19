import { Transaction } from "../../entities/transaction"
import { TransactionRepository } from "../transaction-repository"
import { prismaClient } from "../../prisma"

export class DatabaseTransactionRepository implements TransactionRepository {
  async save(transaction: Transaction): Promise<void> {
    await prismaClient.transaction.create({
      data: {
        value: transaction.value,
        creditedAccountId: transaction.creditedAccount.id!,
        debitedAccountId: transaction.debitedAccount.id!
      }
    })

    await prismaClient.account.update({
      where: {
        id: transaction.debitedAccount.id
      },
      data: {
        balance: transaction.debitedAccount.balance
      }
    })

    await prismaClient.account.update({
      where: {
        id: transaction.creditedAccount.id
      },
      data: {
        balance: transaction.creditedAccount.balance
      }
    })
  }

  async findAllByUsername(username: string): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        OR: [
          {
            creditedAccount: {
              User: {
                username
              }
            }
          },
          {
            debitedAccount: {
              User: {
                username
              }
            }
          }
        ]
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        creditedAccount: {
          include: {
            User: true
          }
        },
        debitedAccount: {
          include: {
            User: true
          }
        }
      }
    })

    // @ts-ignore
    return transactions
  }
}
