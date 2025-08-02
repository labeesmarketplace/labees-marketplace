"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Eye,
  ShoppingCart,
  Heart,
  Download,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Clock,
  MapPin,
  Zap,
} from "lucide-react"

const performanceMetrics = [
  {
    title: "Total Revenue",
    value: "QAR 45,280",
    change: "+18.2%",
    trend: "up",
    icon: TrendingUp,
    period: "vs last month",
  },
  {
    title: "Product Views",
    value: "12,847",
    change: "+24.1%",
    trend: "up",
    icon: Eye,
    period: "this month",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    change: "+0.5%",
    trend: "up",
    icon: ShoppingCart,
    period: "vs last month",
  },
  {
    title: "AI Try-On Rate",
    value: "67%",
    change: "+12%",
    trend: "up",
    icon: Sparkles,
    period: "engagement",
  },
]

const topProducts = [
  {
    id: 1,
    name: "Modest Blazer Collection",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
    views: 2847,
    sales: 89,
    revenue: "QAR 16,020",
    conversionRate: 3.1,
    aiTryOns: 1892,
  },
  {
    id: 2,
    name: "Silk Hijab Premium",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=100&fit=crop",
    views: 1923,
    sales: 156,
    revenue: "QAR 7,020",
    conversionRate: 8.1,
    aiTryOns: 1245,
  },
  {
    id: 3,
    name: "Wide-leg Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
    views: 1654,
    sales: 67,
    revenue: "QAR 8,040",
    conversionRate: 4.1,
    aiTryOns: 987,
  },
]

const customerInsights = [
  {
    demographic: "Age 25-34",
    percentage: 42,
    revenue: "QAR 18,920",
    topCategory: "Professional Wear",
  },
  {
    demographic: "Age 18-24",
    percentage: 28,
    revenue: "QAR 12,680",
    topCategory: "Casual Modest",
  },
  {
    demographic: "Age 35-44",
    percentage: 22,
    revenue: "QAR 10,240",
    topCategory: "Premium Abayas",
  },
  {
    demographic: "Age 45+",
    percentage: 8,
    revenue: "QAR 3,440",
    topCategory: "Traditional Wear",
  },
]

const geographicData = [
  { country: "Qatar", sales: 156, revenue: "QAR 18,720", percentage: 41 },
  { country: "UAE", sales: 89, revenue: "QAR 12,340", percentage: 27 },
  { country: "Saudi Arabia", sales: 67, revenue: "QAR 9,680", percentage: 21 },
  { country: "Kuwait", sales: 23, revenue: "QAR 4,540", percentage: 11 },
]

