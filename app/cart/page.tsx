"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Minus, Plus, Trash2, Truck, Clock, CreditCard, Smartphone, Banknote, Tag } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/CartContext"

const deliveryOptions = [
  {
    id: "next-day",
    name: "Next-Day Delivery",
    description: "Doha only",
    price: 12,
    eta: "Tomorrow by 6 PM",
    icon: Truck,
  },
  {
    id: "express",
    name: "48h GCC Delivery",
    description: "UAE, KSA, Bahrain, Kuwait",
    price: 35,
    eta: "2 business days",
    icon: Clock,
  },
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Free shipping",
    price: 0,
    eta: "3-5 business days",
    icon: Truck,
  },
]

const paymentMethods = [
  { id: "apple-pay", name: "Apple Pay", description: "Touch ID required", icon: Smartphone },
  { id: "card", name: "Credit/Debit Card", description: "Visa, Mastercard accepted", icon: CreditCard },
  { id: "cod", name: "Cash on Delivery", description: "+QAR 5 fee", icon: Banknote },
]

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [selectedDelivery, setSelectedDelivery] = useState("next-day")
  const [selectedPayment, setSelectedPayment] = useState("apple-pay")
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const { toast } = useToast()

  const deliveryFee = deliveryOptions.find((opt) => opt.id === selectedDelivery)?.price || 0
  const codFee = selectedPayment === "cod" ? 5 : 0
  const finalTotal = total + deliveryFee + codFee - promoDiscount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      const discount = Math.round(total * 0.1)
      setPromoDiscount(discount)
      toast({
        title: "🎉 Promo code applied!",
        description: `10% discount (QAR ${discount}) added`,
      })
    } else if (promoCode.toLowerCase() === "labees50") {
      setPromoDiscount(50)
      toast({
        title: "🎉 Promo code applied!",
        description: "QAR 50 discount added",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again",
        variant: "destructive",
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F4]">
        <header className="flex items-center justify-between p-4 bg-white border-b card-shadow">
          <Link href="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-semibold text-[#003153]">Shopping Cart</h1>
          <div className="w-8" />
        </header>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-[#003153] mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link href="/home">
              <Button className="primary-button">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b card-shadow sticky top-0 z-40">
        <Link href="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="font-semibold text-[#003153]">
          🛍️ Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>
        <div className="w-8" />
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Cart Items */}
        <Card className="p-4 bg-white card-shadow">
          <h2 className="font-semibold text-[#003153] mb-4">Your Items</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex space-x-4 p-4 border rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-[#003153]">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(`${item.id}-${item.size}-${item.color}`)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-[#003153]">QAR {item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivery Options */}
        <Card className="p-4 bg-white card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">🚚 Delivery Options</h3>
          <div className="space-y-3">
            {deliveryOptions.map((option) => (
              <div
                key={option.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDelivery === option.id
                    ? "border-[#003153] bg-[#003153]/5"
                    : "border-gray-200 hover:border-[#003153]/30"
                }`}
                onClick={() => setSelectedDelivery(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-5 h-5 text-[#003153]" />
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <p className="text-sm text-[#00A388]">📅 {option.eta}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#003153]">{option.price === 0 ? "FREE" : `QAR ${option.price}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Promo Code */}
        <Card className="p-4 bg-white card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">🎁 Promo Code</h3>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#003153]"
              />
            </div>
            <Button
              onClick={applyPromoCode}
              variant="outline"
              className="bg-transparent border-[#003153] text-[#003153] hover:bg-[#003153] hover:text-white"
            >
              Apply
            </Button>
          </div>
          {promoDiscount > 0 && (
            <div className="mt-2 p-2 bg-[#00A388]/10 rounded-lg">
              <p className="text-sm text-[#00A388] font-medium">✅ Promo applied! You saved QAR {promoDiscount}</p>
            </div>
          )}
          <div className="mt-3 text-xs text-gray-500">
            Try: <span className="font-mono bg-gray-100 px-1 rounded">WELCOME10</span> or{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">LABEES50</span>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-4 bg-white card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">💳 Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPayment === method.id
                    ? "border-[#003153] bg-[#003153]/5"
                    : "border-gray-200 hover:border-[#003153]/30"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <method.icon className="w-5 h-5 text-[#003153]" />
                  <div>
                    <span className="font-medium">{method.name}</span>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4 bg-white card-shadow">
          <h3 className="font-semibold text-[#003153] mb-4">📋 Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} items)</span>
              <span>QAR {total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? "FREE" : `QAR ${deliveryFee}`}</span>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between">
                <span>COD Fee</span>
                <span>QAR {codFee}</span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-[#00A388]">
                <span>Promo Discount</span>
                <span>-QAR {promoDiscount}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-bold text-[#003153]">
                <span>Total</span>
                <span>QAR {finalTotal}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Checkout Button */}
        <Link href="/checkout">
          <Button className="w-full primary-button button-press text-lg py-4">
            🔒 Proceed to Checkout - QAR {finalTotal}
          </Button>
        </Link>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          🔒 Secure checkout • 256-bit SSL encryption • Your data is protected
        </div>
      </div>
    </div>
  )
}
