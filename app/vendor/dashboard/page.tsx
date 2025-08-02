"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Package,
  RotateCcw,
  Eye,
  Sparkles,
  AlertTriangle,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

const kpis = [
  {
    title: "Today's Sales",
    value: "QAR 2,340",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Live Visitors",
    value: "47",
    change: "+8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Stock Alerts",
    value: "3",
    change: "2 new",
    trend: "alert",
    icon: Package,
  },
  {
    title: "Return Rate",
    value: "2.1%",
    change: "-0.5%",
    trend: "down",
    icon: RotateCcw,
  },
]

const alerts = [
  {
    type: "stock",
    message: "Modest Blazer (Size M) - Only 2 left",
    priority: "high",
  },
  {
    type: "order",
    message: "5 orders pending courier pickup",
    priority: "medium",
  },
  {
    type: "review",
    message: "New 5-star review on Silk Hijab",
    priority: "low",
  },
]

export default function VendorDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-[#FAF8F4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Bint Al-Qamar</p>
              </div>
            </div>
            <Badge className="ai-badge">
              <Sparkles className="w-3 h-3 mr-1" />
              Try-On Engagement 74%
            </Badge>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {kpis.map((kpi) => (
              <Card key={kpi.title} className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <kpi.icon className="w-8 h-8 text-[#003153]" />
                  <div
                    className={`flex items-center text-sm ${
                      kpi.trend === "up" ? "text-[#00A388]" : kpi.trend === "down" ? "text-[#00A388]" : "text-[#EF6950]"
                    }`}
                  >
                    {kpi.trend === "up" && <ArrowUp className="w-4 h-4 mr-1" />}
                    {kpi.trend === "down" && <ArrowDown className="w-4 h-4 mr-1" />}
                    {kpi.trend === "alert" && <AlertTriangle className="w-4 h-4 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#003153] mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.title}</div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* AI Insights */}
            <div className="lg:col-span-2">
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#003153]">AI Insights</h3>
                  <Badge className="ai-badge">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Updated 5m ago
                  </Badge>
                </div>
                <div className="bg-[#00A388]/5 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-[#003153] mb-2">Trending Alert</h4>
                  <p className="text-sm text-gray-700">
                    Red satin abayas are trending +42% in views vs. last week. Consider increasing inventory or creating
                    similar styles.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-[#003153]">Modest Blazer</p>
                      <p className="text-sm text-gray-600">87% try-on to purchase rate</p>
                    </div>
                    <Badge variant="secondary" className="bg-[#00A388]/10 text-[#00A388]">
                      Top Performer
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-[#003153]">Silk Hijab Collection</p>
                      <p className="text-sm text-gray-600">High engagement, low conversion</p>
                    </div>
                    <Badge variant="secondary" className="bg-[#F4BB3B]/10 text-[#F4BB3B]">
                      Optimize Pricing
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Alerts & Tasks */}
            <div>
              <Card className="p-6 card-shadow">
                <h3 className="text-lg font-semibold text-[#003153] mb-4">Action Items</h3>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.priority === "high"
                          ? "border-[#EF6950] bg-[#EF6950]/5"
                          : alert.priority === "medium"
                            ? "border-[#F4BB3B] bg-[#F4BB3B]/5"
                            : "border-[#00A388] bg-[#00A388]/5"
                      }`}
                    >
                      <p className="text-sm font-medium text-[#003153]">{alert.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-xs">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 card-shadow mt-6">
                <h3 className="text-lg font-semibold text-[#003153] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Campaign
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Upgrade Banner */}
          <Card className="mt-6 p-6 card-shadow bg-gradient-to-r from-[#003153] to-[#00A388] text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Upgrade to Pro+</h3>
                <p className="text-white/80 mb-4">
                  Unlock advanced AI insights, forecasting, and automated lookbook generation
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Forecasting
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Advanced Analytics
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">QAR 1,100</div>
                <div className="text-white/80 text-sm mb-3">/month</div>
                <Button variant="secondary">Upgrade Now</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  )
}
