"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Search,
  Filter,
  Heart,
  ShoppingBag,
  User,
  Sparkles,
  Star,
  MapPin,
  Bell,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import ProductFilterBar from "@/components/product-filter-bar"

const hotPicks = [
  {
    id: "1",
    name: "EDIT 02",
    brand: "Lovah",
    price: 900,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    badge: "LATEST DROP",
    aiMatch: 94,
    rating: 4.8,
    reviews: 124,
    tryOnViews: 1247,
    tags: ["AI Curated", "Trending", "SALE"], // SALE tag added
    category: "CLOTHING",
  },
  {
    id: "2",
    name: "NOUR",
    brand: "Toned",
    price: 750,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    badge: "LATEST DROP",
    aiMatch: 91,
    rating: 4.9,
    reviews: 89,
    tryOnViews: 892,
    tags: ["Premium", "Limited"],
    category: "CLOTHING",
  },
  {
    id: "3",
    name: "YARA",
    brand: "Toned",
    price: 850,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    badge: "LATEST DROP",
    aiMatch: 87,
    rating: 4.7,
    reviews: 156,
    tryOnViews: 634,
    tags: ["Work Ready", "SALE"], // SALE tag added
    category: "CLOTHING",
  },
  {
    id: "4",
    name: "EDIT 03",
    brand: "Lovah",
    price: 900,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    badge: "LATEST DROP",
    aiMatch: 89,
    rating: 4.6,
    reviews: 203,
    tryOnViews: 445,
    tags: ["Everyday"],
    category: "CLOTHING",
  },
  {
    id: "5",
    name: "ZARA Collection",
    brand: "Modest Wear",
    price: 1200,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    badge: "EXCLUSIVE",
    aiMatch: 96,
    rating: 4.9,
    reviews: 78,
    tryOnViews: 2341,
    tags: ["Premium", "Limited Edition", "SALE"], // SALE tag added
    category: "CLOTHING",
  },
  {
    id: "6",
    name: "LAYLA Abaya",
    brand: "Heritage",
    price: 680,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    badge: "TRENDING",
    aiMatch: 88,
    rating: 4.6,
    reviews: 156,
    tryOnViews: 987,
    tags: ["Traditional", "Modern"],
    category: "CLOTHING",
  },
  {
    id: "7",
    name: "Elegant Scarf",
    brand: "Chic Accessories",
    price: 120,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop",
    badge: "NEW",
    aiMatch: 85,
    rating: 4.5,
    reviews: 45,
    tryOnViews: 321,
    tags: ["ACCESSORIES", "Trending"],
    category: "ACCESSORIES",
  },
  {
    id: "8",
    name: "Glow Face Serum",
    brand: "BeautyLab",
    price: 200,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=400&fit=crop",
    badge: "BEAUTY PICK",
    aiMatch: 90,
    rating: 4.7,
    reviews: 60,
    tryOnViews: 210,
    tags: ["BEAUTY", "Skincare"],
    category: "BEAUTY",
  },
  {
    id: "9",
    name: "Classic Loafers",
    brand: "StepUp",
    price: 350,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop",
    badge: "FOOTWEAR",
    aiMatch: 88,
    rating: 4.6,
    reviews: 38,
    tryOnViews: 150,
    tags: ["FOOTWEAR", "Comfort"],
    category: "FOOTWEAR",
  },
  {
    id: "10",
    name: "Retro Sunglasses",
    brand: "Vintage Vision",
    price: 180,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=400&fit=crop",
    badge: "VINTAGE",
    aiMatch: 82,
    rating: 4.3,
    reviews: 22,
    tryOnViews: 98,
    tags: ["VINTAGE", "ACCESSORIES"],
    category: "VINTAGE",
  },
  {
    id: "11",
    name: "Curated Gift Box",
    brand: "CurateMe",
    price: 500,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=400&fit=crop",
    badge: "CURATED",
    aiMatch: 91,
    rating: 4.8,
    reviews: 19,
    tryOnViews: 77,
    tags: ["CURATED", "Gift"],
    category: "CURATED",
  },
]

const categories = [
  { name: "All", active: true },
  { name: "Accessories" },
  { name: "Jewelry" },
  { name: "Bags" },
  { name: "Tops" },
  { name: "Dresses" },
  { name: "One-Pieces" },
  { name: "Pants" },
  { name: "Skirts" },
  { name: "Intimates + Swim" },
  { name: "Outerwear" },
  { name: "Shoes" },
  { name: "Home Goods" },
]

const styleReels = [
  {
    id: "reel-1",
    title: "5 Ways to Style Abayas",
    creator: "@modest_style_doha",
    views: "12.4K",
    thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop",
    duration: "0:45",
  },
  {
    id: "reel-2",
    title: "Eid Outfit Ideas 2024",
    creator: "@fashionista_qatar",
    views: "8.7K",
    thumbnail: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=300&fit=crop",
    duration: "1:12",
  },
  {
    id: "reel-3",
    title: "Campus to Coffee Looks",
    creator: "@student_style_gcc",
    views: "15.2K",
    thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop",
    duration: "0:38",
  },
  {
    id: "reel-4",
    title: "Professional Hijab Styling",
    creator: "@hijab_pro_tips",
    views: "19.1K",
    thumbnail: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=300&fit=crop",
    duration: "0:52",
  },
]

