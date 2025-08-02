"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Instagram,
  Facebook,
  Video,
  Palette,
  Sparkles,
  Download,
  Share2,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  Clock,
  Wand2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contentTemplates = [
  {
    id: 1,
    name: "Product Showcase",
    platform: "Instagram",
    type: "Post",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Product+Showcase",
    engagement: "4.2K likes",
    color: "from-pink-500 to-rose-400",
  },
  {
    id: 2,
    name: "Behind the Scenes",
    platform: "TikTok",
    type: "Video",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Behind+Scenes",
    engagement: "12.5K views",
    color: "from-purple-500 to-indigo-400",
  },
  {
    id: 3,
    name: "Customer Review",
    platform: "Facebook",
    type: "Story",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Customer+Review",
    engagement: "890 shares",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 4,
    name: "Style Guide",
    platform: "Instagram",
    type: "Carousel",
    thumbnail: "/placeholder.svg?height=200&width=200&text=Style+Guide",
    engagement: "6.8K likes",
    color: "from-emerald-500 to-teal-400",
  },
]

const recentPosts = [
  {
    id: 1,
    content: "New modest blazer collection dropping this Friday! ✨",
    platform: "Instagram",
    scheduled: "Today, 3:00 PM",
    status: "Published",
    metrics: { likes: 1240, comments: 89, shares: 45 },
  },
  {
    id: 2,
    content: "Behind the scenes: How we design for modern Muslim women 🎨",
    platform: "TikTok",
    scheduled: "Tomorrow, 10:00 AM",
    status: "Scheduled",
    metrics: { views: 8500, likes: 650, comments: 120 },
  },
  {
    id: 3,
    content: "Customer spotlight: Sarah's professional wardrobe transformation",
    platform: "Facebook",
    scheduled: "Dec 15, 2:00 PM",
    status: "Draft",
    metrics: { reach: 0, engagement: 0, clicks: 0 },
  },
]

export default function ContentCreatorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateContent = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedContent(
        "✨ Discover elegance that speaks to your soul! Our new modest blazer collection combines timeless sophistication with modern comfort. Perfect for the confident woman who values both style and modesty. 🌟\n\n#ModestFashion #ProfessionalWear #LabeesFashion #EmpoweredWomen",
      )
      setIsGenerating(false)
      toast({
        title: "Content Generated! 🎉",
        description: "Your AI-powered content is ready to publish",
      })
    }, 2000)
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
                <h1 className="text-2xl font-bold text-[#003153]">Content Creator Studio</h1>
                <p className="text-gray-600">Create engaging content that converts</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] text-white px-4 py-2">
              <Camera className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>

          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger
                value="templates"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Templates
              </TabsTrigger>
              <TabsTrigger
                value="generator"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                AI Generator
              </TabsTrigger>
              <TabsTrigger
                value="scheduler"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Scheduler
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Content Templates</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {contentTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="group cursor-pointer"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <div
                            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${template.color} p-4 text-white transition-transform group-hover:scale-105`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-white/20 text-white">{template.platform}</Badge>
                              <Badge className="bg-white/20 text-white">{template.type}</Badge>
                            </div>
                            <img
                              src={template.thumbnail || "/placeholder.svg"}
                              alt={template.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-medium mb-1">{template.name}</h4>
                            <p className="text-sm text-white/80">{template.engagement}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-gradient-to-r from-[#003153] to-[#004A73] hover:from-[#004A73] hover:to-[#003153]">
                        <Instagram className="w-4 h-4 mr-2" />
                        Create Instagram Post
                      </Button>
                      <Button className="w-full justify-start bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                        <Video className="w-4 h-4 mr-2" />
                        Create TikTok Video
                      </Button>
                      <Button className="w-full justify-start bg-gradient-to-r from-[#F4BB3B] to-[#F7C94D] hover:from-[#F7C94D] hover:to-[#F4BB3B] text-[#003153]">
                        <Facebook className="w-4 h-4 mr-2" />
                        Create Facebook Post
                      </Button>
                      <Button className="w-full justify-start bg-gradient-to-r from-[#EF6950] to-[#F28B7A] hover:from-[#F28B7A] hover:to-[#EF6950]">
                        <Palette className="w-4 h-4 mr-2" />
                        Custom Design
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="generator">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Wand2 className="w-6 h-6 text-[#00A388]" />
                    <h3 className="text-lg font-semibold text-[#003153]">AI Content Generator</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Product/Topic</label>
                      <Input placeholder="e.g., Modest blazer collection" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Platform</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Tone</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Professional</option>
                        <option>Friendly</option>
                        <option>Inspirational</option>
                        <option>Playful</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Additional Context</label>
                      <Textarea placeholder="Add any specific details, target audience, or key messages..." />
                    </div>

                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-4">Generated Content</h3>

                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                        <p className="text-[#003153] whitespace-pre-line">{generatedContent}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-[#003153] hover:bg-[#004A73]">
                          <Download className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#F4BB3B] text-[#F4BB3B] hover:bg-[#F4BB3B] hover:text-white bg-transparent"
                        >
                          <Wand2 className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Your generated content will appear here</p>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scheduler">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Content Scheduler</h3>
                  <Button className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New Post
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-[#003153] font-medium mb-1">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.scheduled}
                            </span>
                            <Badge
                              className={`${
                                post.status === "Published"
                                  ? "bg-green-100 text-green-700"
                                  : post.status === "Scheduled"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {post.status}
                            </Badge>
                            <span className="text-[#00A388]">{post.platform}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1 text-red-400" />
                          {post.metrics.likes || post.metrics.views || 0}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1 text-blue-400" />
                          {post.metrics.comments}
                        </span>
                        <span className="flex items-center">
                          <Share2 className="w-4 h-4 mr-1 text-green-400" />
                          {post.metrics.shares || post.metrics.clicks || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-4">Performance Overview</h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#003153]">24.5K</div>
                      <div className="text-sm text-gray-600">Total Reach</div>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12%
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#F4BB3B]/10 to-[#F7C94D]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#003153]">3.2K</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +8%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Instagram Posts</span>
                      <span className="text-sm font-medium text-[#003153]">68% engagement</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">TikTok Videos</span>
                      <span className="text-sm font-medium text-[#003153]">45% engagement</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Facebook Posts</span>
                      <span className="text-sm font-medium text-[#003153]">32% engagement</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-4">Top Performing Content</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#00A388]/5 to-[#00C4A7]/5 rounded-lg">
                      <img
                        src="/placeholder.svg?height=50&width=50&text=Post"
                        alt="Top post"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#003153]">Modest blazer styling tips</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            12.5K
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            890
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#F4BB3B]/5 to-[#F7C94D]/5 rounded-lg">
                      <img
                        src="/placeholder.svg?height=50&width=50&text=Video"
                        alt="Top video"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#003153]">Behind the scenes design</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            8.2K
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            654
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
