import { User } from "../../entities/user"
import { UserRepository } from "../user-repository"

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}
