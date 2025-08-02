"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Palette,
  User,
  Settings,
  Camera,
  Edit,
  Save,
  RefreshCw,
  Star,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Crown,
  Sparkles,
  Target,
  Calendar,
  Clock,
  MapPin,
  Ruler,
  Shirt,
  Paintbrush,
  Wand2,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const styleProfile = {
  personalInfo: {
    name: "Aisha Al-Rashid",
    username: "@aisha_style",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=100&h=100&fit=crop&crop=face",
    location: "Doha, Qatar",
    age: 28,
    occupation: "Marketing Manager",
    joinDate: "2023-06-15",
  },
  measurements: {
    height: 165,
    weight: 60,
    bust: 86,
    waist: 68,
    hips: 94,
    shoulderWidth: 38,
    armLength: 58,
    inseam: 76,
  },
  preferences: {
    style: "Modern Modest",
    formality: 70,
    colorfulness: 60,
    pattern: 40,
    fit: "Tailored",
    comfort: 85,
    budget: "Mid-range",
  },
  colors: {
    favorites: ["Navy", "Emerald", "Burgundy", "Cream", "Gold"],
    avoid: ["Bright Pink", "Neon Green", "Orange"],
    seasonal: {
      spring: ["Soft Pink", "Mint Green", "Lavender"],
      summer: ["White", "Light Blue", "Coral"],
      autumn: ["Burgundy", "Mustard", "Brown"],
      winter: ["Navy", "Emerald", "Black"],
    },
  },
  bodyType: {
    shape: "Pear",
    recommendations: [
      "Emphasize shoulders with structured tops",
      "A-line silhouettes work beautifully",
      "High-waisted bottoms create balance",
      "Avoid tight-fitting hip area",
    ],
  },
  lifestyle: {
    workStyle: "Business Casual",
    socialEvents: "Moderate",
    travelFrequency: "Monthly",
    activeLevel: "Moderate",
    climate: "Hot & Humid",
  },
  aiInsights: {
    styleScore: 87,
    confidenceLevel: 92,
    topRecommendations: [
      "Try more structured blazers for work",
      "Experiment with emerald green tones",
      "Consider midi-length dresses",
      "Add statement accessories",
    ],
    improvementAreas: [
      "Color coordination",
      "Seasonal adaptation",
      "Accessory selection",
    ],
  },
}

const outfitHistory = [
  {
    id: "o1",
    date: "2024-01-20",
    occasion: "Work Meeting",
    items: ["Navy Blazer", "White Blouse", "Black Pants", "Pearl Earrings"],
    rating: 4.5,
    aiScore: 92,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop",
  },
  {
    id: "o2",
    date: "2024-01-18",
    occasion: "Dinner Out",
    items: ["Emerald Dress", "Gold Accessories", "Nude Heels"],
    rating: 5.0,
    aiScore: 96,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=250&fit=crop",
  },
  {
    id: "o3",
    date: "2024-01-15",
    occasion: "Casual Weekend",
    items: ["Cream Abaya", "Brown Belt", "Tan Sandals"],
    rating: 4.0,
    aiScore: 85,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop",
  },
]

