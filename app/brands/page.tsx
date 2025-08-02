"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  Compass,
  TrendingUp,
  Award,
  Users,
  ShoppingBag,
  Sparkles,
  Verified,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Eye,
  Crown,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const featuredBrands = [
  {
    id: "1",
    name: "Noor Collection",
    description: "Contemporary modest fashion with traditional elegance",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    location: "Dubai, UAE",
    rating: 4.8,
    reviews: 1247,
    followers: 45600,
    verified: true,
    premium: true,
    categories: ["Abayas", "Dresses", "Hijabs"],
    priceRange: "$$",
    established: 2018,
    aiPowered: true,
    featured: true,
  },
  {
    id: "2",
    name: "Elegance House",
    description: "Luxury modest wear for the modern woman",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=300&fit=crop",
    location: "Doha, Qatar",
    rating: 4.9,
    reviews: 892,
    followers: 32400,
    verified: true,
    premium: true,
    categories: ["Evening Wear", "Formal", "Accessories"],
    priceRange: "$$$",
    established: 2015,
    aiPowered: true,
    featured: true,
  },
  {
    id: "3",
    name: "Daily Modest",
    description: "Affordable everyday modest fashion",
    logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    location: "Riyadh, KSA",
    rating: 4.6,
    reviews: 2156,
    followers: 28900,
    verified: true,
    premium: false,
    categories: ["Casual", "Work Wear", "Sports"],
    priceRange: "$",
    established: 2020,
    aiPowered: false,
    featured: true,
  },
]

const allBrands = [
  ...featuredBrands,
  {
    id: "4",
    name: "Heritage Couture",
    description: "Traditional designs with modern cuts",
    logo: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    location: "Kuwait City, Kuwait",
    rating: 4.7,
    reviews: 634,
    followers: 19200,
    verified: true,
    premium: false,
    categories: ["Traditional", "Formal", "Wedding"],
    priceRange: "$$",
    established: 2017,
    aiPowered: false,
    featured: false,
  },
  {
    id: "5",
    name: "Modern Hijab Co",
    description: "Innovative hijab styles and accessories",
    logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=300&fit=crop",
    location: "Manama, Bahrain",
    rating: 4.5,
    reviews: 445,
    followers: 15600,
    verified: false,
    premium: false,
    categories: ["Hijabs", "Accessories", "Scarves"],
    priceRange: "$",
    established: 2021,
    aiPowered: true,
    featured: false,
  },
  {
    id: "6",
    name: "Luxe Modest",
    description: "High-end modest fashion and couture",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    location: "Abu Dhabi, UAE",
    rating: 4.9,
    reviews: 287,
    followers: 41200,
    verified: true,
    premium: true,
    categories: ["Luxury", "Couture", "Evening"],
    priceRange: "$$$$",
    established: 2012,
    aiPowered: true,
    featured: false,
  },
]

const locations = [
  { id: "all", name: "All Locations" },
  { id: "uae", name: "UAE" },
  { id: "qatar", name: "Qatar" },
  { id: "ksa", name: "Saudi Arabia" },
  { id: "kuwait", name: "Kuwait" },
  { id: "bahrain", name: "Bahrain" },
]

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "$", name: "Budget ($)" },
  { id: "$$", name: "Mid-range ($$)" },
  { id: "$$$", name: "Premium ($$$)" },
  { id: "$$$$", name: "Luxury ($$$$)" },
]

