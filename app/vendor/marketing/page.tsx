"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  Sparkles,
  Instagram,
  Play,
  Camera,
  Zap,
  Gift,
  Crown,
  Mail,
  MessageSquare,
  BarChart3,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const campaignData = [
  {
    id: 1,
    name: "Eid Collection Launch",
    type: "Product Launch",
    status: "Active",
    budget: "QAR 2,500",
    spent: "QAR 1,840",
    reach: "12,847",
    engagement: "8.4%",
    conversions: 89,
    startDate: "2024-03-15",
    endDate: "2024-04-15",
  },
  {
    id: 2,
    name: "AI Try-On Promotion",
    type: "Feature Promotion",
    status: "Completed",
    budget: "QAR 1,800",
    spent: "QAR 1,800",
    reach: "8,923",
    engagement: "12.1%",
    conversions: 156,
    startDate: "2024-02-01",
    endDate: "2024-02-29",
  },
  {
    id: 3,
    name: "Back to Campus",
    type: "Seasonal",
    status: "Scheduled",
    budget: "QAR 3,200",
    spent: "QAR 0",
    reach: "0",
    engagement: "0%",
    conversions: 0,
    startDate: "2024-08-15",
    endDate: "2024-09-15",
  },
]

const socialMediaPosts = [
  {
    id: 1,
    platform: "Instagram",
    type: "Reel",
    content: "5 Ways to Style Your Modest Blazer",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    likes: 2847,
    comments: 156,
    shares: 89,
    reach: 12847,
    engagement: "8.4%",
    posted: "2 hours ago",
  },
  {
    id: 2,
    platform: "Instagram",
    type: "Post",
    content: "New Silk Hijab Collection - Premium Quality",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop",
    likes: 1923,
    comments: 78,
    shares: 45,
    reach: 8923,
    engagement: "6.2%",
    posted: "1 day ago",
  },
  {
    id: 3,
    platform: "TikTok",
    type: "Video",
    content: "Campus to Coffee Shop Outfit Transition",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    likes: 5642,
    comments: 234,
    shares: 167,
    reach: 23456,
    engagement: "12.8%",
    posted: "3 days ago",
  },
]

const influencerCollabs = [
  {
    id: 1,
    name: "Aisha Al-Mahmoud",
    handle: "@modest_style_doha",
    followers: "125K",
    engagement: "4.8%",
    niche: "Modest Fashion",
    location: "Doha, Qatar",
    rate: "QAR 1,200",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Fatima Al-Zahra",
    handle: "@hijab_styling_tips",
    followers: "89K",
    engagement: "6.2%",
    niche: "Hijab Styling",
    location: "Dubai, UAE",
    rate: "QAR 800",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Mariam Al-Rashid",
    handle: "@professional_modest",
    followers: "67K",
    engagement: "5.1%",
    niche: "Professional Wear",
    location: "Riyadh, KSA",
    rate: "QAR 600",
    status: "Completed",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
  },
]

