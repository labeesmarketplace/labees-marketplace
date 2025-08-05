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
  Home,
  Heart,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  User,
  Crown,
  Gift,
  Camera,
  Users,
  Zap,
  Star,
  Compass,
  Palette,
  TrendingUp,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RoleSwitcher } from "@/components/role-switcher"

const mainItems = [
  {
    title: "Discover",
    url: "/home",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
    badge: "3",
  },
  {
    title: "AI Try-On",
    url: "/ai-tryon",
    icon: Camera,
  },
  {
    title: "Browse Brands",
    url: "/brands",
    icon: Compass,
  },
  {
    title: "Wishlist",
    url: "/wishlist",
    icon: Heart,
  },
  {
    title: "My Orders",
    url: "/orders",
    icon: ShoppingBag,
  },
]

const socialItems = [
  {
    title: "Style Community",
    url: "/community",
    icon: Users,
  },
  {
    title: "Chat with Brands",
    url: "/brand-chat",
    icon: MessageCircle,
  },
  {
    title: "Style Challenges",
    url: "/challenges",
    icon: Star,
  },
  {
    title: "Trend Alerts",
    url: "/trends",
    icon: TrendingUp,
  },
]

const personalItems = [
  {
    title: "Style Profile",
    url: "/style-profile",
    icon: Palette,
  },
  {
    title: "Rewards",
    url: "/rewards",
    icon: Gift,
  },
  {
    title: "VIP Club",
    url: "/vip",
    icon: Crown,
  },
]

export function CustomerSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <Sidebar className="border-r border-[#063A5B]/20 bg-gradient-to-b from-[#063A5B]/10 to-white">
      <SidebarHeader className="border-b border-[#063A5B]/20 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#063A5B] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                <Bell className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg text-[#063A5B]">
                Labees
              </div>
              <div className="text-xs text-[#063A5B]/80 font-medium">Your Style Journey</div>
            </div>
          </div>
          <RoleSwitcher />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#063A5B] font-semibold text-sm mb-3">Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-[#063A5B]/10 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-[#063A5B] text-white shadow-lg"
                            : "bg-[#063A5B]/10 text-[#063A5B]"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-[#063A5B]" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <div className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                          {item.badge}
                        </div>
                      )}
                      <div
                        className={`absolute inset-0 bg-[#063A5B]/20 transform transition-transform duration-300 ${
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
          <SidebarGroupLabel className="text-[#063A5B] font-semibold text-sm mb-3 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#063A5B]" />
            <span>Social & Connect</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {socialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-[#063A5B]/10 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-[#063A5B] text-white shadow-lg"
                            : "bg-[#063A5B]/10 text-[#063A5B]"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-[#063A5B]" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`absolute inset-0 bg-[#063A5B]/20 transform transition-transform duration-300 ${
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
          <SidebarGroupLabel className="text-[#063A5B] font-semibold text-sm mb-3">Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {personalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-[#063A5B]/10 hover:shadow-md hover:scale-105"
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link href={item.url} className="flex items-center space-x-3 px-3 py-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          hoveredItem === item.title
                            ? "bg-[#063A5B] text-white shadow-lg"
                            : "bg-[#063A5B]/10 text-[#063A5B]"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          hoveredItem === item.title ? "text-[#063A5B]" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div
                        className={`absolute inset-0 bg-[#063A5B]/20 transform transition-transform duration-300 ${
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

      <SidebarFooter className="border-t border-[#063A5B]/20 bg-white/80 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-[#063A5B]/10 hover:shadow-lg hover:scale-105 px-4 py-4 p-0">
              <Link href="/profile" className="flex items-center space-x-4 bg-[#063A5B]/10 rounded-lg p-2 w-full no-underline hover:no-underline focus:no-underline">
                <div className="relative">
                  <div className="w-8 h-8 bg-[#063A5B] rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-semibold text-gray-800 leading-tight">Aisha Mohammed</div>
                  <div className="text-xs text-[#063A5B] leading-tight">Premium Member</div>
                </div>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 transform transition-transform duration-300 group-hover:translate-x-0 -translate-x-full" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
