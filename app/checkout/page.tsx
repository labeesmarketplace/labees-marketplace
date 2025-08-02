"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const { toast } = useToast()

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      toast({
        title: "Order placed successfully!",
        description: "You'll receive a confirmation email shortly",
      })
    }, 3000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center card-shadow">
          <div className="w-16 h-16 bg-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#003153] mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">Order #LB-2024-001</p>
          <Badge className="ai-badge mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Optimized Delivery Route
          </Badge>
          <div className="space-y-3">
            <Link href="/tracking">
              <Button className="w-full primary-button">Track Your Order</Button>
            </Link>
            <Button variant="outline" className="w-full bg-transparent">
              Share Your Look
            </Button>
            <Link href="/home">
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="font-semibold text-[#003153]">Checkout</h1>
        <div className="w-8" />
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Shipping Address */}
        <Card className="p-4 card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">Shipping Address</h3>
          <div className="space-y-3">
            <Input placeholder="Full Name" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Street Address" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="City" />
              <Input placeholder="Postal Code" />
            </div>
            <Input placeholder="Country" />
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4 card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg?height=60&width=60"
                alt="Modest Blazer"
                className="w-15 h-15 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">Modest Blazer</p>
                <p className="text-sm text-gray-600">Size M × 1</p>
              </div>
              <span className="font-bold">QAR 180</span>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg?height=60&width=60"
                alt="Wide-leg Trousers"
                className="w-15 h-15 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">Wide-leg Trousers</p>
                <p className="text-sm text-gray-600">Size M × 1</p>
              </div>
              <span className="font-bold">QAR 120</span>
            </div>
          </div>
          <div className="border-t pt-3 mt-3 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>QAR 300</span>
            </div>
            <div className="flex justify-between">
              <span>Next-Day Delivery</span>
              <span>QAR 12</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#003153]">
              <span>Total</span>
              <span>QAR 312</span>
            </div>
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-4 card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">Payment</h3>
          <div className="bg-[#00A388]/5 p-3 rounded-lg mb-4">
            <p className="text-sm text-[#003153] font-medium">Apple Pay Selected</p>
            <p className="text-xs text-gray-600">Touch ID or Face ID required</p>
          </div>
        </Card>

        {/* Place Order */}
        <Button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full primary-button">
          {isProcessing ? "Processing..." : "Place Order - QAR 312"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
