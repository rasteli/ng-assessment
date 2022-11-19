import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { TransactionProvider } from "./contexts/TransactionContext"

import "./styles/global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </AuthProvider>
  </React.StrictMode>
)
