"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  Bell,
  Flame,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Zap,
  Crown,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShoppingBag,
  Camera,
  Sparkles,
  Filter,
  Search,
  Settings,
  Plus,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Tag,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const trendingNow = [
  {
    id: "t1",
    title: "Oversized Blazers",
    description: "Professional yet comfortable blazers are dominating the modest fashion scene",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    category: "Workwear",
    growth: "+45%",
    popularity: 94,
    region: "GCC",
    timeframe: "This Week",
    mentions: 2847,
    engagement: 15600,
    priceRange: "QAR 200-500",
    brands: ["Noor Collection", "Elegance House", "Daily Modest"],
    colors: ["Navy", "Black", "Beige", "Burgundy"],
    trending: "up",
    hot: true,
  },
  {
    id: "t2",
    title: "Textured Hijabs",
    description: "Silk and chiffon hijabs with subtle textures are gaining popularity",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
    category: "Accessories",
    growth: "+32%",
    popularity: 87,
    region: "UAE",
    timeframe: "This Month",
    mentions: 1923,
    engagement: 12400,
    priceRange: "QAR 50-150",
    brands: ["Modern Hijab Co", "Heritage Couture"],
    colors: ["Dusty Rose", "Sage Green", "Cream", "Lavender"],
    trending: "up",
    hot: false,
  },
  {
    id: "t3",
    title: "Midi Skirt Sets",
    description: "Coordinated midi skirt and top sets for versatile styling",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    category: "Sets",
    growth: "+28%",
    popularity: 82,
    region: "Qatar",
    timeframe: "This Week",
    mentions: 1654,
    engagement: 9800,
    priceRange: "QAR 300-700",
    brands: ["Luxe Modest", "Daily Modest"],
    colors: ["Emerald", "Navy", "Chocolate", "Ivory"],
    trending: "up",
    hot: false,
  },
  {
    id: "t4",
    title: "Statement Sleeves",
    description: "Dramatic sleeves are making a comeback in modest fashion",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
    category: "Details",
    growth: "-5%",
    popularity: 65,
    region: "KSA",
    timeframe: "This Month",
    mentions: 892,
    engagement: 5400,
    priceRange: "QAR 150-400",
    brands: ["Heritage Couture", "Elegance House"],
    colors: ["Black", "White", "Gold", "Silver"],
    trending: "down",
    hot: false,
  },
]

const upcomingTrends = [
  {
    id: "u1",
    title: "Sustainable Fabrics",
    description: "Eco-friendly materials gaining traction in modest fashion",
    predictedGrowth: "+60%",
    confidence: 89,
    timeframe: "Next 3 months",
    category: "Sustainability",
    keyBrands: ["Eco Modest", "Green Fashion"],
  },
  {
    id: "u2",
    title: "Tech-Integrated Abayas",
    description: "Smart fabrics and tech features in traditional wear",
    predictedGrowth: "+75%",
    confidence: 76,
    timeframe: "Next 6 months",
    category: "Innovation",
    keyBrands: ["Future Fashion", "Tech Modest"],
  },
  {
    id: "u3",
    title: "Vintage Revival",
    description: "90s and early 2000s modest fashion making a comeback",
    predictedGrowth: "+40%",
    confidence: 82,
    timeframe: "Next 2 months",
    category: "Vintage",
    keyBrands: ["Retro Modest", "Vintage Vibes"],
  },
]

const regionalTrends = [
  {
    region: "UAE",
    trends: [
      { name: "Luxury Abayas", growth: "+38%" },
      { name: "Designer Hijabs", growth: "+25%" },
      { name: "Evening Wear", growth: "+42%" },
    ],
    topColor: "Gold",
    topBrand: "Luxe Modest",
  },
  {
    region: "Qatar",
    trends: [
      { name: "Work Blazers", growth: "+45%" },
      { name: "Casual Sets", growth: "+32%" },
      { name: "Sports Modest", growth: "+28%" },
    ],
    topColor: "Navy",
    topBrand: "Daily Modest",
  },
  {
    region: "KSA",
    trends: [
      { name: "Traditional Cuts", growth: "+22%" },
      { name: "Modern Abayas", growth: "+35%" },
      { name: "Formal Wear", growth: "+18%" },
    ],
    topColor: "Black",
    topBrand: "Heritage Couture",
  },
]

