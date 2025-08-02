"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, MapPin, Clock, Star, Filter, Download, UserCheck, Calendar, DollarSign } from "lucide-react"

const customerSegments = [
  {
    id: 1,
    name: "Professional Women",
    count: 2847,
    percentage: 45,
    avgSpend: "QAR 450",
    color: "from-[#003153] to-[#004A73]",
    growth: "+12%",
    topProducts: ["Blazers", "Modest Dresses", "Professional Scarves"],
  },
  {
    id: 2,
    name: "Students",
    count: 1923,
    percentage: 30,
    avgSpend: "QAR 180",
    color: "from-[#00A388] to-[#00C4A7]",
    growth: "+8%",
    topProducts: ["Casual Wear", "Accessories", "Budget Collections"],
  },
  {
    id: 3,
    name: "Young Mothers",
    count: 1156,
    percentage: 18,
    avgSpend: "QAR 320",
    color: "from-[#F4BB3B] to-[#F7C94D]",
    growth: "+15%",
    topProducts: ["Comfortable Wear", "Nursing-Friendly", "Family Sets"],
  },
  {
    id: 4,
    name: "Seniors",
    count: 445,
    percentage: 7,
    avgSpend: "QAR 280",
    color: "from-[#EF6950] to-[#F28B7A]",
    growth: "+5%",
    topProducts: ["Traditional Wear", "Comfort Fit", "Classic Styles"],
  },
]

const behaviorData = [
  {
    metric: "Average Session Duration",
    value: "8m 32s",
    change: "+2m 15s",
    trend: "up",
  },
  {
    metric: "Pages per Session",
    value: "4.7",
    change: "+0.8",
    trend: "up",
  },
  {
    metric: "Bounce Rate",
    value: "32%",
    change: "-5%",
    trend: "down",
  },
  {
    metric: "Return Customer Rate",
    value: "68%",
    change: "+12%",
    trend: "up",
  },
]

const customerFeedback = [
  {
    id: 1,
    customer: "Fatima Al-Zahra",
    rating: 5,
    comment: "Absolutely love the quality and modest designs. Perfect for my professional wardrobe!",
    product: "Executive Blazer Collection",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    customer: "Aisha Mohammed",
    rating: 4,
    comment: "Great variety and fast shipping. The sizing guide was very helpful.",
    product: "Casual Modest Wear",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    customer: "Mariam Hassan",
    rating: 5,
    comment: "Finally found a brand that understands modest fashion needs. Will definitely order again!",
    product: "Evening Collection",
    date: "2 weeks ago",
    verified: true,
  },
]

const geographicData = [
  { region: "Doha", customers: 3245, percentage: 51, revenue: "QAR 1.2M" },
  { region: "Al Rayyan", customers: 1876, percentage: 29, revenue: "QAR 680K" },
  { region: "Al Wakrah", customers: 892, percentage: 14, revenue: "QAR 320K" },
  { region: "Other Areas", customers: 358, percentage: 6, revenue: "QAR 125K" },
]

