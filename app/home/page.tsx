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
    name: "Modern Navy Abaya",
    brand: "Lovah",
    price: 900,
    image: "/products/casual-abaya-front.jpg",
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
    name: "Elegant Black Abaya",
    brand: "Toned",
    price: 750,
    image: "/products/evening-dress-front.jpg",
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
    name: "Professional Burgundy Dress",
    brand: "Toned",
    price: 850,
    image: "/products/professional-blazer-front.jpg",
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
    name: "Casual Beige Dress",
    brand: "Lovah",
    price: 900,
    image: "/products/modest-maxi-dress-front.jpg",
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
    name: "Luxury Emerald Kaftan",
    brand: "Modest Wear",
    price: 1200,
    image: "/products/elegant-scarf.jpg",
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
    name: "Traditional Black Abaya",
    brand: "Heritage",
    price: 680,
    image: "/products/wide-leg-trousers-front.jpg",
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
    image: "/products/elegant-scarf.jpg",
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
    image: "/products/leather-handbag.jpg",
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
    image: "/products/classic-loafers.jpg",
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
    thumbnail: "/products/casual-abaya-front.jpg",
    video: "/reels/abaya-styling-ways.mp4",
    duration: "0:45",
  },
  {
    id: "reel-2",
    title: "Eid Outfit Ideas 2024",
    creator: "@fashionista_qatar",
    views: "8.7K",
    thumbnail: "/products/evening-dress-front.jpg",
    video: "/reels/eid-outfit-ideas-2024.mp4",
    duration: "1:12",
  },
  {
    id: "reel-3",
    title: "Campus to Coffee Looks",
    creator: "@student_style_gcc",
    views: "15.2K",
    thumbnail: "/products/modest-maxi-dress-front.jpg",
    video: "/reels/campus-coffee-looks.mp4",
    duration: "0:38",
  },
  {
    id: "reel-4",
    title: "Professional Hijab Styling",
    creator: "@hijab_pro_tips",
    views: "19.1K",
    thumbnail: "/products/professional-blazer-front.jpg",
    video: "/reels/hijab-professional-styling.mp4",
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
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
                className="relative hover:bg-[#063A5B]/10 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">💬</span>
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-[#063A5B] text-white text-xs animate-bounce">
                  3
                </Badge>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-[#063A5B]/10 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5 text-[#063A5B]" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-pink-500 text-white text-xs animate-bounce">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 bg-[#063A5B] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#063A5B]/60" />
            <Input
              placeholder="Search styles, brands, or occasions..."
              className="pl-10 pr-12 border-[#063A5B]/20 focus:border-[#063A5B] focus:ring-2 focus:ring-[#063A5B]/20 transition-all rounded-full bg-white/80 backdrop-blur-sm"
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
          <h2 className="text-3xl font-bold text-[#063A5B] mb-6">
            Style Inspiration
          </h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {styleReels.map((reel) => (
              <div key={reel.id} className="flex-shrink-0 w-56 group cursor-pointer" onClick={() => setSelectedVideo(reel.video)}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <video
                    src={reel.video}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Play className="w-8 h-8 text-[#063A5B] ml-1" />
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
            <h2 className="text-3xl font-bold text-[#063A5B]">
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

      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in-0 duration-300" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl mx-auto animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-16 right-0 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-gray-200 transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                controlsList="nodownload"
                onLoadStart={() => console.log('Video loading...')}
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-lg font-bold mb-1">
                    {styleReels.find(reel => reel.video === selectedVideo)?.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {styleReels.find(reel => reel.video === selectedVideo)?.creator} • 
                    {styleReels.find(reel => reel.video === selectedVideo)?.views} views
                  </p>
                </div>
              </div>
            </div>
            
            {/* Loading Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin opacity-50"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
