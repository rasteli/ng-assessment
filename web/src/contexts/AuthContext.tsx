import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

interface User {
  id: string
  username: string
  account: {
    id: string
    balance: number
  }
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextData {
  user: User | null
  signOut: () => void
  login(username: string, password: string): Promise<void>
  signUp(username: string, password: string): Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem("@ng:token")

      if (!token) return

      api.defaults.headers.authorization = `Bearer ${token}`

      const response = await api.get("/users")
      const user = response.data

      setUser(user)
    })()
  }, [])

  async function authenticate(resource: string, username: string, password: string) {
    const response = await api.post(resource, {
      username,
      password
    })

    const { user, token } = response.data

    setUser(user)
    localStorage.setItem("@ng:token", token)
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  async function signUp(username: string, password: string) {
    await authenticate("/signup", username, password)
  }

  async function login(username: string, password: string) {
    await authenticate("/login", username, password)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@ng:token")
  }

  const value: AuthContextData = {
    user,
    login,
    signUp,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
