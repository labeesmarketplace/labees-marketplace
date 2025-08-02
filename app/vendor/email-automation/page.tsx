"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Send,
  Users,
  TrendingUp,
  Eye,
  MousePointer,
  Zap,
  Play,
  Pause,
  Settings,
  Plus,
  Target,
  BarChart3,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const campaigns = [
  {
    id: 1,
    name: "New Collection Launch",
    status: "Active",
    type: "Newsletter",
    sent: 2847,
    opened: 1923,
    clicked: 456,
    revenue: "QAR 12,450",
    date: "Dec 10, 2024",
    openRate: 67.5,
    clickRate: 16.0,
  },
  {
    id: 2,
    name: "Winter Sale Announcement",
    status: "Scheduled",
    type: "Promotional",
    sent: 0,
    opened: 0,
    clicked: 0,
    revenue: "QAR 0",
    date: "Dec 15, 2024",
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 3,
    name: "Customer Feedback Request",
    status: "Completed",
    type: "Survey",
    sent: 1456,
    opened: 1089,
    clicked: 234,
    revenue: "QAR 0",
    date: "Dec 5, 2024",
    openRate: 74.8,
    clickRate: 16.1,
  },
]

const automationFlows = [
  {
    id: 1,
    name: "Welcome Series",
    trigger: "New Subscriber",
    emails: 3,
    active: true,
    subscribers: 1247,
    openRate: 78.5,
    conversionRate: 12.3,
    revenue: "QAR 8,950",
  },
  {
    id: 2,
    name: "Abandoned Cart Recovery",
    trigger: "Cart Abandonment",
    emails: 2,
    active: true,
    subscribers: 892,
    openRate: 65.2,
    conversionRate: 28.7,
    revenue: "QAR 15,680",
  },
  {
    id: 3,
    name: "Win-Back Campaign",
    trigger: "Inactive 60 days",
    emails: 4,
    active: false,
    subscribers: 456,
    openRate: 45.8,
    conversionRate: 8.9,
    revenue: "QAR 3,240",
  },
]

const emailTemplates = [
  {
    id: 1,
    name: "Product Launch",
    category: "Newsletter",
    thumbnail: "/placeholder.svg?height=150&width=200&text=Product+Launch",
    usage: 23,
  },
  {
    id: 2,
    name: "Sale Announcement",
    category: "Promotional",
    thumbnail: "/placeholder.svg?height=150&width=200&text=Sale+Announcement",
    usage: 18,
  },
  {
    id: 3,
    name: "Welcome Email",
    category: "Onboarding",
    thumbnail: "/placeholder.svg?height=150&width=200&text=Welcome+Email",
    usage: 45,
  },
  {
    id: 4,
    name: "Order Confirmation",
    category: "Transactional",
    thumbnail: "/placeholder.svg?height=150&width=200&text=Order+Confirmation",
    usage: 156,
  },
]

