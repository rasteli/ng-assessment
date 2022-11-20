import { SignOut } from "phosphor-react"

import { SidePanel } from "./SidePanel"
import { Logo } from "../../components/Logo"
import { Heading } from "../../components/Heading"

import { useAuth } from "../../contexts/AuthContext"
import { TransactionTable } from "./TransactionTable"

export function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-10 bg-gray-900 flex items-center mt-3 mx-4 pb-3 border-b-[1px] border-gray-400">
        <div className="flex items-center flex-1 gap-6">
          <Logo width={80} height={80} />
          <Heading>Olá, {user?.username}</Heading>
        </div>
        <button className="text-red-400" title="Sair da conta" onClick={signOut}>
          <SignOut size={40} />
        </button>
      </header>

      <div className="grid grid-cols-[25%_75%] my-10 max-lg:flex max-lg:flex-col">
        <SidePanel />
        <TransactionTable />
      </div>
    </>
  )
}
