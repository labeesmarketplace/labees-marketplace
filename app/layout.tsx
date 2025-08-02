import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { RoleProvider } from "@/contexts/RoleContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Labees 2.0 - AI-Powered Fashion Marketplace",
  description: "Try before you buy with AI magic. Create your 3D avatar and see how any outfit looks on you.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoleProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </RoleProvider>
      </body>
    </html>
  )
}
