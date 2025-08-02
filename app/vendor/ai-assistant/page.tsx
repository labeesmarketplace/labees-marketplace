"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Sparkles,
  MessageSquare,
  Camera,
  Palette,
  TrendingUp,
  Target,
  Brain,
  Wand2,
  Upload,
  Eye,
  ShoppingBag,
  BarChart3,
  Lightbulb,
  Send,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import React from "react"

const aiTools = [
  {
    id: "product-photos",
    name: "Product Photo Generator",
    description: "Generate professional product photos with AI",
    icon: Camera,
    color: "from-blue-500 to-blue-600",
    features: ["Background removal", "Lighting optimization", "Multiple angles", "Brand consistency"],
  },
  {
    id: "description-writer",
    name: "Product Description Writer",
    description: "Create compelling product descriptions that convert",
    icon: MessageSquare,
    color: "from-green-500 to-green-600",
    features: ["SEO optimized", "Emotional triggers", "Feature highlights", "Multiple variants"],
  },
  {
    id: "trend-analyzer",
    name: "Trend Analyzer",
    description: "Analyze market trends and predict demand",
    icon: TrendingUp,
    color: "from-purple-500 to-purple-600",
    features: ["Market insights", "Demand forecasting", "Competitor analysis", "Price optimization"],
  },
  {
    id: "design-assistant",
    name: "Design Assistant",
    description: "Get AI-powered design suggestions and color palettes",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    features: ["Color matching", "Style suggestions", "Fabric recommendations", "Seasonal trends"],
  },
  {
    id: "marketing-optimizer",
    name: "Marketing Optimizer",
    description: "Optimize your marketing campaigns with AI insights",
    icon: Target,
    color: "from-orange-500 to-orange-600",
    features: ["Audience targeting", "Ad optimization", "Content scheduling", "ROI tracking"],
  },
  {
    id: "inventory-predictor",
    name: "Inventory Predictor",
    description: "Predict inventory needs and optimize stock levels",
    icon: BarChart3,
    color: "from-indigo-500 to-indigo-600",
    features: ["Demand forecasting", "Stock optimization", "Reorder alerts", "Seasonal planning"],
  },
]

const chatHistory = [
  {
    id: 1,
    type: "user",
    message: "Help me create a product description for my new modest blazer collection",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "ai",
    message:
      "I'd be happy to help! Here's a compelling product description for your modest blazer collection:\n\n**Elevate Your Professional Wardrobe with Timeless Elegance**\n\nDiscover the perfect blend of sophistication and modesty with our Premium Blazer Collection. Crafted from luxurious fabrics and designed with the modern Muslim woman in mind, each blazer offers:\n\n✨ **Tailored Fit** - Flattering silhouette that maintains modesty\n🌟 **Premium Materials** - High-quality fabrics for lasting comfort\n💼 **Versatile Styling** - Perfect for office, events, or casual occasions\n🎯 **Modest Design** - Thoughtfully designed with longer lengths and appropriate coverage\n\nAvailable in classic colors: Navy, Black, Charcoal, and Burgundy\nSizes: XS-3XL | Price: Starting from QAR 280\n\nWould you like me to create variations for different occasions or adjust the tone?",
    timestamp: "1 minute ago",
  },
  {
    id: 3,
    type: "user",
    message: "That's perfect! Can you also suggest some social media captions for this collection?",
    timestamp: "30 seconds ago",
  },
  {
    id: 4,
    type: "ai",
    message:
      'Here are some engaging social media captions for your blazer collection:\n\n**Instagram Post:**\n"Power dressing meets modest elegance ✨ Our new blazer collection is here to elevate your professional wardrobe while honoring your values. Which color speaks to your style? 💼 #ModestFashion #ProfessionalWear #LabeesFashion"\n\n**TikTok/Reel:**\n"POV: You found the perfect blazer that\'s both modest AND stylish 🔥 Swipe to see all 4 colors! Which one are you choosing? #ModestStyle #WorkWear #OOTD"\n\n**Facebook:**\n"Introducing our Premium Blazer Collection - where professionalism meets modesty. Designed for the modern Muslim woman who refuses to compromise on style or values. Shop now and step into your power! 💪"\n\nWould you like me to create more variations or focus on a specific platform?',
    timestamp: "Just now",
  },
]

