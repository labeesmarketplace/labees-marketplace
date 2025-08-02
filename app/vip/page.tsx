"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Star,
  Diamond,
  Sparkles,
  Gift,
  Calendar,
  Clock,
  Users,
  Heart,
  ShoppingBag,
  Zap,
  Award,
  Trophy,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
  Settings,
  Bell,
  MapPin,
  Plane,
  Camera,
  Scissors,
  Palette,
  Wand2,
  Target,
  TrendingUp,
  Flame,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  Share2,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const vipStatus = {
  isVIP: true,
  tier: "Platinum VIP",
  memberSince: "2023-06-15",
  renewalDate: "2024-06-15",
  pointsEarned: 15420,
  exclusiveAccess: 12,
  personalStylist: "Sarah Al-Mansouri",
  conciergeAvailable: true,
  nextTier: "Diamond Elite",
  pointsToNextTier: 4580,
}

const vipTiers = [
  {
    name: "Gold VIP",
    price: 299,
    color: "bg-yellow-500",
    icon: Crown,
    benefits: [
      "10% extra cashback on all purchases",
      "Early access to sales (24h before public)",
      "Free express shipping worldwide",
      "Monthly styling consultation (30 min)",
      "Exclusive VIP customer service line",
      "Birthday month 20% discount",
      "Access to limited edition collections",
    ],
    popular: false,
  },
  {
    name: "Platinum VIP",
    price: 599,
    color: "bg-purple-500",
    icon: Diamond,
    benefits: [
      "15% extra cashback on all purchases",
      "Early access to sales (48h before public)",
      "Free express shipping + gift wrapping",
      "Bi-weekly styling consultation (45 min)",
      "Dedicated personal stylist",
      "VIP concierge service",
      "Exclusive events and fashion shows",
      "Quarterly surprise styling box",
      "Custom alteration services",
    ],
    popular: true,
    current: true,
  },
  {
    name: "Diamond Elite",
    price: 1299,
    color: "bg-blue-500",
    icon: Sparkles,
    benefits: [
      "20% extra cashback on all purchases",
      "Private shopping sessions before launches",
      "Complimentary worldwide shipping",
      "Weekly styling consultation (60 min)",
      "Personal shopping assistant",
      "24/7 VIP concierge service",
      "Exclusive designer collaborations",
      "Monthly luxury styling box",
      "Custom design services",
      "Fashion week tickets and events",
      "Annual wardrobe audit",
    ],
    popular: false,
  },
]

const exclusiveOffers = [
  {
    id: "e1",
    title: "Private Designer Collection",
    description: "Exclusive access to limited edition pieces from top designers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop",
    discount: "30% OFF",
    validUntil: "2024-02-15",
    category: "Collection",
    vipOnly: true,
  },
  {
    id: "e2",
    title: "Personal Styling Intensive",
    description: "3-hour one-on-one styling session with wardrobe makeover",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=200&fit=crop",
    discount: "Complimentary",
    validUntil: "2024-03-01",
    category: "Service",
    vipOnly: true,
  },
  {
    id: "e3",
    title: "Fashion Week Experience",
    description: "VIP tickets to Dubai Fashion Week with backstage access",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop",
    discount: "Exclusive",
    validUntil: "2024-04-20",
    category: "Experience",
    vipOnly: true,
  },
]

const upcomingEvents = [
  {
    id: "ev1",
    title: "VIP Styling Workshop",
    description: "Learn advanced styling techniques from industry experts",
    date: "2024-02-10",
    time: "6:00 PM - 8:00 PM",
    location: "Labees Studio, Doha",
    attendees: 24,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=150&fit=crop",
    category: "Workshop",
  },
  {
    id: "ev2",
    title: "Exclusive Brand Preview",
    description: "First look at upcoming collections from premium brands",
    date: "2024-02-18",
    time: "7:00 PM - 9:00 PM",
    location: "Four Seasons Hotel, Doha",
    attendees: 18,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=150&fit=crop",
    category: "Preview",
  },
  {
    id: "ev3",
    title: "VIP Shopping Night",
    description: "Private shopping experience with personal stylists",
    date: "2024-02-25",
    time: "8:00 PM - 10:00 PM",
    location: "Labees Flagship Store",
    attendees: 12,
    maxAttendees: 20,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=150&fit=crop",
    category: "Shopping",
  },
]

const vipServices = [
  {
    id: "s1",
    title: "Personal Stylist",
    description: "Dedicated fashion expert for personalized advice",
    icon: Wand2,
    available: true,
    nextSession: "2024-02-08",
  },
  {
    id: "s2",
    title: "VIP Concierge",
    description: "24/7 assistance for all your fashion needs",
    icon: Bell,
    available: true,
    nextSession: "Available now",
  },
  {
    id: "s3",
    title: "Custom Alterations",
    description: "Professional tailoring for perfect fit",
    icon: Scissors,
    available: true,
    nextSession: "Book anytime",
  },
  {
    id: "s4",
    title: "Wardrobe Audit",
    description: "Complete wardrobe analysis and recommendations",
    icon: Eye,
    available: false,
    nextSession: "Upgrade to Diamond",
  },
]

