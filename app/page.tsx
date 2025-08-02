"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sparkles, Users, Zap, Heart, ArrowRight, Play, MapPin } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
  const { toast } = useToast()

  const handleGetStarted = () => {
    // Direct to auth page instead of beta signup
    window.location.href = "/auth/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F4] to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#003153] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#003153]">Labees</span>
        </div>
        <Badge className="ai-badge">
          <Zap className="w-3 h-3 mr-1" />
          AI-Powered
        </Badge>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="ai-badge">
                <Users className="w-3 h-3 mr-1" />
                {/* {waitlistCount.toLocaleString()} joined today */}
                Thousands of users
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-[#003153] leading-tight">
                Try Before You Buy with <span className="text-[#00A388]">AI Magic</span>
              </h1>
              <p className="text-xl text-gray-600">
                Create your 3D avatar and see how any outfit looks on you instantly. The future of modest fashion
                shopping is here.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full card-shadow">
                <Sparkles className="w-4 h-4 text-[#00A388]" />
                <span>3D Avatar</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full card-shadow">
                <Zap className="w-4 h-4 text-[#F4BB3B]" />
                <span>Real Fabric Physics</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full card-shadow">
                <Heart className="w-4 h-4 text-[#EF6950]" />
                <span>Perfect Fit Guarantee</span>
              </div>
            </div>

            {/* Authentication Buttons */}
            <Card className="p-6 card-shadow bg-white">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#003153] text-center">Ready to get started?</h3>
                <div className="space-y-3">
                  <Link href="/auth/login">
                    <Button className="w-full primary-button button-press">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="w-full border-[#003153] text-[#003153] hover:bg-[#003153] hover:text-white bg-transparent"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500 text-center">Join thousands of fashion lovers in the GCC</p>
              </div>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00A388]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-[#00A388]" />
                </div>
                <p className="text-sm font-medium">AI Try-On</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#F4BB3B]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-[#F4BB3B]" />
                </div>
                <p className="text-sm font-medium">Smart Bundles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#003153]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-[#003153]" />
                </div>
                <p className="text-sm font-medium">Next-Day Delivery</p>
              </div>
            </div>
          </div>

          {/* Phone Mockup with AI Demo */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-[600px] bg-black rounded-[3rem] p-2">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Simulated AI Try-On Animation */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#FAF8F4] to-white">
                  <div className="relative">
                    <img
                      src="/placeholder.svg?height=400&width=300&text=AI+Avatar+Demo"
                      alt="AI Try-On Demo"
                      className="w-72 h-96 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="ai-badge">
                        <Play className="w-3 h-3 mr-1" />
                        AI Try-On
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm font-medium">Perfect fit detected!</p>
                        <p className="text-xs text-gray-600">94% style match confidence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-[#00A388] text-white p-3 rounded-full animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#F4BB3B] text-white p-3 rounded-full animate-pulse">
              <Heart className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#003153]">98%</div>
              <div className="text-sm text-gray-600">Try-On Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#003153]">24h</div>
              <div className="text-sm text-gray-600">Doha Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#003153]">500+</div>
              <div className="text-sm text-gray-600">Local Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#003153]">15%</div>
              <div className="text-sm text-gray-600">Return Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003153] text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">Labees</span>
          </div>
          <p className="text-white/80 mb-4">The future of AI-powered modest fashion in the GCC</p>
          <div className="flex items-center justify-center space-x-1 text-sm text-white/60">
            <MapPin className="w-4 h-4" />
            <span>Made with ❤️ in Qatar</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
