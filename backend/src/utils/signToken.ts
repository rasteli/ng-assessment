import { sign } from "jsonwebtoken"

export function signToken(payload: object, subject: string): string {
  const token = sign(payload, process.env.VITE_JWT_SECRET_KEY!, {
    subject,
    expiresIn: "1d"
  })

  return token
}