const memberSpotlight = [
  {
    id: "m1",
    name: "Fatima Al-Zahra",
    title: "Fashion Entrepreneur",
    image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=100&h=100&fit=crop&crop=face",
    quote: "The VIP styling service transformed my professional wardrobe completely!",
    tier: "Diamond Elite",
    memberSince: "2022",
  },
  {
    id: "m2",
    name: "Mariam Hassan",
    title: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "Access to exclusive collections gives me a unique edge in my style.",
    tier: "Platinum VIP",
    memberSince: "2023",
  },
]

export default function VIPClubPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  const handleUpgrade = (tierName: string) => {
    toast({
      title: "Upgrade initiated! 👑",
      description: `Processing your upgrade to ${tierName}`,
    })
  }

  const handleBookService = (serviceId: string) => {
    toast({
      title: "Service booked! ✨",
      description: "You'll receive a confirmation email shortly",
    })
  }

  const handleJoinEvent = (eventId: string) => {
    toast({
      title: "Event registered! 🎉",
      description: "Looking forward to seeing you there",
    })
  }

  const handleClaimOffer = (offerId: string) => {
    toast({
      title: "Offer claimed! 🎁",
      description: "Your exclusive offer has been added to your account",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
        <CustomerSidebar />
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-teal-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-purple-700">VIP Club</h1>
                    <p className="text-sm text-purple-600">Exclusive benefits for our premium members</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {vipStatus.isVIP ? (
                  <>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      {vipStatus.tier}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700">
                      Active Member
                    </Badge>
                  </>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700">
                    Not a VIP Member
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* VIP Status Card */}
              {vipStatus.isVIP && (
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-purple-700">{vipStatus.tier} Member</h2>
                        <p className="text-purple-600">Member since {new Date(vipStatus.memberSince).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Renewal Date</div>
                      <div className="font-semibold text-purple-700">{new Date(vipStatus.renewalDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {vipStatus.pointsEarned.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">VIP Points Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 mb-1">
                        {vipStatus.exclusiveAccess}
                      </div>
                      <div className="text-sm text-gray-600">Exclusive Offers Used</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        {vipStatus.personalStylist ? "Active" : "None"}
                      </div>
                      <div className="text-sm text-gray-600">Personal Stylist</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {vipStatus.conciergeAvailable ? "24/7" : "Limited"}
                      </div>
                      <div className="text-sm text-gray-600">Concierge Service</div>
                    </div>
                  </div>

                  {/* Progress to Next Tier */}
                  {vipStatus.nextTier && (
                    <div className="mt-6 pt-6 border-t border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Progress to {vipStatus.nextTier}
                        </span>
                        <span className="text-sm text-gray-600">
                          {vipStatus.pointsToNextTier} points to go
                        </span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                  )}
                </Card>
              )}

              {/* VIP Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 bg-purple-50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Crown className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="tiers" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Diamond className="w-4 h-4 mr-2" />
                    Tiers
                  </TabsTrigger>
                  <TabsTrigger value="offers" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Gift className="w-4 h-4 mr-2" />
                    Exclusive Offers
                  </TabsTrigger>
                  <TabsTrigger value="events" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="services" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Services
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Community
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {!vipStatus.isVIP && (
                    <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Crown className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-purple-700 mb-4">Join the VIP Club</h2>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Unlock exclusive benefits, personalized styling, and premium experiences designed for our most valued customers.
                      </p>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg">
                        <Crown className="w-5 h-5 mr-2" />
                        Become a VIP Member
                      </Button>
                    </Card>
                  )}

                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-center">
                      <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-purple-700 mb-2">Exclusive Community</h3>
                      <p className="text-sm text-gray-600">Connect with fellow VIP members and style enthusiasts</p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 text-center">
                      <Sparkles className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-pink-700 mb-2">Personal Styling</h3>
                      <p className="text-sm text-gray-600">Dedicated stylists for personalized fashion advice</p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 text-center">
                      <Gift className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-indigo-700 mb-2">Exclusive Access</h3>
                      <p className="text-sm text-gray-600">Early access to sales and limited edition collections</p>
                    </Card>
                  </div>

                  {/* Member Spotlight */}
                  <Card className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-purple-700 mb-6">Member Spotlight</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {memberSpotlight.map((member) => (
                        <div key={member.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={member.image} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              <p className="text-sm text-gray-600">{member.title}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className="bg-purple-100 text-purple-700 text-xs">
                                  {member.tier}
                                </Badge>
                                <span className="text-xs text-gray-500">Since {member.memberSince}</span>
                              </div>
                            </div>
                          </div>
                          <blockquote className="text-sm text-gray-700 italic">
                            "{member.quote}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* VIP Tiers */}
                <TabsContent value="tiers" className="space-y-6 mt-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {vipTiers.map((tier) => (
                      <Card key={tier.name} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${
                        tier.current ? "ring-2 ring-purple-400 scale-105" : ""
                      } ${tier.popular ? "border-2 border-purple-300" : ""}`}>
                        {tier.popular && (
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="text-center mb-6">
                            <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                              <tier.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{tier.name}</h3>
                            <div className="text-3xl font-bold text-purple-600 mb-1">
                              QAR {tier.price}
                            </div>
                            <div className="text-sm text-gray-600">per year</div>
                          </div>

                          <div className="space-y-3 mb-6">
                            {tier.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            onClick={() => handleUpgrade(tier.name)}
                            disabled={tier.current}
                            className={`w-full ${
                              tier.current
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : tier.popular
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                  : "bg-white border border-purple-300 text-purple-600 hover:bg-purple-50"
                            }`}
                          >
                            {tier.current ? (
                              <>
                                <Crown className="w-4 h-4 mr-2" />
                                Current Plan
                              </>
                            ) : (
                              <>
                                <ArrowRight className="w-4 h-4 mr-2" />
                                {vipStatus.isVIP ? "Upgrade" : "Join"} Now
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Exclusive Offers */}
                <TabsContent value="offers" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exclusiveOffers.map((offer) => (
                      <Card key={offer.id} className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white text-xs">
                              {offer.discount}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-purple-500 text-white text-xs">
                              <Crown className="w-3 h-3 mr-1" />
                              VIP Only
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">{offer.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                            <Badge className="bg-gray-100 text-gray-700 text-xs">
                              {offer.category}
                            </Badge>
                          </div>
                          
                          <Button
                            onClick={() => handleClaimOffer(offer.id)}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            <Gift className="w-4 h-4 mr-2" />
                            Claim Offer
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Events */}
                <TabsContent value="events" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-6">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                {event.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                {event.attendees}/{event.maxAttendees} attending
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <Progress 
                              value={(event.attendees / event.maxAttendees) * 100} 
                              className="w-20 mb-3"
                            />
                            <Button
                              onClick={() => handleJoinEvent(event.id)}
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                            >
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Services */}
                <TabsContent value="services" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {vipServices.map((service) => (
                      <Card key={service.id} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            service.available ? "bg-purple-100" : "bg-gray-100"
                          }`}>
                            <service.icon className={`w-6 h-6 ${
                              service.available ? "text-purple-600" : "text-gray-400"
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{service.title}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={`text-xs mb-2 ${
                              service.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            }`}>
                              {service.available ? "Available" : "Unavailable"}
                            </Badge>
                            <div className="text-xs text-gray-500">{service.nextSession}</div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleBookService(service.id)}
                          disabled={!service.available}
                          className={`w-full ${
                            service.available
                              ? "bg-purple-500 hover:bg-purple-600 text-white"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {service.available ? "Book Service" : "Upgrade Required"}
                        </Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Community */}
                <TabsContent value="community" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* VIP Community Stats */}
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                      <h3 className="text-lg font-bold text-purple-700 mb-4">VIP Community</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total VIP Members</span>
                          <span className="font-semibold text-purple-600">2,847</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Active This Month</span>
                          <span className="font-semibold text-pink-600">1,923</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Events Hosted</span>
                          <span className="font-semibold text-indigo-600">156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Styling Sessions</span>
                          <span className="font-semibold text-emerald-600">4,521</span>
                        </div>
                      </div>
                    </Card>

                    {/* VIP Benefits Summary */}
                    <Card className="p-6 bg-white">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Your VIP Benefits</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700">15% extra cashback on purchases</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700">Personal stylist consultations</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700">Exclusive event invitations</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700">Priority customer support</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-700">Early access to collections</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Community Feed */}
                  <Card className="p-6 bg-white">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">VIP Community Feed</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=40&h=40&fit=crop&crop=face" />
                            <AvatarFallback>FA</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-800">Fatima Al-Zahra</div>
                            <div className="text-xs text-gray-500">Diamond Elite • 2 hours ago</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Just had an amazing styling session with Sarah! The new collection pieces are absolutely stunning.
                          Can't wait to share my looks at the upcoming VIP event! ✨
                        </p>
                        <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-purple-600">
                            <Heart className="w-4 h-4" />
                            <span>24</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-purple-600">
                            <MessageCircle className="w-4 h-4" />
                            <span>8</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-purple-600">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" />
                            <AvatarFallback>MH</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-gray-800">Mariam Hassan</div>
                            <div className="text-xs text-gray-500">Platinum VIP • 5 hours ago</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          The VIP styling workshop was incredible! Learned so many new techniques.
                          Thank you to the Labees team for organizing such amazing events for us! 🎉
                        </p>
                        <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-pink-600">
                            <Heart className="w-4 h-4" />
                            <span>31</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-pink-600">
                            <MessageCircle className="w-4 h-4" />
                            <span>12</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-pink-600">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}