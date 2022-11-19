import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { DynamicRoute } from "./components/DynamicRoute"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DynamicRoute type="protected">
              <Dashboard />
            </DynamicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <DynamicRoute type="public">
              <Login />
            </DynamicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <DynamicRoute type="public">
              <SignUp />
            </DynamicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
