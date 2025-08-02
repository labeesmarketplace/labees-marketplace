"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location: string
  styleScore: number
  memberSince: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Alya Al-Rashid",
    email: "alya@example.com",
    location: "Doha, Qatar",
    styleScore: 87,
    memberSince: "December 2024",
  })

  const login = async (email: string, password: string) => {
    // Simulate login
    setUser({
      id: "1",
      name: "Alya Al-Rashid",
      email,
      location: "Doha, Qatar",
      styleScore: 87,
      memberSince: "December 2024",
    })
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