export default function BrowseBrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid, list
  const [sortBy, setSortBy] = useState("featured") // featured, rating, followers, newest
  const { toast } = useToast()
  const router = useRouter()

  const categories = useMemo(() => [
    { id: "all", name: "All Brands", count: allBrands.length },
    { id: "featured", name: "Featured", count: featuredBrands.length },
    { id: "verified", name: "Verified", count: allBrands.filter(b => b.verified).length },
    { id: "ai-powered", name: "AI Powered", count: allBrands.filter(b => b.aiPowered).length },
    { id: "premium", name: "Premium", count: allBrands.filter(b => b.premium).length },
    { id: "new", name: "New Brands", count: allBrands.filter(b => b.established >= 2020).length },
  ], [allBrands, featuredBrands]);

  const filteredBrands = allBrands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" ||
                           (selectedCategory === "featured" && brand.featured) ||
                           (selectedCategory === "verified" && brand.verified) ||
                           (selectedCategory === "ai-powered" && brand.aiPowered) ||
                           (selectedCategory === "premium" && brand.premium) ||
                           (selectedCategory === "new" && brand.established >= 2020)
    const matchesLocation = selectedLocation === "all" ||
                           brand.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesPriceRange = selectedPriceRange === "all" || brand.priceRange === selectedPriceRange

    return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange
  })

  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "followers":
        return b.followers - a.followers
      case "newest":
        return b.established - a.established
      default:
        return b.featured ? 1 : -1
    }
  })

  const handleFollowBrand = (brandId: string) => {
    toast({
      title: "Following brand! 👍",
      description: "You'll receive updates about new collections and offers",
    })
  }

  const handleMessageBrand = (brandId: string) => {
    router.push(`/messages?brand=${brandId}`)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
        <CustomerSidebar />
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-teal-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-teal-700">Browse Brands</h1>
                    <p className="text-sm text-teal-600">Discover amazing modest fashion brands</p>
                  </div>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                <Users className="w-3 h-3 mr-1" />
                {allBrands.length} Brands
              </Badge>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search and Filters */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <Input
                      placeholder="Search brands, styles, or locations..."
                      className="pl-10 pr-12 border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all rounded-full bg-white/80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-teal-100"
                    >
                      <Filter className="w-4 h-4 text-teal-500" />
                    </Button>
                  </div>

                  {/* Filter Tabs */}
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid grid-cols-6 bg-teal-50">
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="text-xs data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                        >
                          {category.name}
                          <Badge className="ml-1 bg-teal-200 text-teal-700 text-xs">
                            {category.count}
                          </Badge>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>

                  {/* Additional Filters */}
                  <div className="flex flex-wrap gap-4">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="px-3 py-2 border border-teal-200 rounded-lg bg-white text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                    >
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="px-3 py-2 border border-teal-200 rounded-lg bg-white text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                          {range.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-teal-200 rounded-lg bg-white text-sm focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                    >
                      <option value="featured">Featured First</option>
                      <option value="rating">Highest Rated</option>
                      <option value="followers">Most Followers</option>
                      <option value="newest">Newest Brands</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Featured Brands Carousel */}
              {selectedCategory === "all" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-teal-700 flex items-center">
                    <Crown className="w-6 h-6 mr-2 text-yellow-500" />
                    Featured Brands
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {featuredBrands.map((brand) => (
                      <Card key={brand.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                        <div className="relative">
                          <img
                            src={brand.banner}
                            alt={brand.name}
                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 flex space-x-2">
                            {brand.verified && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                <Verified className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {brand.premium && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                            {brand.aiPowered && (
                              <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <div className="absolute top-3 right-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-8 h-8 p-0 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 rounded-full"
                              onClick={() => handleFollowBrand(brand.id)}
                            >
                              <Heart className="w-4 h-4 text-pink-500" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-teal-200"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-teal-700 text-lg">{brand.name}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                {brand.location}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                                <span>{brand.rating}</span>
                                <span className="text-gray-500 ml-1">({brand.reviews})</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{(brand.followers / 1000).toFixed(1)}K</span>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-teal-600">{brand.priceRange}</div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {brand.categories.slice(0, 3).map((category) => (
                              <Badge key={category} className="bg-teal-100 text-teal-700 text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/brands/${brand.id}`} className="flex-1">
                              <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Store
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMessageBrand(brand.id)}
                              className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Brands Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-teal-700">
                    {selectedCategory === "all" ? "All Brands" : categories.find(c => c.id === selectedCategory)?.name}
                    <span className="text-lg text-gray-500 ml-2">({sortedBrands.length})</span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="text-xs"
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="text-xs"
                    >
                      List
                    </Button>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedBrands.map((brand) => (
                      <Card key={brand.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                        <div className="relative">
                          <img
                            src={brand.banner}
                            alt={brand.name}
                            className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 flex space-x-1">
                            {brand.verified && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                <Verified className="w-2 h-2 mr-1" />
                              </Badge>
                            )}
                            {brand.premium && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                <Crown className="w-2 h-2 mr-1" />
                              </Badge>
                            )}
                            {brand.aiPowered && (
                              <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs">
                                <Zap className="w-2 h-2 mr-1" />
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-10 h-10 rounded-full object-cover border border-teal-200"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-teal-700">{brand.name}</h3>
                              <div className="flex items-center text-xs text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                {brand.location}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{brand.description}</p>
                          <div className="flex items-center justify-between mb-3 text-xs">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                              <span>{brand.rating}</span>
                              <span className="text-gray-500 ml-1">({brand.reviews})</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="w-3 h-3 mr-1" />
                              <span>{(brand.followers / 1000).toFixed(1)}K</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/brands/${brand.id}`} className="flex-1">
                              <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xs">
                                View Store
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFollowBrand(brand.id)}
                              className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                            >
                              <Heart className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedBrands.map((brand) => (
                      <Card key={brand.id} className="p-4 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-teal-200"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-bold text-teal-700 text-lg">{brand.name}</h3>
                              {brand.verified && <Verified className="w-4 h-4 text-blue-500" />}
                              {brand.premium && <Crown className="w-4 h-4 text-yellow-500" />}
                              {brand.aiPowered && <Sparkles className="w-4 h-4 text-teal-500" />}
                            </div>
                            <p className="text-gray-600 mb-2">{brand.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {brand.location}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                                {brand.rating} ({brand.reviews} reviews)
                              </div>
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {(brand.followers / 1000).toFixed(1)}K followers
                              </div>
                              <div className="font-medium text-teal-600">{brand.priceRange}</div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link href={`/brands/${brand.id}`}>
                              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
                                <Eye className="w-4 h-4 mr-2" />
                                View Store
                              </Button>
                            </Link>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFollowBrand(brand.id)}
                                className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Follow
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMessageBrand(brand.id)}
                                className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Load More */}
              {sortedBrands.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    className="bg-white border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    Load More Brands
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}