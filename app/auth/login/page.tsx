"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Store, User, Crown, Zap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type UserType = "customer" | "vendor" | null

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [userType, setUserType] = useState<UserType>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Welcome back! 👋",
        description: "Successfully signed in to your account",
      })
      router.push("/home")
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      toast({
        title: "Please accept terms",
        description: "You must accept the terms and conditions to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: `Welcome to Labees! 🎉`,
        description: `Your ${userType} account has been created successfully`,
      })

      // Redirect based on user type
      if (userType === "vendor") {
        router.push("/vendor/onboarding")
      } else {
        router.push("/onboarding")
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: "Social login will be available soon",
    })
  }

  const resetSignUp = () => {
    setUserType(null)
    setName("")
    setBusinessName("")
    setPhone("")
    setEmail("")
    setPassword("")
    setAcceptTerms(false)
  }

  // User Type Selection Screen
  if (!isSignIn && !userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 card-shadow bg-white/80 backdrop-blur-sm">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#003153] to-[#00A388] bg-clip-text text-transparent">
              Labees
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#003153] mb-2">Join Labees</h2>
            <p className="text-gray-600">Choose how you'd like to get started</p>
          </div>

          <div className="space-y-4">
            {/* Customer Option */}
            <button
              onClick={() => setUserType("customer")}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#00A388] hover:bg-[#00A388]/5 transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00A388] to-[#003153] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#003153] mb-1">I'm a Customer</h3>
                  <p className="text-sm text-gray-600">Shop AI-powered modest fashion</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center text-xs text-[#00A388]">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Try-On
                    </div>
                    <div className="flex items-center text-xs text-[#F4BB3B]">
                      <Crown className="w-3 h-3 mr-1" />
                      Style Rewards
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Vendor Option */}
            <button
              onClick={() => setUserType("vendor")}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#003153] hover:bg-[#003153]/5 transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#003153] to-[#F4BB3B] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#003153] mb-1">I'm a Vendor</h3>
                  <p className="text-sm text-gray-600">Sell your fashion designs</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center text-xs text-[#003153]">
                      <Zap className="w-3 h-3 mr-1" />
                      AI Analytics
                    </div>
                    <div className="flex items-center text-xs text-[#EF6950]">
                      <Store className="w-3 h-3 mr-1" />
                      Marketplace
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button onClick={() => setIsSignIn(true)} className="text-[#00A388] hover:text-[#00A388]/80 font-medium">
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 card-shadow bg-white/80 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#003153] to-[#00A388] bg-clip-text text-transparent">
            Labees
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-[#003153] mb-2">
            {isSignIn
              ? "Sign in to your account"
              : userType === "customer"
                ? "Create your customer account"
                : "Create your vendor account"}
          </h2>
          <p className="text-gray-600 text-sm">
            {isSignIn
              ? "Welcome back to the future of fashion"
              : userType === "customer"
                ? "Join the AI-powered fashion revolution"
                : "Start selling on the leading modest fashion platform"}
          </p>
        </div>

        {/* Toggle Buttons - Only show for sign in */}
        {isSignIn && (
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-[#003153] to-[#00A388] text-white shadow-md"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false)
                setUserType(null)
              }}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 hover:text-[#003153]"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Back button for signup */}
        {!isSignIn && userType && (
          <div className="flex items-center justify-between mb-6">
            <button onClick={resetSignUp} className="flex items-center text-sm text-gray-600 hover:text-[#003153]">
              ← Back to options
            </button>
            <div className="flex items-center space-x-2">
              {userType === "customer" ? (
                <div className="flex items-center text-sm text-[#00A388]">
                  <User className="w-4 h-4 mr-1" />
                  Customer
                </div>
              ) : (
                <div className="flex items-center text-sm text-[#003153]">
                  <Store className="w-4 h-4 mr-1" />
                  Vendor
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={isSignIn ? handleSubmit : handleSignUp} className="space-y-4">
          {/* Name Field (Sign Up only) */}
          {!isSignIn && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder={userType === "vendor" ? "Contact Person Name" : "Full Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                required={!isSignIn}
              />
            </div>
          )}

          {/* Business Name (Vendor only) */}
          {!isSignIn && userType === "vendor" && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Store className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Business/Brand Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                required
              />
            </div>
          )}

          {/* Phone (Sign Up only) */}
          {!isSignIn && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">📱</span>
              </div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                required={!isSignIn}
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="email"
              placeholder={userType === "vendor" ? "Business Email" : "Email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Terms & Conditions (Sign Up only) */}
          {!isSignIn && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={setAcceptTerms}
                className="border-gray-300 mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#00A388] hover:text-[#00A388]/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#00A388] hover:text-[#00A388]/80">
                  Privacy Policy
                </Link>
                {userType === "vendor" && (
                  <>
                    {" "}
                    and{" "}
                    <Link href="/vendor-terms" className="text-[#00A388] hover:text-[#00A388]/80">
                      Vendor Agreement
                    </Link>
                  </>
                )}
              </label>
            </div>
          )}

          {/* Remember Me & Forgot Password (Sign In only) */}
          {isSignIn && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-gray-300"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#00A388] hover:text-[#00A388]/80">
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || (!isSignIn && !acceptTerms)}
            className="w-full h-12 bg-gradient-to-r from-[#003153] to-[#00A388] hover:from-[#003153]/90 hover:to-[#00A388]/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>
                  {isSignIn ? "Sign In" : userType === "customer" ? "Create Customer Account" : "Create Vendor Account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>

        {/* Social Login (Sign In only) */}
        {isSignIn && (
          <>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("Apple")}
                className="h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </Button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {isSignIn ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setIsSignIn(false)} className="text-[#00A388] hover:text-[#00A388]/80 font-medium">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsSignIn(true)} className="text-[#00A388] hover:text-[#00A388]/80 font-medium">
                Sign in
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
