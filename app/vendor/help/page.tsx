"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Video,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Users,
  Headphones,
  Calendar,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const faqCategories = [
  {
    id: 1,
    name: "Getting Started",
    count: 12,
    questions: [
      {
        question: "How do I set up my first product?",
        answer:
          "To set up your first product, navigate to Inventory > Add Product. Fill in the product details, upload high-quality images, set your pricing, and publish. Our AI assistant can help generate descriptions and optimize your listings.",
      },
      {
        question: "How long does account verification take?",
        answer:
          "Account verification typically takes 24-48 hours. You'll receive an email confirmation once your account is verified. During this time, you can still set up your store and add products.",
      },
      {
        question: "What payment methods do you support?",
        answer:
          "We support bank transfers, credit cards, and digital wallets. Payouts are processed weekly to your registered bank account in Qatar.",
      },
    ],
  },
  {
    id: 2,
    name: "Orders & Shipping",
    count: 8,
    questions: [
      {
        question: "How do I process orders?",
        answer:
          "Orders appear in your dashboard automatically. You'll receive notifications for new orders. Simply mark items as shipped when you send them out, and customers will be notified.",
      },
      {
        question: "What are the shipping requirements?",
        answer:
          "All orders must be shipped within 2 business days. We recommend using tracked shipping methods and providing tracking numbers to customers.",
      },
    ],
  },
  {
    id: 3,
    name: "AI Features",
    count: 6,
    questions: [
      {
        question: "How does the AI assistant work?",
        answer:
          "Our AI assistant helps with product descriptions, photo enhancement, trend analysis, and marketing content. Simply describe what you need, and it will generate professional content for your store.",
      },
      {
        question: "Can AI help with pricing?",
        answer:
          "Yes! Our AI analyzes market trends, competitor pricing, and demand patterns to suggest optimal pricing for your products.",
      },
    ],
  },
]

const supportChannels = [
  {
    id: 1,
    name: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    responseTime: "< 2 minutes",
    icon: MessageCircle,
    color: "from-[#00A388] to-[#00C4A7]",
    available: true,
  },
  {
    id: 2,
    name: "Phone Support",
    description: "Speak directly with our experts",
    availability: "9 AM - 6 PM QST",
    responseTime: "Immediate",
    icon: Phone,
    color: "from-[#003153] to-[#004A73]",
    available: true,
  },
  {
    id: 3,
    name: "Email Support",
    description: "Send detailed questions and get comprehensive answers",
    availability: "24/7",
    responseTime: "< 4 hours",
    icon: Mail,
    color: "from-[#F4BB3B] to-[#F7C94D]",
    available: true,
  },
  {
    id: 4,
    name: "Video Call",
    description: "Screen sharing and personalized assistance",
    availability: "By appointment",
    responseTime: "Same day",
    icon: Video,
    color: "from-[#EF6950] to-[#F28B7A]",
    available: false,
  },
]

