"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Package,
  MessageSquare,
  Settings,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  HelpCircle,
  Sparkles,
  Brain,
  Mail,
  Eye,
  Shield,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleSwitcher } from "@/components/role-switcher"

const dashboardItems = [
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    url: "/vendor/inventory",
    icon: Package,
  },
  {
    title: "Messages",
    url: "/vendor/messages",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Analytics",
    url: "/vendor/analytics",
    icon: TrendingUp,
  },
  {
    title: "Marketing",
    url: "/vendor/marketing",
    icon: DollarSign,
  },
]

const aiItems = [
  {
    title: "AI Assistant",
    url: "/vendor/ai-assistant",
    icon: Brain,
  },
  {
    title: "Content Creator",
    url: "/vendor/content-creator",
    icon: Sparkles,
  },
  {
    title: "Customer Insights",
    url: "/vendor/customer-insights",
    icon: Eye,
  },
  {
    title: "Email Automation",
    url: "/vendor/email-automation",
    icon: Mail,
  },
]

const supportItems = [
  {
    title: "Documentation",
    url: "/vendor/docs",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/vendor/settings",
    icon: Settings,
  },
  {
    title: "Help Center",
    url: "/vendor/help",
    icon: HelpCircle,
  },
]

export function VendorSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <Sidebar className="border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <SidebarHeader className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Labees Pro
              </div>
              <div className="text-xs text-slate-600 font-medium">Vendor Dashboard</div>
            </div>
          </div>
          <RoleSwitcher />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold text-sm mb-3">Business</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-gray-100 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-slate-700" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <div className="ml-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          {item.badge}
                        </div>
                      )}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-slate-400/20 to-gray-400/20 transform transition-transform duration-300 ${
                          hoveredItem === item.title ? "translate-x-0" : "-translate-x-full"
                        }`}
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold text-sm mb-3 flex items-center space-x-2">
            <Brain className="w-4 h-4 text-blue-500" />
            <span>AI Features</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-blue-700" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 transform transition-transform duration-300 ${
                          hoveredItem === item.title ? "translate-x-0" : "-translate-x-full"
                        }`}
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-semibold text-sm mb-3">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-green-700" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 transform transition-transform duration-300 ${
                          hoveredItem === item.title ? "translate-x-0" : "-translate-x-full"
                        }`}
                      />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex-1" />
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 bg-white/90 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-gray-100 hover:shadow-lg hover:scale-105 px-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Boutique Qatar</div>
                  <div className="text-xs text-slate-600">Business Account</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 to-gray-400/10 transform transition-transform duration-300 group-hover:translate-x-0 -translate-x-full" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