export default function CustomerInsightsPage() {
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Customer Insights</h1>
                <p className="text-gray-600">Understand your customers better</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <Tabs defaultValue="segments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="segments" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Customer Segments
              </TabsTrigger>
              <TabsTrigger value="behavior" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Behavior
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Feedback
              </TabsTrigger>
              <TabsTrigger
                value="geography"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Geography
              </TabsTrigger>
            </TabsList>

            <TabsContent value="segments">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-6">Customer Segments</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {customerSegments.map((segment) => (
                        <div
                          key={segment.id}
                          className={`p-4 rounded-xl bg-gradient-to-br ${segment.color} text-white cursor-pointer transition-transform hover:scale-105`}
                          onClick={() => setSelectedSegment(segment)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{segment.name}</h4>
                            <Badge className="bg-white/20 text-white">{segment.growth}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm opacity-90">Customers</span>
                              <span className="font-medium">{segment.count.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm opacity-90">Avg. Spend</span>
                              <span className="font-medium">{segment.avgSpend}</span>
                            </div>
                            <Progress value={segment.percentage} className="h-2 bg-white/20" />
                            <div className="text-xs opacity-75">{segment.percentage}% of total customers</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Segment Details</h3>
                    {selectedSegment ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                          <h4 className="font-medium text-[#003153] mb-2">{selectedSegment.name}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Customers</span>
                              <span className="font-medium">{selectedSegment.count.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Average Spend</span>
                              <span className="font-medium">{selectedSegment.avgSpend}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Growth Rate</span>
                              <span className="font-medium text-green-600">{selectedSegment.growth}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-[#003153] mb-2">Top Products</h5>
                          <div className="space-y-1">
                            {selectedSegment.topProducts.map((product, index) => (
                              <div key={index} className="text-sm text-gray-600 flex items-center">
                                <div className="w-2 h-2 bg-[#00A388] rounded-full mr-2" />
                                {product}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a segment to view details</p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Behavior Metrics</h3>
                  <div className="space-y-4">
                    {behaviorData.map((metric, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[#003153]">{metric.metric}</p>
                          <p className="text-2xl font-bold text-[#003153] mt-1">{metric.value}</p>
                        </div>
                        <div
                          className={`flex items-center text-sm font-medium ${
                            metric.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <TrendingUp className={`w-4 h-4 mr-1 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Shopping Patterns</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Peak Shopping Hours</span>
                        <Clock className="w-4 h-4 text-[#00A388]" />
                      </div>
                      <p className="text-lg font-bold text-[#003153]">2:00 PM - 6:00 PM</p>
                      <p className="text-xs text-gray-600">68% of daily traffic</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#F4BB3B]/10 to-[#F7C94D]/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Most Active Day</span>
                        <Calendar className="w-4 h-4 text-[#F4BB3B]" />
                      </div>
                      <p className="text-lg font-bold text-[#003153]">Thursday</p>
                      <p className="text-xs text-gray-600">32% higher than average</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#EF6950]/10 to-[#F28B7A]/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Average Cart Value</span>
                        <DollarSign className="w-4 h-4 text-[#EF6950]" />
                      </div>
                      <p className="text-lg font-bold text-[#003153]">QAR 285</p>
                      <p className="text-xs text-gray-600">+15% from last month</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="feedback">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Customer Feedback</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-[#003153]">4.8</span>
                      <span className="text-sm text-gray-600">(2,847 reviews)</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                    >
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {customerFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center text-white font-medium">
                            {feedback.customer.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-[#003153]">{feedback.customer}</p>
                              {feedback.verified && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <UserCheck className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{feedback.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">{feedback.comment}</p>
                      <p className="text-sm text-[#00A388] font-medium">Product: {feedback.product}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="geography">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Geographic Distribution</h3>
                  <div className="space-y-4">
                    {geographicData.map((region, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-[#00A388]" />
                            <span className="font-medium text-[#003153]">{region.region}</span>
                          </div>
                          <span className="text-sm font-medium text-[#00A388]">{region.percentage}%</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Customers: {region.customers.toLocaleString()}</span>
                          <span className="text-sm font-medium text-[#003153]">{region.revenue}</span>
                        </div>
                        <Progress value={region.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Regional Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                      <h4 className="font-medium text-[#003153] mb-2">Top Performing Region</h4>
                      <p className="text-lg font-bold text-[#003153]">Doha</p>
                      <p className="text-sm text-gray-600">51% of total customers • QAR 1.2M revenue</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#F4BB3B]/10 to-[#F7C94D]/10 rounded-lg">
                      <h4 className="font-medium text-[#003153] mb-2">Fastest Growing</h4>
                      <p className="text-lg font-bold text-[#003153]">Al Wakrah</p>
                      <p className="text-sm text-gray-600">+28% growth in last quarter</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#EF6950]/10 to-[#F28B7A]/10 rounded-lg">
                      <h4 className="font-medium text-[#003153] mb-2">Highest AOV</h4>
                      <p className="text-lg font-bold text-[#003153]">Al Rayyan</p>
                      <p className="text-sm text-gray-600">QAR 362 average order value</p>
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
