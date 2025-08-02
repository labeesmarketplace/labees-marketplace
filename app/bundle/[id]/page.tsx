"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Share, Sparkles, RefreshCw, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const bundleItems = [
  {
    id: 1,
    name: "Modest Blazer",
    price: 180,
    image: "/placeholder.svg?height=200&width=200",
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Wide-leg Trousers",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    category: "Bottoms",
  },
  {
    id: 3,
    name: "Silk Hijab",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: 115,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
]

const themes = [
  { id: "campus", name: "Campus", active: true },
  { id: "work", name: "Work", active: false },
  { id: "evening", name: "Evening", active: false },
]

export default function BundleViewPage() {
  const [selectedTheme, setSelectedTheme] = useState("campus")
  const [selectedItems, setSelectedItems] = useState(bundleItems.map((item) => item.id))
  const { toast } = useToast()

  const totalPrice = bundleItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)

  const originalPrice = 580
  const savings = originalPrice - totalPrice

  const handleReplaceItem = (itemId: number) => {
    toast({
      title: "Item replacement",
      description: "AI is finding similar alternatives...",
    })
  }

  const handleAddAllToCart = () => {
    toast({
      title: "Bundle added to cart!",
      description: `${selectedItems.length} items added successfully`,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="font-semibold text-[#003153]">Campus Chic Bundle</h1>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Bundle Preview */}
        <div className="mb-6">
          <Card className="p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#003153] mb-1">Campus Chic Bundle</h2>
                <p className="text-gray-600">Perfect for university and casual outings</p>
              </div>
              <Badge className="ai-badge">
                <Sparkles className="w-3 h-3 mr-1" />
                87% Match
              </Badge>
            </div>

            {/* Theme Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Choose Theme</h3>
              <div className="flex space-x-2">
                {themes.map((theme) => (
                  <Button
                    key={theme.id}
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={selectedTheme === theme.id ? "primary-button" : ""}
                  >
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bundle Preview Image */}
            <div className="relative mb-6">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Bundle Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-[#003153]">Complete Look</Badge>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between p-4 bg-[#00A388]/5 rounded-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-[#003153]">QAR {totalPrice}</span>
                  <span className="text-lg text-gray-500 line-through">QAR {originalPrice}</span>
                </div>
                <p className="text-sm text-[#00A388] font-medium">Save QAR {savings}</p>
              </div>
              <Button className="primary-button">Try All On</Button>
            </div>
          </Card>
        </div>

        {/* Individual Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#003153] mb-4">Bundle Items</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {bundleItems.map((item) => (
              <Card key={item.id} className="overflow-hidden card-shadow">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => handleReplaceItem(item.id)}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 mb-1">{item.category}</p>
                  <h4 className="font-medium text-sm mb-2">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#003153]">QAR {item.price}</span>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto bg-transparent">
                      Replace
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleAddAllToCart} className="w-full primary-button">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add Complete Bundle to Cart
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full bg-transparent">
              Add Individual Items
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Save for Later
            </Button>
          </div>
        </div>

        {/* AI Suggestions */}
        <Card className="mt-6 p-4 bg-[#00A388]/5 border-[#00A388]/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#00A388] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-[#003153] mb-1">AI Styling Tip</h4>
              <p className="text-sm text-gray-700">
                This bundle works great for campus life! The blazer can be removed for a more casual look, and the
                handbag has enough space for textbooks and essentials.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
