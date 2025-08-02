"use client"

import { useState, useRef, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Sparkles,
  ShoppingBag,
  Heart,
  ImageIcon,
  Smile,
  Paperclip,
  Store,
  Users,
  Bot,
  Crown,
  Package,
  Star,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Gift,
  TrendingUp,
  Camera,
  Mic,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Different user types for dynamic content
type UserType = "customer" | "vendor" | "vip_customer"
type ConversationType = "customer_to_vendor" | "vendor_to_customer" | "ai_assistant" | "customer_support"

interface Product {
  id: string
  name: string
  price: string
  image: string
  match: string
}

interface Message {
  id: string
  type: "sent" | "received"
  content: string
  timestamp: string
  sender?: string
  isAI?: boolean
  products?: Product[]
  vipBadge?: boolean
}

interface Conversation {
  id: string
  type: ConversationType
  brandName: string
  brandLogo: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  verified: boolean
  userType: string
  context: string
}

// Dynamic conversation data based on user types
const getConversationsForUserType = (userType: UserType): Conversation[] => {
  const baseConversations: Record<UserType, Conversation[]> = {
    customer: [
      {
        id: "1",
        type: "customer_to_vendor",
        brandName: "Noor Collection",
        brandLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Your order is ready for pickup! 📦",
        timestamp: "2m ago",
        unread: 2,
        online: true,
        verified: true,
        userType: "vendor",
        context: "order_update",
      },
      {
        id: "2",
        type: "ai_assistant",
        brandName: "Labees AI Stylist",
        brandLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
        lastMessage: "AI: Based on your style, I recommend...",
        timestamp: "1h ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "ai",
        context: "style_recommendation",
      },
      {
        id: "3",
        type: "customer_to_vendor",
        brandName: "Daily Modest",
        brandLogo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face",
        lastMessage: "New arrivals in your size! 👗",
        timestamp: "3h ago",
        unread: 1,
        online: false,
        verified: true,
        userType: "vendor",
        context: "product_notification",
      },
      {
        id: "4",
        type: "customer_support",
        brandName: "Labees Support",
        brandLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
        lastMessage: "How can we help you today?",
        timestamp: "1d ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "support",
        context: "customer_service",
      },
    ],
    vendor: [
      {
        id: "1",
        type: "vendor_to_customer",
        brandName: "Fatima Al-Zahra",
        brandLogo: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Thank you! When will my order arrive?",
        timestamp: "5m ago",
        unread: 1,
        online: true,
        verified: false,
        userType: "customer",
        context: "order_inquiry",
      },
      {
        id: "2",
        type: "vendor_to_customer",
        brandName: "Mariam Hassan",
        brandLogo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Do you have this in size M?",
        timestamp: "15m ago",
        unread: 0,
        online: false,
        verified: true,
        userType: "vip_customer",
        context: "product_inquiry",
      },
      {
        id: "3",
        type: "ai_assistant",
        brandName: "Vendor AI Assistant",
        brandLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
        lastMessage: "AI: Your sales analytics are ready",
        timestamp: "1h ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "ai",
        context: "business_analytics",
      },
      {
        id: "4",
        type: "customer_support",
        brandName: "Vendor Support",
        brandLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Your payout has been processed",
        timestamp: "2h ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "support",
        context: "payment_notification",
      },
    ],
    vip_customer: [
      {
        id: "1",
        type: "customer_to_vendor",
        brandName: "Luxury Atelier",
        brandLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Your VIP styling session is confirmed ✨",
        timestamp: "1m ago",
        unread: 1,
        online: true,
        verified: true,
        userType: "premium_vendor",
        context: "vip_service",
      },
      {
        id: "2",
        type: "ai_assistant",
        brandName: "VIP AI Concierge",
        brandLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face",
        lastMessage: "AI: Exclusive collection preview ready",
        timestamp: "30m ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "ai",
        context: "vip_recommendations",
      },
      {
        id: "3",
        type: "customer_to_vendor",
        brandName: "Personal Stylist Sarah",
        brandLogo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face",
        lastMessage: "Your wardrobe audit is complete! 👗",
        timestamp: "2h ago",
        unread: 0,
        online: true,
        verified: true,
        userType: "vendor",
        context: "personal_styling",
      },
    ],
  }

  return baseConversations[userType] || baseConversations.customer
}

// Dynamic messages based on conversation type and context
const getMessagesForConversation = (conversationType: ConversationType, context: string, userType: UserType): Message[] => {
  const messageTemplates: Record<ConversationType, Record<string, Message[]>> = {
    customer_to_vendor: {
      order_update: [
        {
          id: "1",
          type: "received",
          content: "Hi! Welcome to Noor Collection! 👋 Thank you for your recent order.",
          timestamp: "10:30 AM",
          sender: "Noor Collection",
          isAI: false,
        },
        {
          id: "2",
          type: "received",
          content: "Great news! Your order #NC-2024-001 has been processed and is ready for pickup at our Doha location. You can collect it anytime between 9 AM - 9 PM.",
          timestamp: "10:31 AM",
          sender: "Noor Collection",
          isAI: false,
        },
        {
          id: "3",
          type: "sent",
          content: "Perfect! What's the exact address? And do I need to bring anything specific?",
          timestamp: "10:35 AM",
        },
        {
          id: "4",
          type: "received",
          content: "📍 Address: Pearl Qatar, Building 15, Ground Floor\n\nPlease bring:\n✅ Order confirmation (SMS/Email)\n✅ Valid ID\n✅ Payment receipt\n\nOur team will have your items ready! 📦",
          timestamp: "10:36 AM",
          sender: "Noor Collection",
          isAI: false,
        },
      ],
      product_notification: [
        {
          id: "1",
          type: "received",
          content: "🌟 Exciting news! New arrivals just landed in your favorite size and style preferences!",
          timestamp: "2:15 PM",
          sender: "Daily Modest",
          isAI: false,
        },
        {
          id: "2",
          type: "received",
          content: "Based on your previous purchases, I think you'll love these new pieces! They match your modest and elegant style perfectly.",
          timestamp: "2:16 PM",
          sender: "AI Style Assistant",
          isAI: true,
          products: [
            {
              id: "p1",
              name: "Elegant Maxi Dress",
              price: "QAR 320",
              image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=120&fit=crop",
              match: "96%",
            },
            {
              id: "p2",
              name: "Modest Cardigan",
              price: "QAR 180",
              image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=120&fit=crop",
              match: "92%",
            },
          ],
        },
      ],
    },
    vendor_to_customer: {
      order_inquiry: [
        {
          id: "1",
          type: "sent",
          content: "Hello Fatima! Thank you for your order. Your items are being carefully prepared with extra attention to quality.",
          timestamp: "9:45 AM",
        },
        {
          id: "2",
          type: "received",
          content: "Thank you so much! I'm really excited about the pieces. When can I expect delivery?",
          timestamp: "9:50 AM",
          sender: "Fatima Al-Zahra",
          isAI: false,
        },
        {
          id: "3",
          type: "sent",
          content: "Your order will be ready for delivery by tomorrow evening. We offer same-day delivery in Doha for QAR 25, or free delivery within 2-3 days. Which would you prefer?",
          timestamp: "9:52 AM",
        },
        {
          id: "4",
          type: "received",
          content: "Same-day delivery sounds perfect! Can you deliver around 6 PM tomorrow?",
          timestamp: "9:55 AM",
          sender: "Fatima Al-Zahra",
          isAI: false,
        },
      ],
      product_inquiry: [
        {
          id: "1",
          type: "received",
          content: "Hi! I love the blue blazer in your latest collection. Do you have it available in size M?",
          timestamp: "11:20 AM",
          sender: "Mariam Hassan",
          isAI: false,
          vipBadge: true,
        },
        {
          id: "2",
          type: "sent",
          content: "Hello Mariam! As one of our VIP customers, I'm happy to check that for you personally. Yes, we do have the blue blazer in size M! 💙",
          timestamp: "11:22 AM",
        },
        {
          id: "3",
          type: "sent",
          content: "Since you're a VIP member, I can offer you:\n✨ 15% VIP discount\n📦 Free express shipping\n👗 Complimentary styling consultation\n\nWould you like me to reserve it for you?",
          timestamp: "11:23 AM",
        },
      ],
    },
    ai_assistant: {
      style_recommendation: [
        {
          id: "1",
          type: "received",
          content: "Hello! I'm your AI Style Assistant. I've analyzed your preferences and purchase history to create personalized recommendations just for you! ✨",
          timestamp: "3:00 PM",
          sender: "Labees AI Stylist",
          isAI: true,
        },
        {
          id: "2",
          type: "received",
          content: "Based on your love for modest fashion and professional wear, I've found some perfect matches for your upcoming work events:",
          timestamp: "3:01 PM",
          sender: "AI Style Assistant",
          isAI: true,
          products: [
            {
              id: "p1",
              name: "Professional Blazer Set",
              price: "QAR 450",
              image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=120&fit=crop",
              match: "98%",
            },
            {
              id: "p2",
              name: "Elegant Midi Skirt",
              price: "QAR 220",
              image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=120&fit=crop",
              match: "95%",
            },
          ],
        },
        {
          id: "3",
          type: "sent",
          content: "These look amazing! Can you show me how they would look together?",
          timestamp: "3:05 PM",
        },
        {
          id: "4",
          type: "received",
          content: "Absolutely! I can create a virtual styling session for you. These pieces work beautifully together for:\n\n👔 Business meetings\n🎯 Professional presentations\n☕ Client lunches\n\nWould you like to try them on with our AI fitting room?",
          timestamp: "3:06 PM",
          sender: "AI Style Assistant",
          isAI: true,
        },
      ],
      vip_recommendations: [
        {
          id: "1",
          type: "received",
          content: "Welcome back to your VIP AI Concierge! 👑 I have exclusive updates tailored just for you.",
          timestamp: "4:30 PM",
          sender: "VIP AI Concierge",
          isAI: true,
        },
        {
          id: "2",
          type: "received",
          content: "🌟 EXCLUSIVE PREVIEW: New luxury collection from our premium designers is now available for VIP members only. These pieces won't be available to the public for another 2 weeks!",
          timestamp: "4:31 PM",
          sender: "VIP AI Concierge",
          isAI: true,
          products: [
            {
              id: "p1",
              name: "Limited Edition Evening Gown",
              price: "QAR 1,200",
              image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=120&fit=crop",
              match: "Exclusive",
            },
            {
              id: "p2",
              name: "Designer Handbag Collection",
              price: "QAR 850",
              image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=120&fit=crop",
              match: "Limited",
            },
          ],
        },
      ],
      business_analytics: [
        {
          id: "1",
          type: "received",
          content: "📊 Your weekly business analytics are ready! Here's how your store performed:",
          timestamp: "5:00 PM",
          sender: "Vendor AI Assistant",
          isAI: true,
        },
        {
          id: "2",
          type: "received",
          content: "📈 This Week's Performance:\n\n💰 Revenue: QAR 12,450 (+15%)\n🛍️ Orders: 47 (+8%)\n⭐ Rating: 4.8/5\n👥 New Customers: 12\n🔄 Return Rate: 2.1%\n\nTop performing items:\n1. Modest Blazer Collection\n2. Evening Wear Line\n3. Accessories Bundle",
          timestamp: "5:01 PM",
          sender: "Vendor AI Assistant",
          isAI: true,
        },
        {
          id: "3",
          type: "sent",
          content: "Great results! What recommendations do you have for next week?",
          timestamp: "5:05 PM",
        },
        {
          id: "4",
          type: "received",
          content: "Based on trends and customer behavior, I recommend:\n\n🎯 Focus on promoting your Evening Wear Line\n📱 Increase social media presence (optimal posting: 6-8 PM)\n💡 Consider bundle deals for accessories\n📦 Offer express shipping for weekend orders\n\nWould you like me to create a marketing campaign for these recommendations?",
          timestamp: "5:06 PM",
          sender: "Vendor AI Assistant",
          isAI: true,
        },
      ],
    },
    customer_support: {
      customer_service: [
        {
          id: "1",
          type: "received",
          content: "Hello! Welcome to Labees Customer Support. I'm here to help you with any questions or concerns. How can I assist you today? 😊",
          timestamp: "1:00 PM",
          sender: "Support Team",
          isAI: false,
        },
        {
          id: "2",
          type: "sent",
          content: "Hi! I have a question about my recent order. The tracking shows it was delivered but I haven't received it.",
          timestamp: "1:05 PM",
        },
        {
          id: "3",
          type: "received",
          content: "I'm sorry to hear about this issue. Let me help you track down your order right away. Can you please provide your order number?",
          timestamp: "1:06 PM",
          sender: "Support Team",
          isAI: false,
        },
        {
          id: "4",
          type: "sent",
          content: "Sure! It's LB-2024-0156",
          timestamp: "1:08 PM",
        },
        {
          id: "5",
          type: "received",
          content: "Thank you! I've located your order. I can see it was marked as delivered to your building's reception. Let me contact our delivery partner to get more details and resolve this for you immediately. You should receive an update within the next hour. 📦",
          timestamp: "1:10 PM",
          sender: "Support Team",
          isAI: false,
        },
      ],
    },
  }

  const conversationMessages = messageTemplates[conversationType]
  if (conversationMessages && conversationMessages[context]) {
    return conversationMessages[context]
  }
  
  // Fallback to default customer messages
  return messageTemplates.customer_to_vendor.order_update
}

export default function MessagesPage() {
  const [currentUserType, setCurrentUserType] = useState<UserType>("customer")
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const conversations = getConversationsForUserType(currentUserType)
  const selectedConv = conversations.find((c) => c.id === selectedConversation)
  const [chatMessages, setChatMessages] = useState<Message[]>(() => {
    if (selectedConv) {
      return getMessagesForConversation(selectedConv.type, selectedConv.context, currentUserType)
    }
    return []
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Track if user is near bottom to auto scroll
  const [isNearBottom, setIsNearBottom] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!messagesContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    // User is near bottom if within 100px of the bottom
    const nearBottom = scrollHeight - scrollTop - clientHeight < 100
    setIsNearBottom(nearBottom)
  }

  useEffect(() => {
    // Only auto-scroll if a new message arrives and the user is near the bottom
    if (isNearBottom && chatMessages.length > 0) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [chatMessages]);

  // Attach scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    if (selectedConv) {
      setChatMessages(getMessagesForConversation(selectedConv.type, selectedConv.context, currentUserType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, currentUserType]);

  const getAIResponseForUserType = (userType: UserType, conversationType: ConversationType) => {
    const responses: Record<UserType, Record<ConversationType, string>> = {
      customer: {
        customer_to_vendor: "Thank you for your message! Our team will get back to you shortly with personalized assistance.",
        vendor_to_customer: "Thank you for your message! Our team will get back to you shortly with personalized assistance.",
        ai_assistant: "I'm analyzing your style preferences to provide the best recommendations. Let me suggest some perfect matches for you!",
        customer_support: "I've forwarded your request to our support team. You'll receive a detailed response within 15 minutes.",
      },
      vendor: {
        customer_to_vendor: "I appreciate your inquiry! Let me provide you with detailed information about your order and ensure the best service.",
        vendor_to_customer: "I appreciate your inquiry! Let me provide you with detailed information about your order and ensure the best service.",
        ai_assistant: "Based on your business metrics, I can help optimize your sales strategy and customer engagement.",
        customer_support: "Your vendor account query has been received. Our business support team will assist you promptly.",
      },
      vip_customer: {
        customer_to_vendor: "As a VIP member, you'll receive priority assistance. Our premium team is preparing a personalized response for you.",
        vendor_to_customer: "As a VIP member, you'll receive priority assistance. Our premium team is preparing a personalized response for you.",
        ai_assistant: "Welcome back! I have exclusive recommendations and early access to luxury collections just for you. ✨",
        customer_support: "VIP Support activated! Your request has been escalated to our premium service team for immediate attention.",
      },
    }

    return responses[userType]?.[conversationType] || responses.customer.ai_assistant
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return

    const userMessage: Message = {
      id: String(chatMessages.length + 1),
      type: "sent",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Dynamic AI response based on user type and conversation type
    setTimeout(() => {
      const aiResponse: Message = {
        id: String(chatMessages.length + 2),
        type: "received",
        content: getAIResponseForUserType(currentUserType, selectedConv.type),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: selectedConv.userType === "ai" ? "AI Assistant" : selectedConv.brandName,
        isAI: selectedConv.userType === "ai",
      }
      setChatMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleUserTypeChange = (newUserType: UserType) => {
    setCurrentUserType(newUserType)
    setSelectedConversation("1") // Reset to first conversation
    toast({
      title: `Switched to ${newUserType.replace('_', ' ')} view`,
      description: "Chat content updated based on user role",
    })
  }

  const getUserTypeBadge = (userType: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      customer: { label: "Customer", color: "bg-blue-100 text-blue-700" },
      vendor: { label: "Vendor", color: "bg-green-100 text-green-700" },
      vip_customer: { label: "VIP", color: "bg-purple-100 text-purple-700" },
      premium_vendor: { label: "Premium", color: "bg-yellow-100 text-yellow-700" },
      ai: { label: "AI", color: "bg-teal-100 text-teal-700" },
      support: { label: "Support", color: "bg-gray-100 text-gray-700" },
    }
    return badges[userType] || badges.customer
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
        <CustomerSidebar />
        <main className="flex-1 flex">
          {/* Conversations List */}
          <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <SidebarTrigger />
                <h1 className="text-xl font-bold text-[#003153]">Messages</h1>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* User Type Switcher */}
              <div className="mb-4">
                <Tabs value={currentUserType} onValueChange={(value) => handleUserTypeChange(value as UserType)}>
                  <TabsList className="grid grid-cols-2 bg-gray-100">
                    <TabsTrigger value="customer" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Customer
                    </TabsTrigger>
                    <TabsTrigger value="vendor" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs">
                      <Store className="w-3 h-3 mr-1" />
                      Vendor
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-1 mt-2">
                  <Button
                    variant={currentUserType === "vip_customer" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleUserTypeChange("vip_customer")}
                    className="flex-1 text-xs"
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    VIP
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => {
                const badge = getUserTypeBadge(conversation.userType)
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? "bg-[#00A388]/5 border-r-2 border-r-[#00A388]" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.brandLogo || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.brandName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-[#003153] truncate">{conversation.brandName}</h3>
                          {conversation.verified && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs px-1 py-0">✓</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={`${badge.color} text-xs px-1 py-0`}>
                            {badge.label}
                          </Badge>
                          <Badge className="bg-gray-100 text-gray-600 text-xs px-1 py-0">
                            {conversation.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-[#EF6950] text-white text-xs w-5 h-5 p-0 flex items-center justify-center rounded-full">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConv?.brandLogo || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConv?.brandName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold text-[#003153]">{selectedConv?.brandName}</h2>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {selectedConv?.online ? "Online" : "Offline"}
                      </Badge>
                      {selectedConv && (
                        <Badge className={`${getUserTypeBadge(selectedConv.userType).color} text-xs`}>
                          {getUserTypeBadge(selectedConv.userType).label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedConv?.type === "ai_assistant"
                        ? "AI-powered assistance"
                        : selectedConv?.online
                          ? "Usually replies within minutes"
                          : "Last seen recently"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-[#00A388] hover:text-[#00A388]/80">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#00A388] hover:text-[#00A388]/80">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white"
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.type === "sent"
                        ? "bg-gradient-to-r from-[#003153] to-[#004A73] text-white"
                        : message.isAI
                          ? "bg-gradient-to-r from-[#00A388]/10 to-[#00C4A7]/10 border border-[#00A388]/20"
                          : "bg-white border border-gray-200"
                    } rounded-2xl p-4 shadow-sm`}
                  >
                    {message.sender && (
                      <div className="flex items-center space-x-2 mb-2">
                        {message.isAI && <Sparkles className="w-3 h-3 text-[#00A388]" />}
                        <span className="text-xs font-medium text-[#00A388]">{message.sender}</span>
                        {message.vipBadge && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs px-1 py-0">
                            <Crown className="w-2 h-2 mr-1" />
                            VIP
                          </Badge>
                        )}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>

                    {message.products && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-14 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-[#003153] text-sm">{product.name}</h4>
                              <p className="text-[#00A388] font-semibold text-sm">{product.price}</p>
                            </div>
                            <Badge className="bg-[#00A388]/10 text-[#00A388] text-xs">{product.match} match</Badge>
                          </div>
                        ))}
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" className="bg-[#00A388] hover:bg-[#00A388]/90 text-white flex-1">
                            <ShoppingBag className="w-3 h-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-[#00A388] text-[#00A388]"
                          >
                            <Heart className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${message.type === "sent" ? "text-white/70" : "text-gray-500"}`}>
                        {message.timestamp}
                      </span>
                      {message.type === "sent" && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white/70 rounded-full" />
                          <div className="w-1 h-1 bg-white/70 rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3 h-3 text-[#00A388]" />
                      <span className="text-xs font-medium text-[#00A388]">
                        {selectedConv?.userType === "ai" ? "AI Assistant" : selectedConv?.brandName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-[#00A388] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span className="text-sm text-gray-500 ml-2">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00A388]">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00A388]">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder={`Type your message as ${currentUserType.replace('_', ' ')}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-12 border-gray-300 focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388] rounded-full"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00A388]"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388] text-white rounded-full w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

