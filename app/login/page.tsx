"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    console.log("[v0] Login attempt with email:", email)

    const success = await login(email, password)

    console.log("[v0] Login result:", success)

    if (success) {
      console.log("[v0] Login successful, redirecting to home")
      router.push("/")
    } else {
      setError("Invalid email or password")
      console.log("[v0] Login failed")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = async () => {
    setEmail("admin@shophub.com")
    setPassword("admin123")
    setError("")
    setIsLoading(true)

    console.log("[v0] Demo login attempt")

    const success = await login("admin@shophub.com", "admin123")

    if (success) {
      console.log("[v0] Demo login successful")
      router.push("/")
    } else {
      setError("Demo login failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: admin@shophub.com
                  <br />
                  Password: admin123
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Try Demo Login
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
