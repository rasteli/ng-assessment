import { User } from "../entities/user"

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>
  save(user: User): Promise<void>
}
