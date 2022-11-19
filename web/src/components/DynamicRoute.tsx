import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface DynamicRouteProps {
  children: JSX.Element
  type: "protected" | "public"
}

// Protected routes are only accessible to authenticated users. On the other hand,
// routes I called public are only accessible to not-authenticated users.
// This is because, once a user is logged in — authenticated —, we shoudn't let
// them go back to pages they would access to become authenticated, since they already are.

export function DynamicRoute({ children, type }: DynamicRouteProps) {
  const { user } = useAuth()

  const renders = {
    protected: () => {
      if (!user) {
        return <Navigate to="/login" />
      }

      return children
    },
    public: () => {
      if (user) {
        return <Navigate to="/" />
      }

      return children
    }
  }

  const Render = renders[type]

  return <Render />
}
