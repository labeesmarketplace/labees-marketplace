"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  ShoppingBag,
  Share2,
  Trash2,
  Sparkles,
  Star,
  Eye,
  TrendingUp,
  Filter,
  Grid,
  List,
  Plus,
  Minus,
  Camera,
  Gift,
  Clock,
  Tag,
  Zap,
  Crown,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/CartContext"

const wishlistItems = [
  {
    id: "1",
    name: "Professional Blazer",
    brand: "Noor Collection",
    price: 280,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    category: "Work",
    aiMatch: 94,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sizes: ["S", "M", "L"],
    colors: ["Navy", "Black", "Burgundy"],
    addedDate: "2024-01-15",
    priceDropped: true,
    trending: true,
    lastViewed: "2 days ago",
  },
  {
    id: "2",
    name: "Casual Abaya",
    brand: "Daily Modest",
    price: 220,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    category: "Casual",
    aiMatch: 89,
    rating: 4.6,
    reviews: 89,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Brown"],
    addedDate: "2024-01-10",
    priceDropped: false,
    trending: false,
    lastViewed: "1 week ago",
  },
  {
    id: "3",
    name: "Evening Dress",
    brand: "Elegance House",
    price: 450,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    category: "Evening",
    aiMatch: 96,
    rating: 4.9,
    reviews: 156,
    inStock: false,
    sizes: ["M", "L"],
    colors: ["Emerald", "Navy", "Burgundy"],
    addedDate: "2024-01-05",
    priceDropped: false,
    trending: true,
    lastViewed: "3 days ago",
  },
]

const aiRecommendations = [
  {
    id: "r1",
    name: "Matching Hijab Set",
    brand: "Modern Hijab Co",
    price: 45,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    reason: "Perfect match for your Professional Blazer",
    aiMatch: 92,
    category: "Accessories",
  },
  {
    id: "r2",
    name: "Work Pants",
    brand: "Noor Collection",
    price: 180,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    reason: "Complete your professional look",
    aiMatch: 88,
    category: "Work",
  },
  {
    id: "r3",
    name: "Elegant Handbag",
    brand: "Luxe Modest",
    price: 320,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    reason: "Complements your Evening Dress perfectly",
    aiMatch: 95,
    category: "Accessories",
  },
]

