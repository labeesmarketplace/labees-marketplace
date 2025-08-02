"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Gift,
  Star,
  Crown,
  Trophy,
  Zap,
  Heart,
  ShoppingBag,
  Users,
  Calendar,
  Clock,
  Target,
  Award,
  Sparkles,
  TrendingUp,
  Eye,
  Share2,
  Plus,
  Minus,
  CheckCircle,
  Lock,
  Unlock,
  ArrowRight,
  Flame,
  Diamond,
  Coins,
  Ticket,
  Percent,
  MapPin,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const userRewards = {
  currentPoints: 2450,
  totalEarned: 8920,
  currentTier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 550,
  lifetimeSpent: 12500,
  memberSince: "2023-06-15",
  streakDays: 15,
  longestStreak: 28,
}

const rewardTiers = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 999,
    color: "bg-orange-500",
    benefits: ["5% cashback", "Birthday discount", "Free shipping on orders over QAR 200"],
    icon: Award,
  },
  {
    name: "Silver",
    minPoints: 1000,
    maxPoints: 2499,
    color: "bg-gray-400",
    benefits: ["7% cashback", "Early sale access", "Free shipping on orders over QAR 150", "Monthly style tips"],
    icon: Star,
  },
  {
    name: "Gold",
    minPoints: 2500,
    maxPoints: 4999,
    color: "bg-yellow-500",
    benefits: ["10% cashback", "VIP customer service", "Free shipping on all orders", "Personal stylist consultation"],
    icon: Crown,
    current: true,
  },
  {
    name: "Platinum",
    minPoints: 5000,
    maxPoints: 9999,
    color: "bg-purple-500",
    benefits: ["15% cashback", "Exclusive collections", "Priority support", "Quarterly styling box", "Event invitations"],
    icon: Diamond,
  },
  {
    name: "Diamond",
    minPoints: 10000,
    maxPoints: Infinity,
    color: "bg-blue-500",
    benefits: ["20% cashback", "Personal shopping assistant", "Custom designs", "Annual fashion week tickets"],
    icon: Sparkles,
  },
]

const availableRewards = [
  {
    id: "r1",
    title: "QAR 50 Shopping Voucher",
    description: "Use on any purchase over QAR 200",
    points: 500,
    category: "voucher",
    expiryDays: 30,
    popular: true,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=200&h=150&fit=crop",
  },
  {
    id: "r2",
    title: "Free Personal Styling Session",
    description: "60-minute virtual consultation with our style experts",
    points: 1200,
    category: "service",
    expiryDays: 60,
    popular: false,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=150&fit=crop",
  },
  {
    id: "r3",
    title: "Premium Hijab Collection",
    description: "Exclusive set of 3 premium silk hijabs",
    points: 800,
    category: "product",
    expiryDays: 90,
    popular: true,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=150&fit=crop",
  },
]

const earnMethods = [
  {
    id: "purchase",
    title: "Make a Purchase",
    description: "Earn 1 point for every QAR spent",
    points: "1 point/QAR",
    icon: ShoppingBag,
    color: "text-green-600",
  },
  {
    id: "review",
    title: "Write Product Reviews",
    description: "Share your honest feedback",
    points: "25 points",
    icon: Star,
    color: "text-yellow-600",
  },
  {
    id: "social",
    title: "Share on Social Media",
    description: "Tag us in your outfit posts",
    points: "15 points",
    icon: Share2,
    color: "text-blue-600",
  },
]