export default function EmailAutomationPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false)
  const { toast } = useToast()

  const handleCreateCampaign = () => {
    setIsCreatingCampaign(true)
    setTimeout(() => {
      setIsCreatingCampaign(false)
      toast({
        title: "Campaign Created! 📧",
        description: "Your email campaign has been set up successfully",
      })
    }, 2000)
  }

  const toggleAutomation = (flowId) => {
    toast({
      title: "Automation Updated! ⚡",
      description: "Your automation flow has been updated",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Email Automation</h1>
                <p className="text-gray-600">Automate your email marketing campaigns</p>
              </div>
            </div>
            <Button
              onClick={handleCreateCampaign}
              disabled={isCreatingCampaign}
              className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
            >
              {isCreatingCampaign ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger
                value="campaigns"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Campaigns
              </TabsTrigger>
              <TabsTrigger
                value="automation"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Automation
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Templates
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#003153]">Email Campaigns</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700">3 Active</Badge>
                        <Badge className="bg-blue-100 text-blue-700">1 Scheduled</Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {campaigns.map((campaign) => (
                        <div
                          key={campaign.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium text-[#003153]">{campaign.name}</h4>
                              <Badge
                                className={`${
                                  campaign.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : campaign.status === "Scheduled"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {campaign.status}
                              </Badge>
                              <Badge variant="outline">{campaign.type}</Badge>
                            </div>
                            <span className="text-sm text-gray-600">{campaign.date}</span>
                          </div>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <Send className="w-3 h-3 mr-1" />
                                Sent
                              </div>
                              <div className="font-medium text-[#003153]">{campaign.sent.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <Eye className="w-3 h-3 mr-1" />
                                Opened
                              </div>
                              <div className="font-medium text-[#003153]">
                                {campaign.opened.toLocaleString()} ({campaign.openRate}%)
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <MousePointer className="w-3 h-3 mr-1" />
                                Clicked
                              </div>
                              <div className="font-medium text-[#003153]">
                                {campaign.clicked.toLocaleString()} ({campaign.clickRate}%)
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Revenue
                              </div>
                              <div className="font-medium text-[#00A388]">{campaign.revenue}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Campaign Performance</h3>
                    {selectedCampaign ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                          <h4 className="font-medium text-[#003153] mb-2">{selectedCampaign.name}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status</span>
                              <Badge
                                className={`${
                                  selectedCampaign.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : selectedCampaign.status === "Scheduled"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {selectedCampaign.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Open Rate</span>
                              <span className="font-medium">{selectedCampaign.openRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Click Rate</span>
                              <span className="font-medium">{selectedCampaign.clickRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Revenue</span>
                              <span className="font-medium text-[#00A388]">{selectedCampaign.revenue}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button size="sm" className="w-full bg-[#003153] hover:bg-[#004A73]">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                          >
                            <Settings className="w-4 h-4 mr-1" />
                            Edit Campaign
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a campaign to view details</p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Automation Flows</h3>
                  <Button className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                    <Zap className="w-4 h-4 mr-2" />
                    Create Automation
                  </Button>
                </div>

                <div className="space-y-4">
                  {automationFlows.map((flow) => (
                    <div
                      key={flow.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-[#003153]">{flow.name}</h4>
                          <Badge variant="outline">{flow.trigger}</Badge>
                          <Badge
                            className={`${flow.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                          >
                            {flow.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAutomation(flow.id)}
                          className={`${flow.active ? "border-red-300 text-red-600 hover:bg-red-50" : "border-green-300 text-green-600 hover:bg-green-50"}`}
                        >
                          {flow.active ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                          {flow.active ? "Pause" : "Activate"}
                        </Button>
                      </div>

                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Emails</div>
                          <div className="font-medium text-[#003153]">{flow.emails}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Subscribers</div>
                          <div className="font-medium text-[#003153]">{flow.subscribers.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Open Rate</div>
                          <div className="font-medium text-[#003153]">{flow.openRate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Conversion</div>
                          <div className="font-medium text-[#003153]">{flow.conversionRate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Revenue</div>
                          <div className="font-medium text-[#00A388]">{flow.revenue}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Email Templates</h3>
                  <Button className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="group cursor-pointer">
                      <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#00A388]/30 transition-colors">
                        <img
                          src={template.thumbnail || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-medium text-[#003153] mb-1">{template.name}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <Badge variant="outline">{template.category}</Badge>
                            <span className="text-gray-600">{template.usage} uses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Email Performance</h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#003153]">68.5%</div>
                      <div className="text-sm text-gray-600">Average Open Rate</div>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +5.2%
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#F4BB3B]/10 to-[#F7C94D]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#003153]">16.8%</div>
                      <div className="text-sm text-gray-600">Average Click Rate</div>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +2.1%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Newsletter Campaigns</span>
                      <span className="text-sm font-medium text-[#003153]">72% open rate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Promotional Emails</span>
                      <span className="text-sm font-medium text-[#003153]">58% open rate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Automated Flows</span>
                      <span className="text-sm font-medium text-[#003153]">75% open rate</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#003153] mb-6">Revenue Attribution</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-[#00A388]/5 to-[#00C4A7]/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Total Email Revenue</span>
                        <BarChart3 className="w-4 h-4 text-[#00A388]" />
                      </div>
                      <p className="text-2xl font-bold text-[#003153]">QAR 47,320</p>
                      <p className="text-xs text-gray-600">This month</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#F4BB3B]/5 to-[#F7C94D]/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Revenue per Email</span>
                        <Target className="w-4 h-4 text-[#F4BB3B]" />
                      </div>
                      <p className="text-2xl font-bold text-[#003153]">QAR 8.45</p>
                      <p className="text-xs text-gray-600">+12% from last month</p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#EF6950]/5 to-[#F28B7A]/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#003153]">Customer Lifetime Value</span>
                        <Users className="w-4 h-4 text-[#EF6950]" />
                      </div>
                      <p className="text-2xl font-bold text-[#003153]">QAR 285</p>
                      <p className="text-xs text-gray-600">From email subscribers</p>
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
