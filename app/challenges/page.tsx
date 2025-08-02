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
import {
  Star,
  Trophy,
  Award,
  Crown,
  Users,
  Calendar,
  Clock,
  Camera,
  Upload,
  Heart,
  MessageCircle,
  Share2,
  Gift,
  Zap,
  Target,
  TrendingUp,
  Flame,
  Plus,
  CheckCircle,
  Timer,
  Medal,
  Sparkles,
  Eye,
  ThumbsUp,
  Flag,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const activeChallenges = [
  {
    id: "ch1",
    title: "30-Day Modest Style Challenge",
    description: "Share your daily modest outfit inspiration and build your style confidence",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    category: "Daily Style",
    difficulty: "Beginner",
    duration: "30 days",
    participants: 1247,
    prize: "QAR 1000 Shopping Voucher + Featured Profile",
    startDate: "2024-01-01",
    endDate: "2024-02-15",
    progress: 65,
    daysLeft: 12,
    trending: true,
    featured: true,
    host: {
      name: "Labees Team",
      avatar: "/placeholder.svg",
      verified: true,
    },
    rules: [
      "Post daily outfit photos with #30DayModestStyle",
      "Include styling tips or inspiration",
      "Engage with other participants",
      "Use only modest fashion pieces",
    ],
    rewards: {
      daily: "5 points per post",
      weekly: "50 bonus points for 7 consecutive days",
      completion: "500 points + grand prize entry",
    },
  },
  {
    id: "ch2",
    title: "Ramadan Elegance",
    description: "Elegant and comfortable looks for the holy month",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
    category: "Seasonal",
    difficulty: "Intermediate",
    duration: "30 days",
    participants: 892,
    prize: "Featured on Homepage + QAR 500 Voucher",
    startDate: "2024-03-01",
    endDate: "2024-03-30",
    progress: 0,
    daysLeft: 45,
    trending: false,
    featured: false,
    host: {
      name: "Noor Collection",
      avatar: "/placeholder.svg",
      verified: true,
    },
    rules: [
      "Focus on comfortable yet elegant pieces",
      "Include iftar and suhoor appropriate outfits",
      "Share styling tips for the holy month",
      "Respect the spiritual significance",
    ],
    rewards: {
      daily: "10 points per post",
      weekly: "100 bonus points",
      completion: "1000 points + feature opportunity",
    },
  },
  {
    id: "ch3",
    title: "Work-to-Weekend Transition",
    description: "Master the art of transforming work outfits for weekend activities",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    category: "Styling Tips",
    difficulty: "Advanced",
    duration: "14 days",
    participants: 634,
    prize: "Personal Styling Session + QAR 750 Voucher",
    startDate: "2024-02-01",
    endDate: "2024-02-14",
    progress: 25,
    daysLeft: 8,
    trending: true,
    featured: false,
    host: {
      name: "Style Expert Sarah",
      avatar: "/placeholder.svg",
      verified: true,
    },
    rules: [
      "Show before and after transformations",
      "Explain your styling process",
      "Use versatile pieces",
      "Include budget-friendly tips",
    ],
    rewards: {
      daily: "15 points per transformation",
      weekly: "200 bonus points",
      completion: "1500 points + styling session",
    },
  },
]

const completedChallenges = [
  {
    id: "ch4",
    title: "Eid Collection Showcase",
    description: "Celebrate Eid with stunning modest fashion",
    participants: 2156,
    winner: {
      name: "Aisha Al-Rashid",
      username: "@aisha_style",
      avatar: "/placeholder.svg",
      prize: "QAR 2000 Shopping Spree",
    },
    completedDate: "2023-12-25",
    totalPosts: 8624,
  },
  {
    id: "ch5",
    title: "Hijab Styling Mastery",
    description: "Creative hijab styling techniques",
    participants: 1834,
    winner: {
      name: "Fatima Hassan",
      username: "@fatima_modest",
      avatar: "/placeholder.svg",
      prize: "Featured Brand Collaboration",
    },
    completedDate: "2023-11-30",
    totalPosts: 5502,
  },
]

const leaderboard = [
  {
    rank: 1,
    user: {
      name: "Aisha Al-Rashid",
      username: "@aisha_style",
      avatar: "/placeholder.svg",
      verified: true,
    },
    points: 2450,
    posts: 28,
    streak: 15,
    badges: ["Style Expert", "Trendsetter", "Community Favorite"],
  },
  {
    rank: 2,
    user: {
      name: "Mariam Al-Zahra",
      username: "@mariam_elegance",
      avatar: "/placeholder.svg",
      verified: true,
    },
    points: 2180,
    posts: 25,
    streak: 12,
    badges: ["Fashion Guru", "Consistent Creator"],
  },
  {
    rank: 3,
    user: {
      name: "Fatima Hassan",
      username: "@fatima_modest",
      avatar: "/placeholder.svg",
      verified: false,
    },
    points: 1950,
    posts: 22,
    streak: 18,
    badges: ["Rising Star", "Engagement Queen"],
  },
]

const myProgress = {
  currentChallenge: "30-Day Modest Style Challenge",
  daysCompleted: 18,
  totalDays: 30,
  currentStreak: 5,
  longestStreak: 12,
  totalPoints: 890,
  rank: 15,
  postsSubmitted: 18,
  likesReceived: 456,
  commentsReceived: 89,
}

export default function StyleChallengesPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)
  const { toast } = useToast()

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Joined! 🎉",
      description: "You're now part of the challenge. Start posting to earn points!",
    })
  }

  const handleSubmitEntry = (challengeId: string) => {
    toast({
      title: "Entry Submitted! 📸",
      description: "Your challenge entry has been posted to the community",
    })
  }

  const handleShareChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Shared! 📱",
      description: "Invite your friends to join the fun",
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
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-yellow-700">Style Challenges</h1>
                    <p className="text-sm text-yellow-600">Compete, create, and win amazing prizes</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  {myProgress.totalPoints} Points
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Rank #{myProgress.rank}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* My Progress Card */}
              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-yellow-700 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    My Challenge Progress
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Submit Entry
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">{myProgress.daysCompleted}/{myProgress.totalDays}</div>
                    <div className="text-sm text-gray-600">Days Completed</div>
                    <Progress value={(myProgress.daysCompleted / myProgress.totalDays) * 100} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{myProgress.currentStreak}</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                    <div className="flex items-center justify-center mt-2">
                      <Flame className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="text-xs text-orange-600">Best: {myProgress.longestStreak} days</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{myProgress.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Rank #{myProgress.rank}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-1">{myProgress.likesReceived}</div>
                    <div className="text-sm text-gray-600">Likes Received</div>
                    <div className="flex items-center justify-center mt-2">
                      <Heart className="w-4 h-4 text-pink-500 mr-1" />
                      <span className="text-xs text-pink-600">{myProgress.commentsReceived} comments</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Challenge Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 bg-yellow-50">
                  <TabsTrigger value="active" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Leaderboard
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="create" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                  </TabsTrigger>
                </TabsList>

                {/* Active Challenges */}
                <TabsContent value="active" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {activeChallenges.map((challenge) => (
                      <Card key={challenge.id} className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="relative">
                          <img
                            src={challenge.image}
                            alt={challenge.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex space-x-2">
                            {challenge.featured && (
                              <Badge className="bg-yellow-500 text-white text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {challenge.trending && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                <Flame className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            <Badge className="bg-blue-500 text-white text-xs">
                              {challenge.difficulty}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-black/70 text-white text-xs">
                              <Timer className="w-3 h-3 mr-1" />
                              {challenge.daysLeft} days left
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={challenge.host.avatar} />
                              <AvatarFallback>{challenge.host.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-gray-700">{challenge.host.name}</span>
                                {challenge.host.verified && (
                                  <Badge className="bg-blue-100 text-blue-700 text-xs px-1 py-0">✓</Badge>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{challenge.category}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                          <p className="text-gray-600 mb-4">{challenge.description}</p>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              {challenge.participants.toLocaleString()} participants
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {challenge.duration}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Gift className="w-4 h-4 mr-2" />
                              Prize Pool
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {challenge.daysLeft} days left
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Trophy className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium text-yellow-700">Prize</span>
                            </div>
                            <p className="text-sm text-yellow-600">{challenge.prize}</p>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleJoinChallenge(challenge.id)}
                              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Join Challenge
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareChallenge(challenge.id)}
                              className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Leaderboard */}
                <TabsContent value="leaderboard" className="space-y-6 mt-6">
                  <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-700 mb-6 flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      Challenge Leaderboard
                    </h3>
                    
                    <div className="space-y-4">
                      {leaderboard.map((entry) => (
                        <div
                          key={entry.rank}
                          className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                            entry.rank === 1
                              ? "bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300"
                              : entry.rank === 2
                                ? "bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300"
                                : entry.rank === 3
                                  ? "bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300"
                                  : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                entry.rank === 1
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                  : entry.rank === 2
                                    ? "bg-gradient-to-r from-gray-500 to-gray-600"
                                    : entry.rank === 3
                                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                                      : "bg-gray-400"
                              }`}
                            >
                              {entry.rank === 1 ? (
                                <Crown className="w-5 h-5" />
                              ) : entry.rank === 2 ? (
                                <Medal className="w-5 h-5" />
                              ) : entry.rank === 3 ? (
                                <Award className="w-5 h-5" />
                              ) : (
                                entry.rank
                              )}
                            </div>
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={entry.user.avatar} />
                              <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-800">{entry.user.name}</h4>
                              {entry.user.verified && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs px-1 py-0">✓</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{entry.user.username}</p>
                            <div className="flex flex-wrap gap-1">
                              {entry.badges.slice(0, 2).map((badge) => (
                                <Badge key={badge} className="bg-purple-100 text-purple-700 text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600 mb-1">{entry.points}</div>
                            <div className="text-xs text-gray-600">points</div>
                            <div className="flex items-center justify-end space-x-3 mt-2 text-xs text-gray-500">
                              <span>{entry.posts} posts</span>
                              <span className="flex items-center">
                                <Flame className="w-3 h-3 mr-1 text-orange-500" />
                                {entry.streak}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Completed Challenges */}
                <TabsContent value="completed" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {completedChallenges.map((challenge) => (
                      <Card key={challenge.id} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <Badge className="bg-green-100 text-green-700 text-xs">Completed</Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-green-700">Winner</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={challenge.winner.avatar} />
                              <AvatarFallback>{challenge.winner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-gray-800">{challenge.winner.name}</h4>
                              <p className="text-sm text-gray-600">{challenge.winner.username}</p>
                              <p className="text-xs text-green-600">{challenge.winner.prize}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {challenge.participants.toLocaleString()} participants
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {challenge.completedDate}
                          </div>
                          <div className="flex items-center">
                            <Camera className="w-4 h-4 mr-2" />
                            {challenge.totalPosts.toLocaleString()} posts
                          </div>
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            Challenge Complete
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Create Challenge */}
                <TabsContent value="create" className="space-y-6 mt-6">
                  <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                        <Plus className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-700">Create Your Own Challenge</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Have a creative idea for a style challenge? Share it with the community and inspire others!
                      </p>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start Creating
                      </Button>
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