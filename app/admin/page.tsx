"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Store, UserPlus, Sparkles, Activity, Zap, AlertTriangle, CheckCircle } from "lucide-react"

const globalKPIs = [
  {
    title: "Total GMV",
    value: "QAR 2.4M",
    change: "+18%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Active Orders",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Active Vendors",
    value: "523",
    change: "+8%",
    trend: "up",
    icon: Store,
  },
  {
    title: "Waitlist Growth",
    value: "12,340",
    change: "+156%",
    trend: "up",
    icon: UserPlus,
  },
]

const aiMetrics = [
  {
    metric: "Queue Length",
    value: "47",
    status: "normal",
    description: "Try-on requests in queue",
  },
  {
    metric: "Avg Render Time",
    value: "2.3s",
    status: "good",
    description: "Average AI processing time",
  },
  {
    metric: "GPU Utilization",
    value: "68%",
    status: "normal",
    description: "Current GPU usage",
  },
  {
    metric: "Success Rate",
    value: "99.2%",
    status: "excellent",
    description: "AI generation success rate",
  },
]

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-[#FAF8F4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Admin Dashboard</h1>
                <p className="text-gray-600">System overview and management</p>
              </div>
            </div>
            <Badge className="ai-badge">
              <Sparkles className="w-3 h-3 mr-1" />
              System Healthy
            </Badge>
          </div>

          {/* Global KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {globalKPIs.map((kpi) => (
              <Card key={kpi.title} className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <kpi.icon className="w-8 h-8 text-[#003153]" />
                  <div className="flex items-center text-sm text-[#00A388]">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {kpi.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#003153] mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.title}</div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Operations Monitor */}
            <Card className="p-6 card-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#003153]">AI Operations</h3>
                <Badge className="ai-badge">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>

              <div className="space-y-6">
                {aiMetrics.map((metric) => (
                  <div key={metric.metric}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#003153]">{metric.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">{metric.value}</span>
                        {metric.status === "excellent" && <CheckCircle className="w-4 h-4 text-[#00A388]" />}
                        {metric.status === "good" && <CheckCircle className="w-4 h-4 text-[#00A388]" />}
                        {metric.status === "normal" && <Activity className="w-4 h-4 text-[#F4BB3B]" />}
                        {metric.status === "warning" && <AlertTriangle className="w-4 h-4 text-[#EF6950]" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{metric.description}</p>
                    {metric.metric === "GPU Utilization" && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            Number.parseInt(metric.value) > 85
                              ? "bg-[#EF6950]"
                              : Number.parseInt(metric.value) > 70
                                ? "bg-[#F4BB3B]"
                                : "bg-[#00A388]"
                          }`}
                          style={{ width: metric.value }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* GPU Scale Alert */}
              <div className="mt-6 p-4 bg-[#F4BB3B]/10 border border-[#F4BB3B]/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-[#F4BB3B]" />
                    <span className="font-medium text-[#003153]">Scale Recommendation</span>
                  </div>
                  <button className="px-3 py-1 bg-[#F4BB3B] text-white rounded-lg text-sm font-medium hover:bg-[#F4BB3B]/90">
                    Scale Node
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  GPU usage approaching 70%. Consider scaling for optimal performance.
                </p>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 card-shadow">
              <h3 className="text-lg font-semibold text-[#003153] mb-6">System Activity</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00A388] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#003153]">New vendor approved</p>
                    <p className="text-xs text-gray-600">Desert Bloom Fashion - 2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F4BB3B] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#003153]">High traffic detected</p>
                    <p className="text-xs text-gray-600">Try-on requests +45% - 5 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#003153] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#003153]">System backup completed</p>
                    <p className="text-xs text-gray-600">All data secured - 15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00A388] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#003153]">AI model updated</p>
                    <p className="text-xs text-gray-600">Try-on accuracy improved to 98.2% - 1 hour ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <Card className="p-6 card-shadow">
              <h4 className="font-semibold text-[#003153] mb-4">Daily Orders</h4>
              <div className="h-32 bg-gradient-to-t from-[#00A388]/20 to-transparent rounded-lg flex items-end justify-center">
                <div className="text-2xl font-bold text-[#003153]">1,247</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">+12% from yesterday</p>
            </Card>

            <Card className="p-6 card-shadow">
              <h4 className="font-semibold text-[#003153] mb-4">AI Try-Ons</h4>
              <div className="h-32 bg-gradient-to-t from-[#F4BB3B]/20 to-transparent rounded-lg flex items-end justify-center">
                <div className="text-2xl font-bold text-[#003153]">3,892</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">+28% from yesterday</p>
            </Card>

            <Card className="p-6 card-shadow">
              <h4 className="font-semibold text-[#003153] mb-4">Revenue</h4>
              <div className="h-32 bg-gradient-to-t from-[#003153]/20 to-transparent rounded-lg flex items-end justify-center">
                <div className="text-2xl font-bold text-[#003153]">QAR 89K</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">+18% from yesterday</p>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
