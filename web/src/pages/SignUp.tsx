import { Link } from "react-router-dom"
import { User, Lock } from "phosphor-react"

import { Heading } from "../components/Heading"
import { Logo } from "../components/Logo"
import { Text } from "../components/Text"
import { TextInput } from "../components/TextInput"
import { Button } from "../components/Button"

import { useAuth } from "../contexts/AuthContext"

export function SignUp() {
  const { signUp } = useAuth()

  async function handleSignUpUser(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const retypePassword = formData.get("retype-password") as string

    if (password !== retypePassword) return

    await signUp(username, password)
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-gray-100">
      <header className="flex flex-col justify-center items-center">
        <Logo />
        <Heading>NG</Heading>
        <Text className="text-gray-400">Crie sua conta agora!</Text>
      </header>

      <form
        onSubmit={handleSignUpUser}
        className="flex flex-col gap-4 items-stretch mt-10 w-full max-w-sm"
      >
        <label htmlFor="username">
          <Text className="font-semibold">Nome de usuário</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Field
              required
              name="username"
              id="username"
              type="username"
              placeholder="johndoe"
            />
          </TextInput.Root>
        </label>
        <label htmlFor="password">
          <Text className="font-semibold">Sua senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Field
              required
              name="password"
              id="password"
              type="password"
              placeholder="**********"
            />
          </TextInput.Root>
        </label>
        <label htmlFor="retype-password">
          <Text className="font-semibold">Reinsira sua senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Field
              required
              name="retype-password"
              id="retype-password"
              type="password"
              placeholder="**********"
            />
          </TextInput.Root>
        </label>

        <Button type="submit" className="mt-4">
          <Text className="font-semibold text-black">Entrar na plataforma</Text>
        </Button>
      </form>

      <footer className="mt-4">
        <Text className="text-gray-400 ">
          Já possui uma conta?{" "}
          <Link to="/login" className="underline">
            Acesse-a agora!
          </Link>
        </Text>
      </footer>
    </div>
  )
}