export default function VendorAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-[#FAF8F4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive insights into your business performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {performanceMetrics.map((metric) => (
              <Card key={metric.title} className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-8 h-8 text-[#003153]" />
                  <div
                    className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#003153] mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.period}</div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#003153]">Revenue Trend</h3>
                    <Badge className="ai-badge">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18.2%
                    </Badge>
                  </div>
                  <div className="h-64 bg-gradient-to-t from-[#00A388]/20 to-transparent rounded-lg flex items-end justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#003153] mb-2">QAR 45,280</div>
                        <div className="text-sm text-gray-600">Total Revenue (30 days)</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI Performance */}
                <Card className="p-6 card-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#003153]">AI Try-On Performance</h3>
                    <Badge className="ai-badge">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Powered
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Try-On Engagement</span>
                      <span className="font-bold text-[#003153]">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#00A388] h-2 rounded-full" style={{ width: "67%" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#00A388]">4,124</div>
                        <div className="text-xs text-gray-600">Total Try-Ons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F4BB3B]">2.8x</div>
                        <div className="text-xs text-gray-600">Conversion Boost</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6 card-shadow">
                <h3 className="text-lg font-semibold text-[#003153] mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-[#00A388]/5 rounded-lg">
                    <div className="w-2 h-2 bg-[#00A388] rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#003153]">New order from Aisha K.</p>
                      <p className="text-xs text-gray-600">Modest Blazer Collection - QAR 180 • 5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-[#F4BB3B]/5 rounded-lg">
                    <div className="w-2 h-2 bg-[#F4BB3B] rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#003153]">Product featured in AI recommendations</p>
                      <p className="text-xs text-gray-600">Silk Hijab Premium - 89% match rate • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-[#003153]/5 rounded-lg">
                    <div className="w-2 h-2 bg-[#003153] rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#003153]">5-star review received</p>
                      <p className="text-xs text-gray-600">Wide-leg Trousers - "Perfect fit!" • 3 hours ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="p-6 card-shadow">
                <h3 className="text-lg font-semibold text-[#003153] mb-4">Top Performing Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-[#003153]">Product</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Views</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Sales</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Revenue</th>
                        <th className="text-left p-4 font-medium text-[#003153]">Conversion</th>
                        <th className="text-left p-4 font-medium text-[#003153]">AI Try-Ons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <span className="font-medium text-[#003153]">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{product.views.toLocaleString()}</td>
                          <td className="p-4">{product.sales}</td>
                          <td className="p-4 font-bold text-[#003153]">{product.revenue}</td>
                          <td className="p-4">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              {product.conversionRate}%
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-4 h-4 text-[#00A388]" />
                              <span>{product.aiTryOns}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow">
                  <h3 className="text-lg font-semibold text-[#003153] mb-4">Customer Demographics</h3>
                  <div className="space-y-4">
                    {customerInsights.map((insight, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[#003153]">{insight.demographic}</span>
                          <span className="text-sm text-gray-600">{insight.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#00A388] h-2 rounded-full" style={{ width: `${insight.percentage}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{insight.revenue}</span>
                          <span>{insight.topCategory}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 card-shadow">
                  <h3 className="text-lg font-semibold text-[#003153] mb-4">Customer Behavior</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#00A388]/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-[#00A388]" />
                        <span className="text-sm font-medium">Avg. Session Time</span>
                      </div>
                      <span className="font-bold text-[#003153]">4m 32s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#F4BB3B]/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-[#F4BB3B]" />
                        <span className="text-sm font-medium">Pages per Session</span>
                      </div>
                      <span className="font-bold text-[#003153]">3.2</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#003153]/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-[#003153]" />
                        <span className="text-sm font-medium">Return Rate</span>
                      </div>
                      <span className="font-bold text-[#003153]">68%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="geography" className="space-y-6">
              <Card className="p-6 card-shadow">
                <h3 className="text-lg font-semibold text-[#003153] mb-4">Sales by Country</h3>
                <div className="space-y-4">
                  {geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-[#00A388]" />
                        <div>
                          <p className="font-medium text-[#003153]">{country.country}</p>
                          <p className="text-sm text-gray-600">{country.sales} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#003153]">{country.revenue}</p>
                        <p className="text-sm text-gray-600">{country.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-[#00A388]/5 border-[#00A388]/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge className="ai-badge">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Recommendation
                    </Badge>
                    <h3 className="font-semibold text-[#003153]">Inventory Optimization</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Based on current trends and customer behavior, consider increasing inventory for:
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm font-medium">Modest Blazers (Size M)</span>
                      <Badge className="bg-green-100 text-green-700">High Demand</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm font-medium">Silk Hijabs (Navy)</span>
                      <Badge className="bg-yellow-100 text-yellow-700">Trending</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-[#F4BB3B]/5 border-[#F4BB3B]/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge className="bg-[#F4BB3B] text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Trend Alert
                    </Badge>
                    <h3 className="font-semibold text-[#003153]">Market Opportunity</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Earth tone colors are trending +45% in the modest fashion market. Consider expanding your palette.
                  </p>
                  <Button className="w-full bg-[#F4BB3B] hover:bg-[#F4BB3B]/90 text-white">View Trend Report</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
