"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    console.log("[v0] AuthProvider initializing")

    // Check if user is logged in
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      console.log("[v0] Found saved user in localStorage")
      setUser(JSON.parse(savedUser))
    } else {
      console.log("[v0] No saved user found")
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    console.log("[v0] Existing users count:", users.length)

    if (users.length === 0) {
      console.log("[v0] Creating default admin user")
      const adminUser = {
        id: "admin-1",
        email: "admin@shophub.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        isAdmin: true,
      }
      localStorage.setItem("users", JSON.stringify([adminUser]))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("[v0] Login function called with email:", email)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    console.log("[v0] Checking against", users.length, "users")

    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)

    if (foundUser) {
      console.log("[v0] User found, logging in")
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return true
    }

    console.log("[v0] User not found or password incorrect")
    return false
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: User & { password: string }) => u.email === email)) {
      return false
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      firstName,
      lastName,
      isAdmin: false,
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    console.log("[v0] Logging out user")
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  if (!mounted) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