const recentActivity = [
  {
    id: "a1",
    type: "earned",
    title: "Purchase Reward",
    description: "Earned from QAR 280 purchase",
    points: 280,
    date: "2024-01-20",
    icon: ShoppingBag,
  },
  {
    id: "a2",
    type: "redeemed",
    title: "QAR 50 Voucher",
    description: "Redeemed shopping voucher",
    points: -500,
    date: "2024-01-18",
    icon: Ticket,
  },
]

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()

  const handleRedeemReward = (rewardId: string, points: number) => {
    if (userRewards.currentPoints < points) {
      toast({
        title: "Insufficient points",
        description: `You need ${points - userRewards.currentPoints} more points to redeem this reward`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Reward redeemed! 🎉",
      description: "Your reward will be processed within 24 hours",
    })
  }

  const filteredRewards = selectedCategory === "all" 
    ? availableRewards 
    : availableRewards.filter(reward => reward.category === selectedCategory)

  const currentTier = rewardTiers.find(tier => tier.current)
  const nextTier = rewardTiers.find(tier => tier.name === userRewards.nextTier)

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
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-yellow-700">Rewards Program</h1>
                    <p className="text-sm text-yellow-600">Earn points and unlock exclusive benefits</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Coins className="w-3 h-3 mr-1" />
                  {userRewards.currentPoints.toLocaleString()} Points
                </Badge>
                <Badge className={`${currentTier?.color} text-white`}>
                  {currentTier?.name} Member
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Points Overview */}
              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {userRewards.currentPoints.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Available Points</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {userRewards.totalEarned.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 ${currentTier?.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      {currentTier?.icon && <currentTier.icon className="w-8 h-8 text-white" />}
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">{userRewards.currentTier}</div>
                    <div className="text-sm text-gray-600">Current Tier</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">{userRewards.streakDays}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>

                {/* Progress to Next Tier */}
                {nextTier && (
                  <div className="mt-6 pt-6 border-t border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress to {nextTier.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {userRewards.pointsToNextTier} points to go
                      </span>
                    </div>
                    <Progress 
                      value={((nextTier.minPoints - userRewards.pointsToNextTier) / nextTier.minPoints) * 100} 
                      className="h-3"
                    />
                  </div>
                )}
              </Card>

              {/* Reward Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 bg-yellow-50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="redeem" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Gift className="w-4 h-4 mr-2" />
                    Redeem
                  </TabsTrigger>
                  <TabsTrigger value="earn" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Earn Points
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Tier Benefits */}
                  <Card className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-yellow-700 mb-6">Membership Tiers</h3>
                    <div className="grid lg:grid-cols-5 gap-4">
                      {rewardTiers.map((tier) => (
                        <div
                          key={tier.name}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            tier.current
                              ? "border-yellow-400 bg-yellow-50 scale-105"
                              : userRewards.currentPoints >= tier.minPoints
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="text-center mb-4">
                            <div className={`w-12 h-12 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                              <tier.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-800">{tier.name}</h4>
                            <p className="text-xs text-gray-600">
                              {tier.minPoints.toLocaleString()}+ points
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            {tier.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          
                          {tier.current && (
                            <Badge className="w-full mt-3 bg-yellow-500 text-white justify-center">
                              Current Tier
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-center">
                      <ShoppingBag className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-700 mb-2">Shop & Earn</h3>
                      <p className="text-sm text-gray-600 mb-4">Earn 1 point for every QAR spent</p>
                      <Link href="/home">
                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                          Start Shopping
                        </Button>
                      </Link>
                    </Card>

                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-center">
                      <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-blue-700 mb-2">Refer Friends</h3>
                      <p className="text-sm text-gray-600 mb-4">Get 100 points for each referral</p>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Invite Friends
                      </Button>
                    </Card>

                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-center">
                      <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-purple-700 mb-2">Write Reviews</h3>
                      <p className="text-sm text-gray-600 mb-4">Earn 25 points per review</p>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                        Review Products
                      </Button>
                    </Card>
                  </div>
                </TabsContent>

                {/* Redeem Rewards */}
                <TabsContent value="redeem" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRewards.map((reward) => (
                      <Card key={reward.id} className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                          <img
                            src={reward.image}
                            alt={reward.title}
                            className="w-full h-32 object-cover"
                          />
                          {reward.popular && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                              Popular
                            </Badge>
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-yellow-500 text-white text-xs">
                              <Coins className="w-3 h-3 mr-1" />
                              {reward.points}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">{reward.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>Expires in {reward.expiryDays} days</span>
                            <Badge className="bg-gray-100 text-gray-700 text-xs capitalize">
                              {reward.category}
                            </Badge>
                          </div>
                          
                          <Button
                            onClick={() => handleRedeemReward(reward.id, reward.points)}
                            disabled={userRewards.currentPoints < reward.points}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white disabled:opacity-50"
                          >
                            {userRewards.currentPoints < reward.points ? (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Need {reward.points - userRewards.currentPoints} more
                              </>
                            ) : (
                              <>
                                <Gift className="w-4 h-4 mr-2" />
                                Redeem Now
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Earn Points */}
                <TabsContent value="earn" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {earnMethods.map((method) => (
                      <Card key={method.id} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center`}>
                            <method.icon className={`w-6 h-6 ${method.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{method.title}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-100 text-yellow-700">
                            {method.points}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* History */}
                <TabsContent value="history" className="space-y-6 mt-6">
                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-yellow-700 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "earned" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            <activity.icon className={`w-5 h-5 ${
                              activity.type === "earned" ? "text-green-600" : "text-red-600"
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <span className="text-xs text-gray-500">{activity.date}</span>
                          </div>
                          
                          <div className={`text-right ${
                            activity.points > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            <div className="font-bold">
                              {activity.points > 0 ? "+" : ""}{activity.points}
                            </div>
                            <div className="text-xs">points</div>
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