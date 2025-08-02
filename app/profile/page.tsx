"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, User, Heart, ShoppingBag, Settings, Share, Sparkles, Gift } from "lucide-react"
import Link from "next/link"

const wardrobeItems = [
  {
    id: 1,
    name: "Campus Chic Bundle",
    date: "2 days ago",
    image: "/placeholder.svg?height=150&width=150",
    aiSuggestion: "Wear with white sneakers for weekend look",
  },
  {
    id: 2,
    name: "Eid Elegance Set",
    date: "1 week ago",
    image: "/placeholder.svg?height=150&width=150",
    aiSuggestion: "Perfect for upcoming family gathering",
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/home">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="font-semibold text-[#003153]">Profile</h1>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Info */}
        <Card className="p-6 card-shadow text-center">
          <div className="w-20 h-20 bg-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#003153] mb-1">Alya Al-Rashid</h2>
          <p className="text-gray-600 mb-4">Doha, Qatar</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-[#003153]">12</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#003153]">8</div>
              <div className="text-xs text-gray-600">Outfits</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#003153]">156</div>
              <div className="text-xs text-gray-600">Points</div>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Edit Profile
          </Button>
        </Card>

        {/* AI Style Score */}
        <Card className="p-4 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#003153]">AI Style Score</h3>
            <Badge className="ai-badge">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-[#00A388] mb-2">87</div>
            <p className="text-sm text-gray-600">Your style confidence is growing!</p>
          </div>
          <Progress value={87} className="mb-4" />
          <div className="bg-[#00A388]/5 p-3 rounded-lg">
            <p className="text-sm text-[#003153] font-medium mb-1">Style Tip</p>
            <p className="text-xs text-gray-700">
              Try mixing textures - your silk hijabs pair beautifully with structured blazers
            </p>
          </div>
        </Card>

        {/* My Wardrobe */}
        <Card className="p-4 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#003153]">My Wardrobe</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {wardrobeItems.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-[#003153]">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                  <div className="flex items-center text-xs text-[#00A388]">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {item.aiSuggestion}
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-auto bg-transparent">
                    Re-order
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs px-2 py-1 h-auto">
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Referral Program */}
        <Card className="p-4 card-shadow bg-gradient-to-r from-[#F4BB3B]/10 to-[#00A388]/10">
          <div className="flex items-center space-x-3 mb-3">
            <Gift className="w-6 h-6 text-[#F4BB3B]" />
            <h3 className="font-semibold text-[#003153]">Invite Friends</h3>
          </div>
          <p className="text-sm text-gray-700 mb-4">Share Labees with friends and earn QAR 50 credit for each signup</p>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Copy Code: ALYA50
            </Button>
            <Button className="primary-button">Share</Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 card-shadow text-center">
            <Heart className="w-8 h-8 text-[#EF6950] mx-auto mb-2" />
            <h4 className="font-medium text-[#003153] mb-1">Wishlist</h4>
            <p className="text-xs text-gray-600">5 items saved</p>
          </Card>
          <Card className="p-4 card-shadow text-center">
            <ShoppingBag className="w-8 h-8 text-[#003153] mx-auto mb-2" />
            <h4 className="font-medium text-[#003153] mb-1">Orders</h4>
            <p className="text-xs text-gray-600">View history</p>
          </Card>
        </div>

        {/* Become a Vendor */}
        <Card className="p-4 card-shadow bg-[#003153] text-white">
          <h3 className="font-semibold mb-2">Sell on Labees</h3>
          <p className="text-sm text-white/80 mb-4">Turn your fashion passion into profit. Join 500+ local designers</p>
          <Link href="/vendor/signup">
            <Button variant="secondary" className="w-full">
              Start Selling
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