const designers = [
  "All Designers",
  ...Array.from(new Set(hotPicks.map((item) => item.brand)))
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDesigner, setSelectedDesigner] = useState("All Designers")
  const [currentSlide, setCurrentSlide] = useState(0)
  const { itemCount } = useCart()
  const { user } = useAuth()

  // Filtering logic
  const filteredPicks = hotPicks.filter((item) => {
    if (selectedCategory === "All") return true;
    // Match by category or by tag (case-insensitive)
    const categoryMatch = item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const tagMatch = item.tags?.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());
    const designerMatch = selectedDesigner === "All Designers" || item.brand === selectedDesigner;
    return (categoryMatch || tagMatch) && designerMatch;
  })

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredPicks.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredPicks.length / 3)) % Math.ceil(filteredPicks.length / 3))
  }

  const getVisibleItems = () => {
    const itemsPerSlide = 3
    const startIndex = currentSlide * itemsPerSlide
    return filteredPicks.slice(startIndex, startIndex + itemsPerSlide)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-teal-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-teal-700 text-lg">Labees</h1>
              <div className="flex items-center text-xs text-teal-600">
                <MapPin className="w-3 h-3 mr-1" />
                {user?.location || "Doha, Qatar"}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-teal-50 transition-all duration-300 hover:scale-105"
            >
              <Bell className="w-5 h-5 text-teal-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            </Button>
            <Link href="/messages">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-teal-50 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">💬</span>
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-teal-500 text-white text-xs animate-bounce">
                  3
                </Badge>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-teal-50 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5 text-teal-600" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-pink-500 text-white text-xs animate-bounce">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
            <Input
              placeholder="Search styles, brands, or occasions..."
              className="pl-10 pr-12 border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all rounded-full bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-teal-100 transition-all duration-300"
            >
              <Filter className="w-4 h-4 text-teal-500" />
            </Button>
          </div>
        </div>
        {/* Product Filter Bar */}
        <ProductFilterBar
          categories={["All", "CLOTHING", "ACCESSORIES", "BEAUTY", "FOOTWEAR", "VINTAGE", "SALE", "CURATED"]}
          designers={designers}
          selectedCategory={selectedCategory}
          selectedDesigner={selectedDesigner}
          onCategoryChange={setSelectedCategory}
          onDesignerChange={setSelectedDesigner}
        />
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hot Picks Section with Working Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              HOT PICKS
            </h2>
            <Link
              href="/all-picks"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors border-b border-teal-300 hover:border-teal-500"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(filteredPicks.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 flex space-x-6 px-2">
                    {filteredPicks.slice(slideIndex * 3, (slideIndex + 1) * 3).map((item) => (
                      <Link key={item.id} href={`/product/${item.id}`} className="flex-1">
                        <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 shadow-lg">
                          <div className="relative">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-medium shadow-lg">
                              {item.badge}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/90 hover:bg-white hover:scale-125 transition-all duration-300 rounded-full shadow-lg"
                            >
                              <Heart className="w-5 h-5 text-pink-500" />
                            </Button>
                            <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-xs text-white bg-black/70 px-3 py-2 rounded-full backdrop-blur-sm">
                              <Eye className="w-3 h-3" />
                              <span>{item.tryOnViews}</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-teal-600 mb-1 font-medium">{item.brand}</p>
                            <h3 className="font-bold text-slate-800 mb-3 text-lg">{item.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                QAR {item.price}
                              </span>
                              <div className="flex items-center text-sm text-amber-500">
                                <Star className="w-4 h-4 mr-1 fill-current" />
                                {item.rating}
                              </div>
                            </div>
                            <Badge className="mt-3 bg-teal-100 text-teal-700 text-xs font-medium">
                              {item.aiMatch}% AI Match
                            </Badge>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="sm"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/95 hover:bg-white shadow-xl rounded-full border-0 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-teal-600" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/95 hover:bg-white shadow-xl rounded-full border-0 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-teal-600" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(filteredPicks.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 scale-125"
                      : "bg-teal-200 hover:bg-teal-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        {filteredPicks.length === 0 && (
          <div className="text-center text-gray-500 py-12 text-lg font-medium">No products found for this category.</div>
        )}

        {/* Style Inspiration Reels */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Style Inspiration
          </h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {styleReels.map((reel) => (
              <div key={reel.id} className="flex-shrink-0 w-56 group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={reel.thumbnail || "/placeholder.svg"}
                    alt={reel.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play className="w-8 h-8 text-teal-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {reel.duration}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-white text-sm font-bold mb-2">{reel.title}</p>
                    <p className="text-white/80 text-xs">
                      {reel.creator} • {reel.views} views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Trending Now
            </h2>
            <div className="flex items-center text-sm text-amber-500 font-bold bg-amber-50 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 mr-2 animate-bounce" />
              Hot
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotPicks.slice(0, 4).map((item) => (
              <Link key={`trending-${item.id}`} href={`/product/${item.id}`}>
                <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 shadow-lg">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white hover:scale-125 transition-all duration-300 rounded-full shadow-lg"
                    >
                      <Heart className="w-4 h-4 text-pink-500" />
                    </Button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-teal-600 mb-3 font-medium">{item.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        QAR {item.price}
                      </span>
                      <Badge className="bg-teal-100 text-teal-700 text-xs font-medium">{item.aiMatch}% Match</Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