const myAlerts = [
  {
    id: "a1",
    type: "price_drop",
    title: "Oversized Blazers",
    message: "Average price dropped by 15% this week",
    timestamp: "2 hours ago",
    active: true,
  },
  {
    id: "a2",
    type: "trending_up",
    title: "Textured Hijabs",
    message: "Popularity increased by 32% in your region",
    timestamp: "5 hours ago",
    active: true,
  },
  {
    id: "a3",
    type: "new_trend",
    title: "Sustainable Fabrics",
    message: "New trend detected with 89% confidence",
    timestamp: "1 day ago",
    active: true,
  },
]

const alertSettings = [
  { id: "price_drops", label: "Price Drops", description: "When trending items go on sale", enabled: true },
  { id: "new_trends", label: "New Trends", description: "Emerging fashion trends in your region", enabled: true },
  { id: "popularity_surge", label: "Popularity Surge", description: "Items gaining rapid popularity", enabled: false },
  { id: "brand_releases", label: "Brand Releases", description: "New collections from followed brands", enabled: true },
  { id: "seasonal_trends", label: "Seasonal Trends", description: "Trends for upcoming seasons", enabled: true },
  { id: "regional_trends", label: "Regional Trends", description: "Trends specific to your location", enabled: false },
]

export default function TrendAlertsPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [alertSettingsState, setAlertSettingsState] = useState(alertSettings)
  const { toast } = useToast()

  const handleFollowTrend = (trendId: string) => {
    toast({
      title: "Following trend! 👀",
      description: "You'll receive alerts about this trend",
    })
  }

  const handleToggleAlert = (alertId: string) => {
    setAlertSettingsState(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
      )
    )
    toast({
      title: "Alert settings updated",
      description: "Your notification preferences have been saved",
    })
  }

  const handleBookmarkTrend = (trendId: string) => {
    toast({
      title: "Trend bookmarked! 📌",
      description: "Added to your saved trends",
    })
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
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-orange-700">Trend Alerts</h1>
                    <p className="text-sm text-orange-600">Stay ahead of fashion trends</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <Bell className="w-3 h-3 mr-1" />
                  {myAlerts.filter(a => a.active).length} Active
                </Badge>
                <Button variant="ghost" size="sm" className="text-orange-600">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {trendingNow.filter(t => t.hot).length}
                  </div>
                  <div className="text-sm text-gray-600">Hot Trends</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {trendingNow.filter(t => t.trending === "up").length}
                  </div>
                  <div className="text-sm text-gray-600">Rising</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {upcomingTrends.length}
                  </div>
                  <div className="text-sm text-gray-600">Predicted</div>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {myAlerts.filter(a => a.active).length}
                  </div>
                  <div className="text-sm text-gray-600">My Alerts</div>
                </Card>
              </div>

              {/* Trend Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 bg-orange-50">
                  <TabsTrigger value="trending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Flame className="w-4 h-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Target className="w-4 h-4 mr-2" />
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="regional" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Globe className="w-4 h-4 mr-2" />
                    Regional
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Bell className="w-4 h-4 mr-2" />
                    My Alerts
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                {/* Trending Now */}
                <TabsContent value="trending" className="space-y-6 mt-6">
                  {/* Filters */}
                  <Card className="p-4 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="px-3 py-2 border border-orange-200 rounded-lg bg-white text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                      >
                        <option value="all">All Regions</option>
                        <option value="uae">UAE</option>
                        <option value="qatar">Qatar</option>
                        <option value="ksa">Saudi Arabia</option>
                        <option value="kuwait">Kuwait</option>
                        <option value="bahrain">Bahrain</option>
                      </select>

                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-orange-200 rounded-lg bg-white text-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                      >
                        <option value="all">All Categories</option>
                        <option value="workwear">Workwear</option>
                        <option value="accessories">Accessories</option>
                        <option value="sets">Sets</option>
                        <option value="details">Details</option>
                      </select>

                      <Button variant="outline" size="sm" className="bg-white border-orange-300 text-orange-600">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </Card>

                  {/* Trending Items */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {trendingNow.map((trend) => (
                      <Card key={trend.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="relative">
                          <img
                            src={trend.image}
                            alt={trend.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex space-x-2">
                            {trend.hot && (
                              <Badge className="bg-red-500 text-white text-xs">
                                <Flame className="w-3 h-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                            <Badge className="bg-blue-500 text-white text-xs">
                              {trend.category}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className={`text-white text-xs ${
                              trend.trending === "up" ? "bg-green-500" : 
                              trend.trending === "down" ? "bg-red-500" : "bg-gray-500"
                            }`}>
                              {trend.trending === "up" ? (
                                <ArrowUp className="w-3 h-3 mr-1" />
                              ) : trend.trending === "down" ? (
                                <ArrowDown className="w-3 h-3 mr-1" />
                              ) : (
                                <Minus className="w-3 h-3 mr-1" />
                              )}
                              {trend.growth}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-800">{trend.title}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{trend.popularity}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{trend.description}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {trend.region}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {trend.timeframe}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Eye className="w-4 h-4 mr-2" />
                              {trend.mentions.toLocaleString()} mentions
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Heart className="w-4 h-4 mr-2" />
                              {trend.engagement.toLocaleString()} engagement
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div>
                              <span className="text-sm font-medium text-gray-700">Price Range: </span>
                              <span className="text-sm text-orange-600 font-semibold">{trend.priceRange}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700">Top Brands: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {trend.brands.slice(0, 3).map((brand) => (
                                  <Badge key={brand} className="bg-gray-100 text-gray-700 text-xs">
                                    {brand}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-700">Popular Colors: </span>
                              <div className="flex space-x-2 mt-1">
                                {trend.colors.slice(0, 4).map((color) => (
                                  <div
                                    key={color}
                                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleFollowTrend(trend.id)}
                              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              Follow Trend
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBookmarkTrend(trend.id)}
                              className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Upcoming Trends */}
                <TabsContent value="upcoming" className="space-y-6 mt-6">
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      AI-Predicted Trends
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Our AI analyzes fashion data to predict upcoming trends with high accuracy
                    </p>
                    
                    <div className="space-y-4">
                      {upcomingTrends.map((trend) => (
                        <div key={trend.id} className="p-4 bg-white rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold text-gray-800">{trend.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {trend.predictedGrowth}
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 text-xs">
                                {trend.confidence}% confidence
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{trend.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {trend.timeframe}
                              </span>
                              <span className="flex items-center">
                                <Tag className="w-4 h-4 mr-1" />
                                {trend.category}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleFollowTrend(trend.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              Get Alerts
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Regional Trends */}
                <TabsContent value="regional" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {regionalTrends.map((region) => (
                      <Card key={region.region} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-blue-500" />
                            {region.region}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Regional</Badge>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          {region.trends.map((trend, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{trend.name}</span>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {trend.growth}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Top Color:</span>
                            <span className="font-medium text-gray-800">{region.topColor}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-600">Leading Brand:</span>
                            <span className="font-medium text-gray-800">{region.topBrand}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* My Alerts */}
                <TabsContent value="alerts" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-orange-700 mb-4">Recent Alerts</h3>
                    <div className="space-y-4">
                      {myAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${
                            alert.type === "price_drop" ? "bg-green-500" :
                            alert.type === "trending_up" ? "bg-orange-500" :
                            "bg-blue-500"
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{alert.title}</h4>
                            <p className="text-sm text-gray-600">{alert.message}</p>
                            <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          </div>
                          <Switch checked={alert.active} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-orange-700 mb-4">Alert Preferences</h3>
                    <div className="space-y-4">
                      {alertSettingsState.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">{setting.label}</h4>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={() => handleToggleAlert(setting.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}