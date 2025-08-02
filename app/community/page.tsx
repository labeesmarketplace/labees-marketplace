"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Camera,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Star,
  Eye,
  ThumbsUp,
  Send,
  Image as ImageIcon,
  Video,
  Smile,
  MapPin,
  Clock,
  Award,
  Crown,
  Sparkles,
  Zap,
  Flame,
  Globe,
  UserPlus,
  Settings,
  MoreHorizontal,
  Flag,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const communityPosts = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Aisha Al-Rashid",
      username: "@aisha_style",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=50&h=50&fit=crop&crop=face",
      verified: true,
      location: "Doha, Qatar",
      followers: 12400,
      following: 890,
      level: "Style Expert",
    },
    content: {
      text: "Just tried the new AI styling feature and I'm obsessed! 😍 The recommendations were spot on. Here's my work-to-weekend transition look using pieces from @noor_collection",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
      ],
      tags: ["#WorkToWeekend", "#ModestFashion", "#AIStyled", "#NoorCollection"],
    },
    engagement: {
      likes: 234,
      comments: 45,
      shares: 12,
      bookmarks: 67,
    },
    timestamp: "2 hours ago",
    trending: true,
    featured: true,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Fatima Hassan",
      username: "@fatima_modest",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      verified: false,
      location: "Dubai, UAE",
      followers: 5600,
      following: 1200,
      level: "Fashion Enthusiast",
    },
    content: {
      text: "Styling tip: Layer different textures for depth! This silk hijab with a structured blazer creates the perfect balance. What's your favorite texture combo?",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      ],
      tags: ["#StylingTips", "#TextureMixing", "#ModestStyle"],
    },
    engagement: {
      likes: 156,
      comments: 28,
      shares: 8,
      bookmarks: 34,
    },
    timestamp: "5 hours ago",
    trending: false,
    featured: false,
  },
]

const trendingHashtags = [
  { tag: "#ModestFashion", posts: 12400, growth: "+15%" },
  { tag: "#AIStyled", posts: 3200, growth: "+45%" },
  { tag: "#WorkToWeekend", posts: 2800, growth: "+22%" },
  { tag: "#EidCollection", posts: 5600, growth: "+8%" },
  { tag: "#StylingTips", posts: 4100, growth: "+18%" },
  { tag: "#OOTD", posts: 8900, growth: "+12%" },
]

const featuredCreators = [
  {
    id: "c1",
    name: "Sarah Al-Mansouri",
    username: "@sarah_modest",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face",
    followers: 25600,
    specialty: "Modest Workwear",
    verified: true,
  },
  {
    id: "c2",
    name: "Layla Ibrahim",
    username: "@layla_hijab",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
    followers: 18900,
    specialty: "Hijab Styling",
    verified: true,
  },
]

export default function StyleCommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPostText, setNewPostText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleLike = (postId: string) => {
    toast({
      title: "Liked! ❤️",
      description: "Post added to your liked content",
    })
  }

  const handleComment = (postId: string) => {
    toast({
      title: "Opening comments...",
      description: "Join the conversation",
    })
  }

  const handleShare = (postId: string) => {
    toast({
      title: "Sharing post...",
      description: "Creating shareable link",
    })
  }

  const handleFollow = (userId: string) => {
    toast({
      title: "Following! 👍",
      description: "You'll see their posts in your feed",
    })
  }

  const handleCreatePost = () => {
    if (!newPostText.trim()) {
      toast({
        title: "Please add some content",
        description: "Write something to share with the community",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Post created! 🎉",
      description: "Your post has been shared with the community",
    })
    setNewPostText("")
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
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-purple-700">Style Community</h1>
                    <p className="text-sm text-purple-600">Connect, inspire, and discover</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Create Post */}
                <Card className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=50&h=50&fit=crop&crop=face" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Share your style inspiration..."
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        className="border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Photo
                          </Button>
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </Button>
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            <Camera className="w-4 h-4 mr-2" />
                            AI Try-On
                          </Button>
                        </div>
                        <Button
                          onClick={handleCreatePost}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Filter Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 bg-purple-50">
                    <TabsTrigger value="feed" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Feed
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <Flame className="w-4 h-4 mr-2" />
                      Trending
                    </TabsTrigger>
                    <TabsTrigger value="following" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Following
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      <Award className="w-4 h-4 mr-2" />
                      Challenges
                    </TabsTrigger>
                  </TabsList>

                  {/* Feed Content */}
                  <TabsContent value="feed" className="space-y-6 mt-6">
                    {communityPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                        {/* Post Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={post.user.avatar} />
                                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
                                  {post.user.verified && (
                                    <Badge className="bg-blue-100 text-blue-700 text-xs px-1 py-0">✓</Badge>
                                  )}
                                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                                    {post.user.level}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <span>{post.user.username}</span>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {post.user.location}
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {post.timestamp}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {post.trending && (
                                <Badge className="bg-orange-100 text-orange-700 text-xs">
                                  <Flame className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {post.featured && (
                                <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-4">
                          <p className="text-gray-800 mb-3">{post.content.text}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.content.tags.map((tag) => (
                              <Badge key={tag} className="bg-purple-100 text-purple-700 text-xs cursor-pointer hover:bg-purple-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Images */}
                          {post.content.images.length > 0 && (
                            <div className={`grid gap-2 mb-4 ${
                              post.content.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                            }`}>
                              {post.content.images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Post Actions */}
                        <div className="px-4 py-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <button
                                onClick={() => handleLike(post.id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                              >
                                <Heart className="w-5 h-5" />
                                <span className="text-sm">{post.engagement.likes}</span>
                              </button>
                              <button
                                onClick={() => handleComment(post.id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                              >
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm">{post.engagement.comments}</span>
                              </button>
                              <button
                                onClick={() => handleShare(post.id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                              >
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm">{post.engagement.shares}</span>
                              </button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-500">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => handleFollow(post.user.id)}
                                variant="outline"
                                size="sm"
                                className="bg-white border-purple-300 text-purple-600 hover:bg-purple-50"
                              >
                                <UserPlus className="w-3 h-3 mr-1" />
                                Follow
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Trending Content */}
                  <TabsContent value="trending" className="space-y-6 mt-6">
                    <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                      <h3 className="text-lg font-bold text-orange-700 mb-4 flex items-center">
                        <Flame className="w-5 h-5 mr-2" />
                        Trending Now
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {trendingHashtags.map((hashtag) => (
                          <div key={hashtag.tag} className="p-3 bg-white rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-orange-700">{hashtag.tag}</span>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {hashtag.growth}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{hashtag.posts.toLocaleString()} posts</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 p-6 space-y-6">
              {/* Search */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search community..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200"
                  />
                </div>
              </Card>

              {/* Featured Creators */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-purple-700 mb-4 flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  Featured Creators
                </h3>
                <div className="space-y-3">
                  {featuredCreators.map((creator) => (
                    <div key={creator.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={creator.avatar} />
                          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-1">
                            <h4 className="font-medium text-gray-800 text-sm">{creator.name}</h4>
                            {creator.verified && <Badge className="bg-blue-100 text-blue-700 text-xs px-1 py-0">✓</Badge>}
                          </div>
                          <p className="text-xs text-gray-600">{creator.specialty}</p>
                          <p className="text-xs text-gray-500">{(creator.followers / 1000).toFixed(1)}K followers</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleFollow(creator.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <h3 className="font-semibold text-purple-700 mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Members</span>
                    <span className="font-semibold text-purple-600">24.5K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Posts Today</span>
                    <span className="font-semibold text-purple-600">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Now</span>
                    <span className="font-semibold text-green-600">1.2K</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}