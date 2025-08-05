"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Heart,
  Share,
  Camera,
  Sparkles,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  RotateCw,
  Sun,
  Cloud,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/CartContext"

const productData = {
  id: "1",
  name: "Modest Maxi Dress",
  brand: "Noor Collection",
  price: 180,
  images: [
    "/products/modest-maxi-dress-front.jpg",
    "/products/modest-maxi-dress-side.jpg",
    "/products/modest-maxi-dress-back.jpg",
  ],
  colors: [
    { name: "Navy", value: "#003153" },
    { name: "Black", value: "#000000" },
    { name: "Burgundy", value: "#800020" },
  ],
  sizes: [
    { size: "XS", stock: "low", available: 2 },
    { size: "S", stock: "available", available: 12 },
    { size: "M", stock: "available", available: 8 },
    { size: "L", stock: "available", available: 15 },
    { size: "XL", stock: "out", available: 0 },
  ],
  aiMatch: 94,
  rating: 4.8,
  reviews: 124,
  tryOnViews: 1247,
  description:
    "This elegant modest maxi dress combines contemporary style with traditional values. Crafted from premium fabric with a tailored fit that flatters while maintaining modesty. Perfect for professional settings, special occasions, or elevated everyday wear.",
  features: ["Premium Cotton Blend", "Machine Wash Cold", "Made in UAE", "Modest Cut"],
}

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAITryOn, setShowAITryOn] = useState(false)
  const [aiTryOnStep, setAiTryOnStep] = useState("loading") // loading, ready, poses
  const [selectedPose, setSelectedPose] = useState("front")
  const [selectedLighting, setSelectedLighting] = useState("daylight")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()
  const { addItem } = useCart()

  const poses = [
    { id: "front", label: "Front", icon: "👤" },
    { id: "left", label: "45° Left", icon: "↖️" },
    { id: "side", label: "Side", icon: "👥" },
    { id: "right", label: "45° Right", icon: "↗️" },
    { id: "back", label: "Back", icon: "🔄" },
  ]

  const lightingOptions = [
    { id: "daylight", label: "Daylight", icon: Sun },
    { id: "indoor", label: "Indoor", icon: Cloud },
    { id: "evening", label: "Evening", icon: Moon },
  ]

  const handleTryOn = () => {
    setIsGenerating(true)
    setShowAITryOn(true)
    setAiTryOnStep("loading")

    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false)
      setAiTryOnStep("ready")
      toast({
        title: "✨ AI Try-On Ready!",
        description: "Your virtual fitting is complete",
      })
    }, 3000)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: productData.id,
      name: productData.name,
      brand: productData.brand,
      price: productData.price,
      size: selectedSize,
      color: selectedColor.name,
      image: productData.images[0],
    })

    toast({
      title: "Added to cart! 🛍️",
      description: `${productData.name} in ${selectedColor.name}, Size ${selectedSize}`,
    })
  }

  const getSizeStatus = (size: (typeof productData.sizes)[0]) => {
    if (size.stock === "out") return { color: "text-red-600", bg: "bg-red-50 border-red-200", disabled: true }
    if (size.stock === "low") return { color: "text-orange-600", bg: "bg-orange-50 border-orange-200", disabled: false }
    return { color: "text-green-600", bg: "bg-green-50 border-green-200", disabled: false }
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
        <h1 className="font-semibold text-[#003153] truncate mx-4">{productData.name}</h1>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 p-4">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={productData.images[currentImageIndex] || "/placeholder.svg"}
              alt={productData.name}
              className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4 ai-badge">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Try-On Available
            </Badge>
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-xs text-white bg-black/50 px-2 py-1 rounded">
              <Eye className="w-3 h-3" />
              <span>{productData.tryOnViews} try-ons</span>
            </div>

            {/* Image Navigation */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {productData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          {/* Try-On Button */}
          <Button onClick={handleTryOn} className="w-full primary-button button-press" disabled={isGenerating}>
            <Camera className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating Avatar..." : "✨ Try On with AI"}
          </Button>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">{productData.brand}</p>
            <h1 className="text-2xl font-bold text-[#003153] mb-2">{productData.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                <span className="text-sm">
                  {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>
              <Badge className="ai-badge">{productData.aiMatch}% AI Match</Badge>
            </div>
            <div className="text-3xl font-bold text-[#003153]">QAR {productData.price}</div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Color: {selectedColor.name}</h3>
            <div className="flex space-x-3">
              {productData.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? "border-[#003153] scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {productData.sizes.map((item) => {
                const status = getSizeStatus(item)
                return (
                  <button
                    key={item.size}
                    onClick={() => !status.disabled && setSelectedSize(item.size)}
                    disabled={status.disabled}
                    className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === item.size
                        ? "border-[#003153] bg-[#003153] text-white"
                        : status.disabled
                          ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                          : `${status.bg} ${status.color} hover:border-[#003153]`
                    }`}
                  >
                    {item.size}
                    {item.stock === "low" && !status.disabled && <div className="text-xs">Only {item.available}</div>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <Card className="p-4 bg-[#00A388]/5 border-[#00A388]/20">
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-[#00A388]" />
              <div>
                <p className="font-medium text-[#003153]">Next-Day Delivery to Doha</p>
                <p className="text-sm text-gray-600">Order within 4h 32m for QAR 12</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleAddToCart} className="w-full primary-button button-press">
              Add to Cart - QAR {productData.price * quantity}
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#003153] text-[#003153] hover:bg-[#003153] hover:text-white"
            >
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Shield className="w-6 h-6 text-[#00A388] mx-auto mb-2" />
              <p className="text-xs font-medium">Authentic</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 text-[#00A388] mx-auto mb-2" />
              <p className="text-xs font-medium">Easy Returns</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-6 h-6 text-[#00A388] mx-auto mb-2" />
              <p className="text-xs font-medium">AI Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Try-On Modal */}
      {showAITryOn && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            {aiTryOnStep === "loading" && (
              <div className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-[#00A388] rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#00A388] animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#003153] mb-2">Creating Your Try-On</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-[#00A388] h-2 rounded-full shimmer"></div>
                </div>
                <p className="text-sm text-gray-600">This will take just a moment...</p>
              </div>
            )}

            {aiTryOnStep === "ready" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#003153]">AI Try-On</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowAITryOn(false)} className="text-gray-500">
                    ✕
                  </Button>
                </div>

                {/* Avatar with Product */}
                <div className="relative mb-4">
                  <div className="w-full h-80 bg-gradient-to-b from-[#FAF8F4] to-white rounded-lg border flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-40 bg-[#00A388]/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-[#00A388]" />
                      </div>
                      <p className="text-sm text-gray-600">Your Avatar wearing {productData.name}</p>
                    </div>
                  </div>
                  <Badge className="absolute top-2 left-2 ai-badge">{productData.aiMatch}% Fit Match</Badge>
                </div>

                {/* Pose Controls */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Pose</h4>
                  <div className="flex space-x-2 overflow-x-auto">
                    {poses.map((pose) => (
                      <button
                        key={pose.id}
                        onClick={() => setSelectedPose(pose.id)}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedPose === pose.id
                            ? "bg-[#003153] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mr-1">{pose.icon}</span>
                        {pose.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lighting Controls */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Lighting</h4>
                  <div className="flex space-x-2">
                    {lightingOptions.map((lighting) => (
                      <button
                        key={lighting.id}
                        onClick={() => setSelectedLighting(lighting.id)}
                        className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedLighting === lighting.id
                            ? "bg-[#F4BB3B] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <lighting.icon className="w-3 h-3" />
                        <span>{lighting.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spin Preview */}
                <div className="mb-6">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />🔄 Spin Preview (360°)
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAITryOn(false)}>
                    Close
                  </Button>
                  <Button
                    className="flex-1 primary-button"
                    onClick={() => {
                      handleAddToCart()
                      setShowAITryOn(false)
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>

                {/* Share Option */}
                <Button variant="outline" className="w-full mt-2 bg-transparent border-gray-300">
                  📱 Share Video (6s)
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Product Details Tabs */}
      <div className="max-w-6xl mx-auto p-4 mt-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="brand">Brand</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6 bg-white">
              <p className="text-gray-700 leading-relaxed">{productData.description}</p>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="space-y-3">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">
                      {index === 0 && "Material:"}
                      {index === 1 && "Care:"}
                      {index === 2 && "Origin:"}
                      {index === 3 && "Fit:"}
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-bold">{productData.rating}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Based on {productData.reviews} reviews</p>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Write Review
                </Button>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#00A388] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">A</span>
                      </div>
                      <span className="font-medium">Aisha K.</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Perfect fit and beautiful quality. The AI try-on was so accurate - the dress fits exactly as shown!
                    The fabric is comfortable and the modest cut is exactly what I was looking for.
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className="ai-badge text-xs">AI Try-On Used</Badge>
                    <span className="text-xs text-gray-500">Verified Purchase</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="brand" className="mt-6">
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-[#003153] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">NC</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#003153]">{productData.brand}</h3>
                  <p className="text-sm text-gray-600">Modest Fashion Pioneer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Founded in Dubai, Noor Collection creates contemporary modest fashion that celebrates both style and
                values. Each piece is designed with the modern Muslim woman in mind, combining elegance with comfort.
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent border-[#003153] text-[#003153] hover:bg-[#003153] hover:text-white"
              >
                View All from {productData.brand}
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
