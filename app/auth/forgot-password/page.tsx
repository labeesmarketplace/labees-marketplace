"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
      toast({
        title: "Reset link sent! 📧",
        description: "Check your email for password reset instructions",
      })
    }, 2000)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 card-shadow bg-white/80 backdrop-blur-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#00A388] to-[#003153] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-[#003153] mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full bg-gradient-to-r from-[#003153] to-[#00A388] hover:from-[#003153]/90 hover:to-[#00A388]/90 text-white font-semibold rounded-xl h-12">
                Back to Sign In
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setEmailSent(false)} className="w-full h-12 border-gray-200">
              Try different email
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 card-shadow bg-white/80 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#003153] to-[#00A388] bg-clip-text text-transparent">
              Labees
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#003153] mb-2">Forgot your password?</h2>
          <p className="text-gray-600">No worries! Enter your email and we'll send you a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#003153] to-[#00A388] hover:from-[#003153]/90 hover:to-[#00A388]/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-[#00A388] hover:text-[#00A388]/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
