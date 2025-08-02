"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Star,
  Clock,
  Users,
  MessageCircle,
  Download,
  Play,
  Bookmark,
  ChevronRight,
} from "lucide-react"

const docCategories = [
  {
    id: 1,
    name: "Getting Started",
    icon: BookOpen,
    count: 12,
    color: "from-[#00A388] to-[#00C4A7]",
    description: "Essential guides to get you up and running",
  },
  {
    id: 2,
    name: "Product Management",
    icon: FileText,
    count: 18,
    color: "from-[#003153] to-[#004A73]",
    description: "Learn how to manage your inventory and products",
  },
  {
    id: 3,
    name: "Marketing & Sales",
    icon: Users,
    count: 15,
    color: "from-[#F4BB3B] to-[#F7C94D]",
    description: "Boost your sales with marketing strategies",
  },
  {
    id: 4,
    name: "Analytics & Reports",
    icon: Video,
    count: 9,
    color: "from-[#EF6950] to-[#F28B7A]",
    description: "Understand your business performance",
  },
]

const popularDocs = [
  {
    id: 1,
    title: "Setting Up Your First Product",
    category: "Getting Started",
    views: 2847,
    rating: 4.8,
    readTime: "5 min",
    type: "Guide",
    updated: "2 days ago",
  },
  {
    id: 2,
    title: "Understanding Analytics Dashboard",
    category: "Analytics & Reports",
    views: 1923,
    rating: 4.6,
    readTime: "8 min",
    type: "Tutorial",
    updated: "1 week ago",
  },
  {
    id: 3,
    title: "AI Assistant Best Practices",
    category: "Product Management",
    views: 1456,
    rating: 4.9,
    readTime: "12 min",
    type: "Guide",
    updated: "3 days ago",
  },
  {
    id: 4,
    title: "Email Marketing Automation",
    category: "Marketing & Sales",
    views: 1234,
    rating: 4.7,
    readTime: "10 min",
    type: "Video",
    updated: "5 days ago",
  },
]

const quickLinks = [
  { name: "API Documentation", icon: ExternalLink, url: "#" },
  { name: "Video Tutorials", icon: Video, url: "#" },
  { name: "Community Forum", icon: MessageCircle, url: "#" },
  { name: "Download Resources", icon: Download, url: "#" },
]

const recentUpdates = [
  {
    title: "New AI Features Released",
    description: "Enhanced product photo generation and description writing capabilities",
    date: "Dec 10, 2024",
    type: "Feature",
  },
  {
    title: "Analytics Dashboard Update",
    description: "Improved customer insights and new geographic distribution charts",
    date: "Dec 8, 2024",
    type: "Update",
  },
  {
    title: "Email Templates Added",
    description: "New collection of professional email templates for campaigns",
    date: "Dec 5, 2024",
    type: "Content",
  },
]

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Documentation</h1>
                <p className="text-gray-600">Find answers and learn how to use Labees</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search documentation, guides, and tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Categories */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#003153] mb-4">Browse by Category</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {docCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="p-6 card-shadow bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-200"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#003153] mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{category.count} articles</Badge>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Popular Documentation */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#003153] mb-4">Popular Documentation</h2>
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="space-y-4">
                    {popularDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-[#003153]">{doc.title}</h3>
                              {doc.type === "Video" && <Play className="w-4 h-4 text-[#00A388]" />}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <Badge variant="outline">{doc.category}</Badge>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {doc.readTime}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                {doc.rating}
                              </span>
                              <span>{doc.views.toLocaleString()} views</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <span className="text-xs text-gray-500">{doc.updated}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Recent Updates */}
              <div>
                <h2 className="text-xl font-semibold text-[#003153] mb-4">Recent Updates</h2>
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="space-y-4">
                    {recentUpdates.map((update, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            update.type === "Feature"
                              ? "bg-[#00A388]"
                              : update.type === "Update"
                                ? "bg-[#F4BB3B]"
                                : "bg-[#EF6950]"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-[#003153]">{update.title}</h4>
                            <Badge
                              className={`${
                                update.type === "Feature"
                                  ? "bg-green-100 text-green-700"
                                  : update.type === "Update"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {update.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{update.description}</p>
                          <p className="text-xs text-gray-500">{update.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003153] mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start hover:bg-[#00A388]/10 hover:text-[#00A388]"
                    >
                      <link.icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Help & Support */}
              <Card className="p-6 card-shadow bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10">
                <h3 className="font-semibold text-[#003153] mb-2">Need More Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-[#00A388] hover:bg-[#00C4A7]">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                </div>
              </Card>

              {/* Popular Tags */}
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003153] mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Setup", "AI Features", "Analytics", "Marketing", "Inventory", "Support", "API", "Mobile"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-[#00A388] hover:text-white hover:border-[#00A388]"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
