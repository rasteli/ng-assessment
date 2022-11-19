import * as bcrypt from "bcrypt"

export function hashPassowrd(password: string) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