const collections = [
  {
    id: "work",
    name: "Work Essentials",
    items: ["1"],
    color: "bg-blue-500",
  },
  {
    id: "evening",
    name: "Evening Wear",
    items: ["3"],
    color: "bg-purple-500",
  },
  {
    id: "casual",
    name: "Everyday Comfort",
    items: ["2"],
    color: "bg-green-500",
  },
]

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showCollections, setShowCollections] = useState(false)
  const { toast } = useToast()
  const { addItem } = useCart()

  const filteredItems = wishlistItems.filter((item) => {
    if (selectedCategory === "all") return true
    if (selectedCategory === "trending") return item.trending
    if (selectedCategory === "price-drop") return item.priceDropped
    if (selectedCategory === "in-stock") return item.inStock
    if (selectedCategory === "out-stock") return !item.inStock
    return item.category.toLowerCase() === selectedCategory.toLowerCase()
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  const handleRemoveItem = (itemId: string) => {
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const handleAddToCart = (item: any) => {
    if (!item.inStock) {
      toast({
        title: "Out of stock",
        description: "This item is currently unavailable",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      size: item.sizes[0],
      color: item.colors[0],
      image: item.image,
    })

    toast({
      title: "Added to cart! 🛍️",
      description: `${item.name} has been added to your cart`,
    })
  }

  const handleTryOn = (itemId: string) => {
    toast({
      title: "Opening AI Try-On...",
      description: "Redirecting to virtual fitting room",
    })
  }

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to perform bulk actions",
        variant: "destructive",
      })
      return
    }

    switch (action) {
      case "cart":
        toast({
          title: `Added ${selectedItems.length} items to cart`,
          description: "Selected items have been added to your cart",
        })
        break
      case "remove":
        toast({
          title: `Removed ${selectedItems.length} items`,
          description: "Selected items have been removed from wishlist",
        })
        break
      case "share":
        toast({
          title: "Sharing wishlist...",
          description: "Creating shareable link for selected items",
        })
        break
    }
    setSelectedItems([])
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
        <CustomerSidebar />
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#063A5B]/20 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#063A5B] rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[#063A5B]">My Wishlist</h1>
                    <p className="text-sm text-[#063A5B]/80">Your saved fashion favorites</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-[#063A5B] text-white">
                  <Heart className="w-3 h-3 mr-1" />
                  {wishlistItems.length} Items
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCollections(!showCollections)}
                  className="text-[#063A5B]"
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-[#063A5B]">{wishlistItems.length}</div>
                  <div className="text-sm text-gray-600">Total Items</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {wishlistItems.filter((item) => item.inStock).length}
                  </div>
                  <div className="text-sm text-gray-600">In Stock</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {wishlistItems.filter((item) => item.priceDropped).length}
                  </div>
                  <div className="text-sm text-gray-600">Price Drops</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    QAR {wishlistItems.reduce((sum, item) => sum + item.price, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </Card>
              </div>

              {/* Filters and Controls */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                      <TabsList className="bg-[#063A5B]/10">
                        <TabsTrigger value="all" className="data-[state=active]:bg-[#063A5B] data-[state=active]:text-white">
                          All
                        </TabsTrigger>
                        <TabsTrigger value="trending" className="data-[state=active]:bg-[#063A5B] data-[state=active]:text-white">
                          Trending
                        </TabsTrigger>
                        <TabsTrigger value="price-drop" className="data-[state=active]:bg-[#063A5B] data-[state=active]:text-white">
                          Price Drops
                        </TabsTrigger>
                        <TabsTrigger value="in-stock" className="data-[state=active]:bg-[#063A5B] data-[state=active]:text-white">
                          In Stock
                        </TabsTrigger>
                        <TabsTrigger value="out-stock" className="data-[state=active]:bg-[#063A5B] data-[state=active]:text-white">
                          Out of Stock
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-[#063A5B]/20 rounded-lg bg-white text-sm focus:border-[#063A5B] focus:ring-1 focus:ring-[#063A5B]/20"
                    >
                      <option value="recent">Recently Added</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedItems.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedItems.length} selected</span>
                        <Button
                          size="sm"
                          onClick={() => handleBulkAction("cart")}
                          className="bg-[#063A5B] hover:bg-[#063A5B]/90 text-white"
                        >
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkAction("remove")}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    )}
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Collections */}
              {showCollections && (
                <Card className="p-4 bg-white/80 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-pink-700 mb-4">My Collections</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {collections.map((collection) => (
                      <div
                        key={collection.id}
                        className={`p-4 rounded-lg ${collection.color} text-white cursor-pointer hover:opacity-90 transition-opacity`}
                      >
                        <h4 className="font-medium mb-1">{collection.name}</h4>
                        <p className="text-sm opacity-90">{collection.items.length} items</p>
                      </div>
                    ))}
                    <div className="p-4 rounded-lg border-2 border-dashed border-pink-300 text-pink-600 cursor-pointer hover:bg-pink-50 transition-colors flex items-center justify-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Collection
                    </div>
                  </div>
                </Card>
              )}

              {/* Wishlist Items */}
              <div className="space-y-6">
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col space-y-1">
                            {item.priceDropped && (
                              <Badge className="bg-red-500 text-white text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Price Drop
                              </Badge>
                            )}
                            {item.trending && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {!item.inStock && (
                              <Badge className="bg-gray-500 text-white text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          {/* Selection Checkbox */}
                          <div className="absolute top-3 right-3">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                              className="w-4 h-4 text-pink-600 bg-white border-gray-300 rounded focus:ring-pink-500"
                            />
                          </div>

                          {/* AI Match */}
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {item.aiMatch}% Match
                            </Badge>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-pink-600 font-medium">{item.brand}</p>
                            <div className="flex items-center text-sm">
                              <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-lg font-bold text-pink-600">QAR {item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">QAR {item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>Added {new Date(item.addedDate).toLocaleDateString()}</span>
                            <span>Viewed {item.lastViewed}</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleAddToCart(item)}
                                disabled={!item.inStock}
                                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white disabled:opacity-50"
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                {item.inStock ? "Add to Cart" : "Out of Stock"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTryOn(item.id)}
                                className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                              >
                                <Camera className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                              >
                                <Share2 className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedItems.map((item) => (
                      <Card key={item.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-4 h-4 text-pink-600 bg-white border-gray-300 rounded focus:ring-pink-500"
                          />
                          
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-bold text-gray-800">{item.name}</h3>
                              {item.priceDropped && <Tag className="w-4 h-4 text-red-500" />}
                              {item.trending && <TrendingUp className="w-4 h-4 text-orange-500" />}
                              {!item.inStock && <AlertCircle className="w-4 h-4 text-gray-500" />}
                            </div>
                            
                            <p className="text-sm text-pink-600 mb-1">{item.brand}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                                {item.rating} ({item.reviews} reviews)
                              </div>
                              <div className="flex items-center">
                                <Sparkles className="w-3 h-3 text-teal-500 mr-1" />
                                {item.aiMatch}% Match
                              </div>
                              <span>Added {new Date(item.addedDate).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-pink-600">QAR {item.price}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">QAR {item.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button
                              onClick={() => handleAddToCart(item)}
                              disabled={!item.inStock}
                              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white disabled:opacity-50"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleTryOn(item.id)}
                                className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                              >
                                <Camera className="w-4 h-4 mr-1" />
                                Try On
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Recommendations */}
              <Card className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-6 h-6 text-teal-500" />
                  <h3 className="text-xl font-bold text-teal-700">AI Recommendations</h3>
                  <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                    Based on your wishlist
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {aiRecommendations.map((rec) => (
                    <Card key={rec.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-800 mb-1">{rec.name}</h4>
                      <p className="text-sm text-teal-600 mb-2">{rec.brand}</p>
                      <p className="text-xs text-gray-600 mb-3">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-600">QAR {rec.price}</span>
                        <Badge className="bg-teal-100 text-teal-700 text-xs">
                          {rec.aiMatch}% Match
                        </Badge>
                      </div>
                      <Button className="w-full mt-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm">
                        <Heart className="w-3 h-3 mr-2" />
                        Add to Wishlist
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}