const recentTickets = [
  {
    id: "TK-001",
    subject: "Product upload issue",
    status: "Resolved",
    priority: "Medium",
    created: "2 days ago",
    updated: "1 day ago",
  },
  {
    id: "TK-002",
    subject: "Payment processing question",
    status: "In Progress",
    priority: "High",
    created: "1 day ago",
    updated: "2 hours ago",
  },
  {
    id: "TK-003",
    subject: "AI assistant not working",
    status: "Open",
    priority: "Low",
    created: "3 hours ago",
    updated: "3 hours ago",
  },
]

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState(faqCategories[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setTicketSubject("")
      setTicketMessage("")
      toast({
        title: "Ticket Submitted! 🎫",
        description: "We'll get back to you within 4 hours",
      })
    }, 2000)
  }

  const startLiveChat = () => {
    toast({
      title: "Connecting to Live Chat... 💬",
      description: "A support agent will be with you shortly",
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
                <h1 className="text-2xl font-bold text-[#003153]">Help Center</h1>
                <p className="text-gray-600">Get the support you need to succeed</p>
              </div>
            </div>
            <Button
              onClick={startLiveChat}
              className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
          </div>

          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="faq" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                FAQ
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Contact Support
              </TabsTrigger>
              <TabsTrigger value="tickets" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                My Tickets
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="grid lg:grid-cols-4 gap-6">
                <div>
                  <Card className="p-4 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="font-semibold text-[#003153] mb-4">Categories</h3>
                    <div className="space-y-2">
                      {faqCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedCategory.id === category.id
                              ? "bg-[#00A388] text-white"
                              : "hover:bg-[#00A388]/10 text-[#003153]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.name}</span>
                            <Badge
                              className={`${
                                selectedCategory.id === category.id
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {category.count}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-3">
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#003153]">{selectedCategory.name}</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search FAQs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedCategory.questions.map((faq, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <HelpCircle className="w-5 h-5 text-[#00A388] mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-medium text-[#003153] mb-2">{faq.question}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm mb-6">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Contact Methods</h3>
                    <div className="space-y-4">
                      {supportChannels.map((channel) => (
                        <div
                          key={channel.id}
                          className={`p-4 rounded-xl bg-gradient-to-r ${channel.color} text-white cursor-pointer transition-transform hover:scale-105 ${
                            !channel.available ? "opacity-60" : ""
                          }`}
                          onClick={channel.available ? startLiveChat : undefined}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <channel.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{channel.name}</h4>
                                <p className="text-sm text-white/80">{channel.description}</p>
                              </div>
                            </div>
                            {!channel.available && (
                              <Badge className="bg-white/20 text-white text-xs">Unavailable</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm text-white/80">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {channel.availability}
                            </span>
                            <span>Response: {channel.responseTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <Phone className="w-5 h-5 text-[#00A388]" />
                        <div>
                          <p className="font-medium text-[#003153]">Phone</p>
                          <p className="text-sm text-gray-600">+974 4444 5555</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <Mail className="w-5 h-5 text-[#00A388]" />
                        <div>
                          <p className="font-medium text-[#003153]">Email</p>
                          <p className="text-sm text-gray-600">support@labees.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <Clock className="w-5 h-5 text-[#00A388]" />
                        <div>
                          <p className="font-medium text-[#003153]">Business Hours</p>
                          <p className="text-sm text-gray-600">Sunday - Thursday: 9 AM - 6 PM QST</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-[#003153] mb-4">Submit a Ticket</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Subject</label>
                        <Input
                          placeholder="Brief description of your issue..."
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Priority</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>Low - General question</option>
                          <option>Medium - Need assistance</option>
                          <option>High - Urgent issue</option>
                          <option>Critical - System down</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Category</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>Technical Support</option>
                          <option>Account Issues</option>
                          <option>Payment Problems</option>
                          <option>Product Questions</option>
                          <option>Feature Request</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Message</label>
                        <Textarea
                          placeholder="Please describe your issue in detail..."
                          value={ticketMessage}
                          onChange={(e) => setTicketMessage(e.target.value)}
                          rows={6}
                        />
                      </div>

                      <Button
                        onClick={handleSubmitTicket}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Ticket
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tickets">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#003153]">Support Tickets</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700">1 Resolved</Badge>
                    <Badge className="bg-blue-100 text-blue-700">1 In Progress</Badge>
                    <Badge className="bg-orange-100 text-orange-700">1 Open</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#00A388]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-[#003153]">{ticket.subject}</h4>
                          <Badge className="text-xs">{ticket.id}</Badge>
                          <Badge
                            className={`${
                              ticket.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : ticket.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {ticket.status === "Resolved" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {ticket.status === "In Progress" && <Clock className="w-3 h-3 mr-1" />}
                            {ticket.status === "Open" && <AlertCircle className="w-3 h-3 mr-1" />}
                            {ticket.status}
                          </Badge>
                        </div>
                        <Badge
                          className={`${
                            ticket.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : ticket.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Created: {ticket.created}</span>
                        <span>Last updated: {ticket.updated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00A388] to-[#00C4A7] rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">Documentation</h3>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive guides and tutorials</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                  >
                    Browse Docs
                  </Button>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#F4BB3B] to-[#F7C94D] rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">Video Tutorials</h3>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step video guides</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#F4BB3B] text-[#F4BB3B] hover:bg-[#F4BB3B] hover:text-white bg-transparent"
                  >
                    Watch Videos
                  </Button>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#EF6950] to-[#F28B7A] rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect with other vendors</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#EF6950] text-[#EF6950] hover:bg-[#EF6950] hover:text-white bg-transparent"
                  >
                    Join Forum
                  </Button>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#003153] to-[#004A73] rounded-xl flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">Webinars</h3>
                  <p className="text-sm text-gray-600 mb-4">Live training sessions</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#003153] text-[#003153] hover:bg-[#003153] hover:text-white bg-transparent"
                  >
                    View Schedule
                  </Button>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">Book Consultation</h3>
                  <p className="text-sm text-gray-600 mb-4">One-on-one expert guidance</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Schedule Call
                  </Button>
                </Card>

                <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#003153] mb-2">WhatsApp Support</h3>
                  <p className="text-sm text-gray-600 mb-4">Quick help via WhatsApp</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
                  >
                    Chat Now
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
