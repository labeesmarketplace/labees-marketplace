"use client"

import { useState, useRef, useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Search,
  MoreVertical,
  Sparkles,
  User,
  Star,
  ImageIcon,
  Smile,
  Paperclip,
  Filter,
  Archive,
  Pin,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const customerConversations = [
  {
    id: "1",
    customerName: "Aisha Mohammed",
    customerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    lastMessage: "Yes, I'd love to try it on!",
    timestamp: "2m ago",
    unread: 1,
    online: true,
    priority: "high",
    orderValue: "QAR 450",
    tags: ["VIP", "Repeat Customer"],
  },
  {
    id: "2",
    customerName: "Fatima Al-Zahra",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
    lastMessage: "When will the new collection arrive?",
    timestamp: "1h ago",
    unread: 0,
    online: true,
    priority: "medium",
    orderValue: "QAR 280",
    tags: ["New Customer"],
  },
  {
    id: "3",
    customerName: "Mariam Hassan",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
    lastMessage: "Thank you for the quick delivery!",
    timestamp: "3h ago",
    unread: 0,
    online: false,
    priority: "low",
    orderValue: "QAR 180",
    tags: ["Satisfied"],
  },
]

const messages = [
  {
    id: "1",
    type: "sent",
    content:
      "Hi Aisha! Welcome to Noor Collection! 👋 I see you're browsing our modest blazer collection. How can I help you today?",
    timestamp: "10:30 AM",
    sender: "You",
  },
  {
    id: "2",
    type: "received",
    content: "Hi! I'm looking for a professional blazer for work. Something modest but stylish.",
    timestamp: "10:32 AM",
    sender: "Aisha Mohammed",
  },
  {
    id: "3",
    type: "ai-suggestion",
    content:
      "AI Suggestion: Based on Aisha's profile (Professional, Size M, prefers Navy/Black, previous purchases: 3 blazers), recommend the Professional Blazer Collection.",
    timestamp: "10:32 AM",
    products: [
      {
        id: "p1",
        name: "Professional Blazer",
        price: "QAR 280",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=120&fit=crop",
        match: "94%",
        stock: 12,
      },
      {
        id: "p2",
        name: "Executive Blazer",
        price: "QAR 320",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=120&fit=crop",
        match: "89%",
        stock: 8,
      },
    ],
  },
  {
    id: "4",
    type: "sent",
    content:
      "Perfect! Based on your style preferences and previous purchases, I have some excellent recommendations for you. These blazers are specifically designed for professional settings with modest cuts.",
    timestamp: "10:33 AM",
    sender: "You",
    products: [
      {
        id: "p1",
        name: "Professional Blazer",
        price: "QAR 280",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=120&fit=crop",
        match: "94%",
        stock: 12,
      },
    ],
  },
  {
    id: "5",
    type: "received",
    content: "These look perfect! Can you tell me more about the professional blazer?",
    timestamp: "10:35 AM",
    sender: "Aisha Mohammed",
  },
]

export default function VendorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const [showAISuggestions, setShowAISuggestions] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: String(chatMessages.length + 1),
      type: "sent" as const,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "You",
    }

    setChatMessages([...chatMessages, userMessage])
    setNewMessage("")

    toast({
      title: "Message sent! 📤",
      description: "Your message has been delivered to the customer",
    })
  }

  const handleUseAISuggestion = (suggestion: string) => {
    setNewMessage(suggestion)
    toast({
      title: "AI suggestion applied! 🤖",
      description: "You can edit the message before sending",
    })
  }

  const selectedCustomer = customerConversations.find((c) => c.id === selectedConversation)

  const aiSuggestions = [
    "Thank you for your interest! This blazer features premium cotton blend fabric with a modest cut perfect for professional settings.",
    "I'd be happy to arrange a virtual try-on session for you. When would be convenient?",
    "We offer free alterations to ensure the perfect fit. Would you like to schedule a fitting?",
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
        <VendorSidebar />
        <main className="flex-1 flex">
          {/* Conversations List */}
          <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <SidebarTrigger />
                <h1 className="text-xl font-bold text-[#003153]">Customer Messages</h1>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-[#00A388] focus:ring-1 focus:ring-[#00A388]"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger value="all" className="text-xs">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="vip" className="text-xs">
                    VIP
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto">
              {customerConversations.map((conversation) => (
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
                        <AvatarImage src={conversation.customerAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                      )}
                      {conversation.priority === "high" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#003153] truncate">{conversation.customerName}</h3>
                        {conversation.unread > 0 && (
                          <Badge className="bg-[#EF6950] text-white text-xs w-5 h-5 p-0 flex items-center justify-center rounded-full">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        <span className="text-xs font-medium text-[#00A388]">{conversation.orderValue}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {conversation.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`text-xs ${
                              tag === "VIP" ? "bg-[#F4BB3B]/20 text-[#F4BB3B]" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedCustomer?.customerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedCustomer?.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold text-[#003153]">{selectedCustomer?.customerName}</h2>
                      <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>
                      {selectedCustomer?.tags.includes("VIP") && (
                        <Badge className="bg-[#F4BB3B]/20 text-[#F4BB3B] text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Total orders: {selectedCustomer?.orderValue}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-[#00A388] hover:text-[#00A388]/80">
                    <Pin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#00A388] hover:text-[#00A388]/80">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
              {chatMessages.map((message) => (
                <div key={message.id} className="animate-in slide-in-from-bottom-2 duration-300">
                  {message.type === "ai-suggestion" ? (
                    <div className="bg-gradient-to-r from-[#00A388]/5 to-[#00C4A7]/5 border border-[#00A388]/20 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[#00A388]" />
                        <span className="text-sm font-medium text-[#00A388]">AI Recommendation</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{message.content}</p>
                      {message.products && (
                        <div className="grid grid-cols-2 gap-3">
                          {message.products.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-100"
                            >
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-10 h-12 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-[#003153] text-xs truncate">{product.name}</h4>
                                <p className="text-[#00A388] font-semibold text-xs">{product.price}</p>
                                <p className="text-gray-500 text-xs">Stock: {product.stock}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] ${
                          message.type === "sent"
                            ? "bg-gradient-to-r from-[#003153] to-[#004A73] text-white"
                            : "bg-white border border-gray-200"
                        } rounded-2xl p-4 shadow-sm`}
                      >
                        {message.sender && message.type === "received" && (
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="w-3 h-3 text-[#00A388]" />
                            <span className="text-xs font-medium text-[#00A388]">{message.sender}</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.content}</p>

                        {message.products && (
                          <div className="mt-3 space-y-2">
                            {message.products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg border border-gray-100"
                              >
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-12 h-14 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-[#003153] text-sm">{product.name}</h4>
                                  <p className="text-[#00A388] font-semibold text-sm">{product.price}</p>
                                  <p className="text-gray-500 text-xs">In stock: {product.stock}</p>
                                </div>
                              </div>
                            ))}
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
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* AI Suggestions Panel */}
            {showAISuggestions && (
              <div className="p-3 bg-gradient-to-r from-[#00A388]/5 to-[#00C4A7]/5 border-t border-[#00A388]/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#00A388]" />
                    <span className="text-sm font-medium text-[#00A388]">AI Quick Replies</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAISuggestions(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleUseAISuggestion(suggestion)}
                      className="text-xs bg-white border-[#00A388]/30 text-[#00A388] hover:bg-[#00A388] hover:text-white"
                    >
                      {suggestion.substring(0, 30)}...
                    </Button>
                  ))}
                </div>
              </div>
            )}

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
                    placeholder="Type your message..."
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