export default function VendorMarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [newCampaignName, setNewCampaignName] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const { toast } = useToast()

  const handleCreateCampaign = () => {
    if (!newCampaignName) return
    toast({
      title: "Campaign Created! 🚀",
      description: `${newCampaignName} has been set up successfully`,
    })
    setNewCampaignName("")
  }

  const handleSchedulePost = () => {
    if (!newPostContent) return
    toast({
      title: "Post Scheduled! 📱",
      description: "Your content will be published at the optimal time",
    })
    setNewPostContent("")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-[#FAF8F4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Marketing Hub</h1>
                <p className="text-gray-600">Grow your brand with AI-powered marketing tools</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="ai-badge">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Optimized
              </Badge>
              <Button className="primary-button">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="influencers">Influencers</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-6">
              {/* Campaign Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-[#00A388]" />
                    <Badge className="bg-green-100 text-green-700">+24%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">3</div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Eye className="w-8 h-8 text-[#F4BB3B]" />
                    <Badge className="bg-yellow-100 text-yellow-700">+18%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">21.7K</div>
                  <div className="text-sm text-gray-600">Total Reach</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-[#003153]" />
                    <Badge className="bg-blue-100 text-blue-700">+12%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">8.9%</div>
                  <div className="text-sm text-gray-600">Avg Engagement</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-[#EF6950]" />
                    <Badge className="bg-red-100 text-red-700">+31%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">245</div>
                  <div className="text-sm text-gray-600">Conversions</div>
                </Card>
              </div>

              {/* Campaign List */}
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Campaign Performance</h3>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-[#003153]">Campaign</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Status</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Budget</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Reach</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Engagement</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Conversions</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignData.map((campaign) => (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-[#003153]">{campaign.name}</p>
                              <p className="text-sm text-gray-600">{campaign.type}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant="secondary"
                              className={
                                campaign.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : campaign.status === "Completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{campaign.budget}</p>
                              <p className="text-sm text-gray-600">Spent: {campaign.spent}</p>
                            </div>
                          </td>
                          <td className="p-4">{campaign.reach}</td>
                          <td className="p-4">
                            <Badge className="bg-[#00A388]/10 text-[#00A388]">{campaign.engagement}</Badge>
                          </td>
                          <td className="p-4 font-bold text-[#003153]">{campaign.conversions}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Quick Campaign Creator */}
              <Card className="p-6 card-shadow bg-[#00A388]/5 border-[#00A388]/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className="ai-badge">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Assistant
                  </Badge>
                  <h3 className="font-semibold text-[#003153]">Quick Campaign Creator</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Campaign name (e.g., Summer Modest Collection)"
                      value={newCampaignName}
                      onChange={(e) => setNewCampaignName(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleCreateCampaign} className="w-full primary-button">
                      Create AI-Optimized Campaign
                    </Button>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-2">AI will optimize for:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Best posting times for your audience</li>
                      <li>• Optimal budget allocation</li>
                      <li>• Target demographic selection</li>
                      <li>• Content recommendations</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              {/* Social Media Performance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Instagram className="w-8 h-8 text-pink-600" />
                    <Badge className="bg-pink-100 text-pink-700">+15%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">45.2K</div>
                  <div className="text-sm text-gray-600">Instagram Followers</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Play className="w-8 h-8 text-black" />
                    <Badge className="bg-gray-100 text-gray-700">+28%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">23.8K</div>
                  <div className="text-sm text-gray-600">TikTok Followers</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="w-8 h-8 text-red-500" />
                    <Badge className="bg-red-100 text-red-700">+22%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">8.4%</div>
                  <div className="text-sm text-gray-600">Avg Engagement</div>
                </Card>
              </div>

              {/* Recent Posts */}
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Recent Posts Performance</h3>
                  <Button className="primary-button">
                    <Camera className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {socialMediaPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.content}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={post.platform === "Instagram" ? "bg-pink-600" : "bg-black"}>
                            {post.platform}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">{post.type}</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-[#003153] mb-2">{post.content}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.reach.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[#00A388]/10 text-[#00A388]">{post.engagement}</Badge>
                          <span className="text-xs text-gray-500">{post.posted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Content Scheduler */}
              <Card className="p-6 card-shadow bg-[#F4BB3B]/5 border-[#F4BB3B]/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className="bg-[#F4BB3B] text-white">
                    <Calendar className="w-3 h-3 mr-1" />
                    Smart Scheduler
                  </Badge>
                  <h3 className="font-semibold text-[#003153]">Schedule Your Next Post</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Textarea
                      placeholder="What's your next post about? AI will optimize the content and timing..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleSchedulePost} className="w-full bg-[#F4BB3B] hover:bg-[#F4BB3B]/90">
                      Schedule with AI Optimization
                    </Button>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-2">Optimal posting times:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Instagram:</span>
                        <span className="font-medium">7:00 PM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TikTok:</span>
                        <span className="font-medium">6:00 PM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best day:</span>
                        <span className="font-medium">Thursday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="influencers" className="space-y-6">
              {/* Influencer Collaboration Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-[#00A388]" />
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">12</div>
                  <div className="text-sm text-gray-600">Active Collaborations</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Crown className="w-8 h-8 text-[#F4BB3B]" />
                    <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">281K</div>
                  <div className="text-sm text-gray-600">Combined Reach</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-[#003153]" />
                    <Badge className="bg-blue-100 text-blue-700">+18%</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">6.8%</div>
                  <div className="text-sm text-gray-600">Avg Engagement</div>
                </Card>
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <Gift className="w-8 h-8 text-[#EF6950]" />
                    <Badge className="bg-red-100 text-red-700">ROI</Badge>
                  </div>
                  <div className="text-2xl font-bold text-[#003153] mb-1">4.2x</div>
                  <div className="text-sm text-gray-600">Return on Investment</div>
                </Card>
              </div>

              {/* Influencer Directory */}
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Influencer Collaborations</h3>
                  <Button className="primary-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Find Influencers
                  </Button>
                </div>
                <div className="space-y-4">
                  {influencerCollabs.map((influencer) => (
                    <div key={influencer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={influencer.avatar || "/placeholder.svg"}
                          alt={influencer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-[#003153]">{influencer.name}</p>
                          <p className="text-sm text-gray-600">{influencer.handle}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>{influencer.followers} followers</span>
                            <span>{influencer.engagement} engagement</span>
                            <span>{influencer.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#003153]">{influencer.rate}</p>
                        <Badge
                          variant="secondary"
                          className={
                            influencer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : influencer.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }
                        >
                          {influencer.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{influencer.niche}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-6">
              <Card className="p-6 card-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <Mail className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Email Marketing</h3>
                  <Badge className="ai-badge">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-[#003153] mb-4">Campaign Performance</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-[#00A388]/5 rounded-lg">
                        <span className="text-sm font-medium">Open Rate</span>
                        <span className="font-bold text-[#003153]">24.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[#F4BB3B]/5 rounded-lg">
                        <span className="text-sm font-medium">Click Rate</span>
                        <span className="font-bold text-[#003153]">4.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[#003153]/5 rounded-lg">
                        <span className="text-sm font-medium">Subscribers</span>
                        <span className="font-bold text-[#003153]">3,247</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#003153] mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button className="w-full primary-button">Create Newsletter</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Design Template
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Manage Subscribers
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card className="p-6 card-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <Camera className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Content Library</h3>
                  <Badge className="ai-badge">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#00A388]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-[#00A388]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#003153] mb-2">AI Content Generator</h4>
                  <p className="text-gray-600 mb-6">
                    Generate product photos, social media content, and marketing materials with AI
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Button className="primary-button">Generate Photos</Button>
                    <Button variant="outline" className="bg-transparent">
                      Create Captions
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Design Graphics
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-6 card-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Marketing Analytics</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-[#003153] mb-4">Channel Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Instagram</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: "68%" }} />
                          </div>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">TikTok</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-black h-2 rounded-full" style={{ width: "45%" }} />
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Email</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#00A388] h-2 rounded-full" style={{ width: "32%" }} />
                          </div>
                          <span className="text-sm font-medium">32%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#003153] mb-4">ROI by Channel</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Influencer Marketing</span>
                        <span className="font-bold text-green-600">4.2x</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">Social Media Ads</span>
                        <span className="font-bold text-blue-600">3.1x</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium">Email Campaigns</span>
                        <span className="font-bold text-yellow-600">2.8x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