export default function AIAssistantPage() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [chatMessage, setChatMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState(chatHistory)
  const { toast } = useToast()

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: chatMessage,
      timestamp: "Just now",
    }

    setMessages([...messages, userMessage])
    setChatMessage("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        message:
          "I understand you need help with that! Let me analyze your request and provide you with the best solution. Based on your business needs, I recommend focusing on...",
        timestamp: "Just now",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsGenerating(false)
      toast({
        title: "AI Response Generated! 🤖",
        description: "Your AI assistant has provided helpful suggestions",
      })
    }, 2000)
  }

  const handleUseTool = (toolId) => {
    setSelectedTool(toolId)
    toast({
      title: "AI Tool Activated! ⚡",
      description: `${aiTools.find((t) => t.id === toolId)?.name} is ready to help`,
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">AI Business Assistant</h1>
                <p className="text-gray-600">Your intelligent partner for business growth</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] text-white px-4 py-2">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* AI Tools Grid */}
            <div className="lg:col-span-2">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Wand2 className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">AI Tools Suite</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {aiTools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedTool === tool.id
                          ? "border-[#00A388] bg-[#00A388]/5 shadow-lg"
                          : "border-gray-200 hover:border-[#00A388]/30 hover:shadow-md"
                      }`}
                      onClick={() => handleUseTool(tool.id)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}
                        >
                          {React.createElement(tool.icon, { className: "w-5 h-5 text-white" })}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#003153]">{tool.name}</h4>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {tool.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-500">
                            <div className="w-1 h-1 bg-[#00A388] rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Selected Tool Interface */}
              {selectedTool && (
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${aiTools.find((t) => t.id === selectedTool)?.color} rounded-lg flex items-center justify-center`}
                    >
                      {React.createElement(aiTools.find((t) => t.id === selectedTool)?.icon, {
                        className: "w-4 h-4 text-white",
                      })}
                    </div>
                    <h3 className="text-lg font-semibold text-[#003153]">
                      {aiTools.find((t) => t.id === selectedTool)?.name}
                    </h3>
                    <Badge className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] text-white">Active</Badge>
                  </div>

                  {selectedTool === "product-photos" && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00A388]/50 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload your product image</p>
                        <Button
                          variant="outline"
                          className="bg-transparent border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white"
                        >
                          Choose File
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">Background Style</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]">
                            <option>Clean White</option>
                            <option>Lifestyle Setting</option>
                            <option>Gradient</option>
                            <option>Textured</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">Lighting</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]">
                            <option>Natural</option>
                            <option>Studio</option>
                            <option>Soft</option>
                            <option>Dramatic</option>
                          </select>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Professional Photos
                      </Button>
                    </div>
                  )}

                  {selectedTool === "description-writer" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Product Name</label>
                        <Input
                          placeholder="e.g., Modest Blazer Collection"
                          className="focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Key Features</label>
                        <Textarea
                          placeholder="List the main features and benefits of your product..."
                          className="focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">Target Audience</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]">
                            <option>Professional Women</option>
                            <option>Students</option>
                            <option>Mothers</option>
                            <option>All Ages</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">Tone</label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]">
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Elegant</option>
                            <option>Casual</option>
                          </select>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Generate Description
                      </Button>
                    </div>
                  )}

                  {selectedTool === "trend-analyzer" && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 p-4 rounded-lg">
                        <h4 className="font-medium text-[#003153] mb-2">Current Trends Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Earth Tone Colors</span>
                            <Badge className="bg-green-100 text-green-700">+45% ↗</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Wide-leg Trousers</span>
                            <Badge className="bg-green-100 text-green-700">+32% ↗</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Oversized Blazers</span>
                            <Badge className="bg-yellow-100 text-yellow-700">+18% ↗</Badge>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Get Detailed Trend Report
                      </Button>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* AI Chat Assistant */}
            <div>
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm h-[600px] flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00A388] to-[#00C4A7] rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#003153]">AI Chat Assistant</h3>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((chat) => (
                    <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          chat.type === "user"
                            ? "bg-gradient-to-r from-[#003153] to-[#004A73] text-white"
                            : "bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 text-[#003153]"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{chat.message}</p>
                        <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 text-[#003153] p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask your AI assistant anything..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 card-shadow bg-white/90 backdrop-blur-sm mt-4">
                <h4 className="font-medium text-[#003153] mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Product Ideas
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent border-[#F4BB3B] text-[#F4BB3B] hover:bg-[#F4BB3B] hover:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Competitor Analysis
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent border-[#EF6950] text-[#EF6950] hover:bg-[#EF6950] hover:text-white"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Pricing Strategy
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