export default function StyleProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated! ✨",
      description: "Your style preferences have been saved",
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
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-purple-700">Style Profile</h1>
                    <p className="text-sm text-purple-600">Personalize your fashion journey</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Style Score: {styleProfile.aiInsights.styleScore}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-purple-600"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Profile Header */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={styleProfile.personalInfo.avatar} />
                      <AvatarFallback className="text-2xl">{styleProfile.personalInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-purple-500 hover:bg-purple-600 text-white rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-purple-700">{styleProfile.personalInfo.name}</h2>
                      <Badge className="bg-purple-100 text-purple-700">
                        {styleProfile.preferences.style}
                      </Badge>
                    </div>
                    <p className="text-purple-600 mb-1">{styleProfile.personalInfo.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {styleProfile.personalInfo.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(styleProfile.personalInfo.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {styleProfile.aiInsights.styleScore}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Style Score</div>
                    <Progress value={styleProfile.aiInsights.styleScore} className="w-24" />
                  </div>
                </div>
              </Card>

              {/* Profile Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 bg-purple-50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="measurements" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Ruler className="w-4 h-4 mr-2" />
                    Measurements
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Paintbrush className="w-4 h-4 mr-2" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Insights
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Personal Info */}
                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Full Name</label>
                          <Input
                            value={styleProfile.personalInfo.name}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Location</label>
                          <Input
                            value={styleProfile.personalInfo.location}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Occupation</label>
                          <Input
                            value={styleProfile.personalInfo.occupation}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Body Type */}
                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Body Type Analysis</h3>
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shirt className="w-8 h-8 text-purple-600" />
                        </div>
                        <div className="text-xl font-bold text-purple-600">{styleProfile.bodyType.shape}</div>
                      </div>
                      <div className="space-y-2">
                        {styleProfile.bodyType.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Lifestyle */}
                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Lifestyle</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Work Style</span>
                          <span className="text-sm font-medium">{styleProfile.lifestyle.workStyle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Social Events</span>
                          <span className="text-sm font-medium">{styleProfile.lifestyle.socialEvents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Travel</span>
                          <span className="text-sm font-medium">{styleProfile.lifestyle.travelFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Activity Level</span>
                          <span className="text-sm font-medium">{styleProfile.lifestyle.activeLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Climate</span>
                          <span className="text-sm font-medium">{styleProfile.lifestyle.climate}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                {/* Measurements */}
                <TabsContent value="measurements" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-purple-700">Body Measurements</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white border-purple-300 text-purple-600"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Update Measurements
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(styleProfile.measurements).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Ruler className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="text-2xl font-bold text-purple-600 mb-1">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()} {key === 'height' ? 'cm' : key === 'weight' ? 'kg' : 'cm'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Preferences */}
                <TabsContent value="preferences" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-purple-700 mb-6">Style Preferences</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Formality Level: {styleProfile.preferences.formality}%
                        </label>
                        <Slider
                          value={[styleProfile.preferences.formality]}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={!isEditing}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Casual</span>
                          <span>Formal</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Color Boldness: {styleProfile.preferences.colorfulness}%
                        </label>
                        <Slider
                          value={[styleProfile.preferences.colorfulness]}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={!isEditing}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Neutral</span>
                          <span>Bold</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Pattern Preference: {styleProfile.preferences.pattern}%
                        </label>
                        <Slider
                          value={[styleProfile.preferences.pattern]}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={!isEditing}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Solid</span>
                          <span>Patterned</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Comfort Priority: {styleProfile.preferences.comfort}%
                        </label>
                        <Slider
                          value={[styleProfile.preferences.comfort]}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={!isEditing}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Style First</span>
                          <span>Comfort First</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Colors */}
                <TabsContent value="colors" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Favorite Colors</h3>
                      <div className="flex flex-wrap gap-3">
                        {styleProfile.colors.favorites.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <div
                              className="w-8 h-8 rounded-full border-2 border-gray-300"
                              style={{ backgroundColor: color.toLowerCase() }}
                            />
                            <span className="text-sm font-medium">{color}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Colors to Avoid</h3>
                      <div className="flex flex-wrap gap-3">
                        {styleProfile.colors.avoid.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <div
                              className="w-8 h-8 rounded-full border-2 border-red-300 relative"
                              style={{ backgroundColor: color.toLowerCase() }}
                            >
                              <X className="w-4 h-4 text-red-500 absolute inset-0 m-auto" />
                            </div>
                            <span className="text-sm font-medium">{color}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-purple-700 mb-4">Seasonal Color Palette</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                      {Object.entries(styleProfile.colors.seasonal).map(([season, colors]) => (
                        <div key={season}>
                          <h4 className="font-medium text-gray-800 mb-3 capitalize">{season}</h4>
                          <div className="space-y-2">
                            {colors.map((color) => (
                              <div key={color} className="flex items-center space-x-2">
                                <div
                                  className="w-6 h-6 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                                />
                                <span className="text-sm">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* AI Insights */}
                <TabsContent value="insights" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        AI Style Analysis
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-purple-600 mb-2">
                            {styleProfile.aiInsights.styleScore}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">Overall Style Score</div>
                          <Progress value={styleProfile.aiInsights.styleScore} className="mb-2" />
                          <div className="text-xs text-gray-500">
                            {styleProfile.aiInsights.confidenceLevel}% confidence level
                          </div>
                        </div>

                        <div className="pt-4 border-t border-purple-200">
                          <h4 className="font-medium text-purple-700 mb-3">Top Recommendations</h4>
                          <div className="space-y-2">
                            {styleProfile.aiInsights.topRecommendations.map((rec, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Wand2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-semibold text-purple-700 mb-4">Improvement Areas</h3>
                      <div className="space-y-4">
                        {styleProfile.aiInsights.improvementAreas.map((area, index) => (
                          <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              <span className="font-medium text-orange-700">{area}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Focus on improving this area to boost your style score
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                {/* History */}
                <TabsContent value="history" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-purple-700 mb-6">Outfit History</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {outfitHistory.map((outfit) => (
                        <div key={outfit.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={outfit.image}
                            alt={outfit.occasion}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-800">{outfit.occasion}</h4>
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                AI: {outfit.aiScore}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{outfit.date}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {outfit.items.slice(0, 3).map((item) => (
                                <Badge key={item} className="bg-gray-100 text-gray-700 text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                                <span className="text-sm">{outfit.rating}</span>
                              </div>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
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