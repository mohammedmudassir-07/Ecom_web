import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { ThemeProvider } from "@/context/theme-context"
import { ViewportProvider } from "@/context/viewport-context"
import { Navbar } from "@/components/navbar"
import { ViewportWrapper } from "@/components/viewport-wrapper"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "ShopHub - Modern E-Commerce",
  description: "Your one-stop shop for quality products",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <ViewportProvider>
              <AuthProvider>
                <CartProvider>
                  <Navbar />
                  <main className="min-h-screen">
                    <ViewportWrapper>{children}</ViewportWrapper>
                  </main>
                </CartProvider>
              </AuthProvider>
            </ViewportProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
