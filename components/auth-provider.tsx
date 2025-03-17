"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserRole = "doctor" | "nurse" | "admin" | null
type AuthContextType = {
  isAuthenticated: boolean
  userRole: UserRole
  login: (role: UserRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const role = localStorage.getItem("userRole") as UserRole

    setIsAuthenticated(loggedIn)
    setUserRole(role)
    setIsLoading(false)

    // If not authenticated and not on login page, redirect to login
    if (!loggedIn && pathname !== "/login" && !isLoading) {
      router.push("/login")
    }
  }, [pathname, router, isLoading])

  const login = (role: UserRole) => {
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", role || "")
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

