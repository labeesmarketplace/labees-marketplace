"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  Star,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ShoppingBag,
  Heart,
  Zap,
  Gift,
  Crown,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

const kpiData = [
  {
    title: "Profile Views",
    value: "1,249",
    change: "+23%",
    trend: "up",
    icon: Eye,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Wishlist Items",
    value: "23",
    change: "+5 this week",
    trend: "up",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    title: "Orders Placed",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Style Score",
    value: "87/100",
    change: "+3 points",
    trend: "up",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

const styleProgress = {
  current: 87,
  target: 100,
  level: "Fashion Enthusiast",
  nextLevel: "Style Expert",
  pointsToNext: 13,
}

const recentActivity = [
  {
    user: "AI Stylist",
    action: "New outfit recommendation",
    time: "2 minutes ago",
    type: "recommendation",
  },
  {
    user: "Noor Collection",
    action: "New arrivals in your size",
    time: "1 hour ago",
    type: "brand",
  },
  {
    user: "Style Community",
    action: "Your look was featured",
    time: "3 hours ago",
    type: "community",
  },
]

const optimizationTasks = [
  {
    task: "Complete style quiz",
    points: "+20 pts",
    completed: true,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    task: "Upload outfit photos",
    points: "+15 pts",
    completed: false,
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    task: "Share your first look",
    points: "+7 pts",
    completed: false,
    icon: Clock,
    color: "text-blue-600",
  },
]

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-[#003153]">Overview</h1>
              <p className="text-gray-600">Welcome back to your style dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="ai-badge">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Active
              </Badge>
              <div className="w-8 h-8 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || "A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <Card
              key={kpi.title}
              className="p-6 card-shadow bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {kpi.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-[#003153] mb-1">{kpi.value}</div>
              <div className="text-sm text-gray-600">{kpi.title}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Style Progress */}
          <div className="lg:col-span-2">
            <Card className="p-6 card-shadow bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#003153]">Style Progress</h3>
                <Badge className="bg-gradient-to-r from-[#003153] to-[#00A388] text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  {styleProgress.level}
                </Badge>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Level</span>
                  <span className="text-sm text-gray-500">{styleProgress.pointsToNext} points to next level</span>
                </div>
                <Progress value={styleProgress.current} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{styleProgress.level}</span>
                  <span>{styleProgress.nextLevel}</span>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-gradient-to-r from-[#003153]/5 to-[#00A388]/5 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#003153]">87</div>
                  <div className="text-xs text-gray-600">Current Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00A388]">23</div>
                  <div className="text-xs text-gray-600">Outfits Tried</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F4BB3B]">1,249</div>
                  <div className="text-xs text-gray-600">AI Sessions</div>
                </div>
                <div className="text-2xl font-bold text-[#EF6950]">$12M</div>
                <div className="text-xs text-gray-600">Style Value</div>
              </div>
            </Card>
          </div>

          {/* Profile Optimization */}
          <div>
            <Card className="p-6 card-shadow bg-white/80 backdrop-blur-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#003153]">Profile Optimization</h3>
                <Button variant="ghost" size="sm" className="text-[#00A388] hover:text-[#00A388]/80">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {optimizationTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#00A388]/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <task.icon className={`w-5 h-5 ${task.color}`} />
                      <div>
                        <p className="text-sm font-medium text-[#003153]">{task.task}</p>
                        <p className="text-xs text-gray-500">{task.points}</p>
                      </div>
                    </div>
                    {task.completed && <Badge className="bg-green-100 text-green-700 text-xs">Completed</Badge>}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#00A388]/5 rounded-lg">
                <p className="text-sm text-[#003153] font-medium">Potential Score: 113/100</p>
                <p className="text-xs text-gray-600 mt-1">Complete remaining tasks to unlock premium features</p>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 card-shadow bg-white/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-[#003153] mb-4">Recent Activity</h3>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "recommendation"
                          ? "bg-[#00A388]"
                          : activity.type === "brand"
                            ? "bg-[#F4BB3B]"
                            : "bg-[#003153]"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#003153]">{activity.action}</p>
                      <p className="text-xs text-gray-600">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/home">
            <Card className="p-6 card-shadow bg-gradient-to-r from-[#003153] to-[#00A388] text-white hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">AI Try-On</h4>
                  <p className="text-sm text-white/80">Discover your perfect look</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="p-6 card-shadow bg-gradient-to-r from-[#F4BB3B] to-[#EF6950] text-white hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Rewards</h4>
                  <p className="text-sm text-white/80">Earn points & unlock perks</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/vendor/signup">
            <Card className="p-6 card-shadow bg-gradient-to-r from-[#00A388] to-[#003153] text-white hover:shadow-lg transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Become Vendor</h4>
                  <p className="text-sm text-white/80">Start selling your designs</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
