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
import { Input } from "@/components/ui/input"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Star,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MessageCircle,
  Phone,
  ArrowRight,
  Package2,
  ShoppingBag,
  CreditCard,
  AlertCircle,
  XCircle,
  RotateCcw,
  Heart,
  Share2,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  Award,
  Gift,
  Users,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const orderStatuses = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  processing: { label: "Processing", color: "bg-purple-100 text-purple-700", icon: Package },
  shipped: { label: "Shipped", color: "bg-indigo-100 text-indigo-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
  returned: { label: "Returned", color: "bg-gray-100 text-gray-700", icon: RotateCcw },
}

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-28",
    status: "delivered",
    total: 1250.00,
    items: 3,
    trackingNumber: "LB123456789QA",
    estimatedDelivery: "2024-01-30",
    actualDelivery: "2024-01-29",
    vendor: {
      name: "Zara Qatar",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop",
      rating: 4.8,
    },
    products: [
      {
        id: "p1",
        name: "Elegant Evening Dress",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
        price: 450.00,
        quantity: 1,
        size: "M",
        color: "Black",
      },
      {
        id: "p2",
        name: "Designer Handbag",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
        price: 650.00,
        quantity: 1,
        size: "One Size",
        color: "Brown",
      },
      {
        id: "p3",
        name: "Statement Earrings",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
        price: 150.00,
        quantity: 1,
        size: "One Size",
        color: "Gold",
      },
    ],
    shippingAddress: {
      name: "Fatima Al-Zahra",
      street: "123 Pearl Street",
      city: "Doha",
      country: "Qatar",
      phone: "+974 1234 5678",
    },
    paymentMethod: "Credit Card ending in 4567",
    canReview: true,
    canReturn: false,
    canReorder: true,
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-25",
    status: "shipped",
    total: 890.00,
    items: 2,
    trackingNumber: "LB987654321QA",
    estimatedDelivery: "2024-02-02",
    vendor: {
      name: "H&M Qatar",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop",
      rating: 4.6,
    },
    products: [
      {
        id: "p4",
        name: "Casual Blazer",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
        price: 320.00,
        quantity: 1,
        size: "L",
        color: "Navy",
      },
      {
        id: "p5",
        name: "Silk Scarf",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
        price: 570.00,
        quantity: 1,
        size: "One Size",
        color: "Floral",
      },
    ],
    shippingAddress: {
      name: "Fatima Al-Zahra",
      street: "123 Pearl Street",
      city: "Doha",
      country: "Qatar",
      phone: "+974 1234 5678",
    },
    paymentMethod: "Credit Card ending in 4567",
    canReview: false,
    canReturn: true,
    canReorder: true,
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-20",
    status: "processing",
    total: 2100.00,
    items: 4,
    trackingNumber: null,
    estimatedDelivery: "2024-02-05",
    vendor: {
      name: "Gucci Qatar",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop",
      rating: 4.9,
    },
    products: [
      {
        id: "p6",
        name: "Luxury Watch",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
        price: 1200.00,
        quantity: 1,
        size: "One Size",
        color: "Gold",
      },
      {
        id: "p7",
        name: "Designer Sunglasses",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
        price: 450.00,
        quantity: 1,
        size: "One Size",
        color: "Black",
      },
      {
        id: "p8",
        name: "Leather Wallet",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop",
        price: 280.00,
        quantity: 1,
        size: "One Size",
        color: "Brown",
      },
      {
        id: "p9",
        name: "Silk Tie",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
        price: 170.00,
        quantity: 1,
        size: "One Size",
        color: "Blue",
      },
    ],
    shippingAddress: {
      name: "Fatima Al-Zahra",
      street: "123 Pearl Street",
      city: "Doha",
      country: "Qatar",
      phone: "+974 1234 5678",
    },
    paymentMethod: "Credit Card ending in 4567",
    canReview: false,
    canReturn: false,
    canReorder: true,
  },
]

const orderStats = {
  totalOrders: 24,
  totalSpent: 18750.00,
  averageOrder: 781.25,
  favoriteCategory: "Dresses",
  loyaltyPoints: 1875,
  savedAmount: 2340.00,
}

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const { toast } = useToast()

  const handleTrackOrder = (trackingNumber: string) => {
    toast({
      title: "Tracking order 📦",
      description: `Opening tracking details for ${trackingNumber}`,
    })
  }

  const handleReorder = (orderId: string) => {
    toast({
      title: "Items added to cart! 🛒",
      description: "All items from this order have been added to your cart",
    })
  }

  const handleContactVendor = (vendorName: string) => {
    toast({
      title: "Opening chat 💬",
      description: `Starting conversation with ${vendorName}`,
    })
  }

  const handleLeaveReview = (orderId: string) => {
    toast({
      title: "Review submitted! ⭐",
      description: "Thank you for your feedback",
    })
  }

  const handleReturnRequest = (orderId: string) => {
    toast({
      title: "Return initiated 📋",
      description: "Your return request has been submitted",
    })
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTab = activeTab === "all" || order.status === activeTab
    
    return matchesSearch && matchesTab
  })

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
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-teal-700">My Orders</h1>
                    <p className="text-sm text-teal-600">Track and manage your purchases</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Order Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Card className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-center">
                  <Package2 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-teal-700">{orderStats.totalOrders}</div>
                  <div className="text-xs text-gray-600">Total Orders</div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-center">
                  <CreditCard className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-emerald-700">QAR {orderStats.totalSpent.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Spent</div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-700">QAR {orderStats.averageOrder.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Average Order</div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-center">
                  <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-700">{orderStats.favoriteCategory}</div>
                  <div className="text-xs text-gray-600">Favorite Category</div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-yellow-700">{orderStats.loyaltyPoints.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Loyalty Points</div>
                </Card>

                <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 text-center">
                  <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-700">QAR {orderStats.savedAmount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Saved</div>
                </Card>
              </div>

              {/* Search and Filter */}
              <Card className="p-4 bg-white">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search orders, products, or vendors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-teal-200 focus:border-teal-400"
                    />
                  </div>
                  <Button variant="outline" className="border-teal-200 text-teal-600 hover:bg-teal-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </Card>

              {/* Order Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-7 bg-teal-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    All Orders
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="processing" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Processing
                  </TabsTrigger>
                  <TabsTrigger value="shipped" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Shipped
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Delivered
                  </TabsTrigger>
                  <TabsTrigger value="cancelled" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Cancelled
                  </TabsTrigger>
                  <TabsTrigger value="returned" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    Returned
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4 mt-6">
                  {filteredOrders.length === 0 ? (
                    <Card className="p-12 text-center bg-white">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No orders found</h3>
                      <p className="text-gray-500 mb-6">
                        {searchQuery ? "Try adjusting your search terms" : "You haven't placed any orders yet"}
                      </p>
                      <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Start Shopping
                      </Button>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => {
                        const StatusIcon = orderStatuses[order.status as keyof typeof orderStatuses].icon
                        const isExpanded = selectedOrder === order.id
                        
                        return (
                          <Card key={order.id} className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                            {/* Order Header */}
                            <div className="p-6 border-b border-gray-100">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <StatusIcon className="w-5 h-5 text-teal-600" />
                                    <div>
                                      <h3 className="font-semibold text-gray-800">{order.id}</h3>
                                      <p className="text-sm text-gray-600">
                                        Ordered on {new Date(order.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className={orderStatuses[order.status as keyof typeof orderStatuses].color}>
                                    {orderStatuses[order.status as keyof typeof orderStatuses].label}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-800">QAR {order.total.toFixed(2)}</div>
                                    <div className="text-sm text-gray-600">{order.items} items</div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                                    className="text-teal-600 hover:bg-teal-50"
                                  >
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                  </Button>
                                </div>
                              </div>

                              {/* Vendor Info */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={order.vendor.image} />
                                    <AvatarFallback>{order.vendor.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-gray-800">{order.vendor.name}</div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                      <span className="text-xs text-gray-600">{order.vendor.rating}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex items-center space-x-2">
                                  {order.trackingNumber && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleTrackOrder(order.trackingNumber!)}
                                      className="border-teal-200 text-teal-600 hover:bg-teal-50"
                                    >
                                      <Truck className="w-4 h-4 mr-1" />
                                      Track
                                    </Button>
                                  )}
                                  {order.canReorder && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleReorder(order.id)}
                                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                    >
                                      <RefreshCw className="w-4 h-4 mr-1" />
                                      Reorder
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleContactVendor(order.vendor.name)}
                                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                  >
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Contact
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Order Details */}
                            {isExpanded && (
                              <div className="p-6 bg-gray-50">
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Products */}
                                  <div>
                                    <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
                                    <div className="space-y-3">
                                      {order.products.map((product) => (
                                        <div key={product.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                                          <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                          />
                                          <div className="flex-1">
                                            <h5 className="font-medium text-gray-800">{product.name}</h5>
                                            <div className="text-sm text-gray-600">
                                              Size: {product.size} • Color: {product.color}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              Qty: {product.quantity} • QAR {product.price.toFixed(2)}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Order Details */}
                                  <div className="space-y-4">
                                    {/* Shipping Address */}
                                    <div>
                                      <h4 className="font-semibold text-gray-800 mb-2">Shipping Address</h4>
                                      <div className="p-3 bg-white rounded-lg text-sm text-gray-600">
                                        <div className="font-medium text-gray-800">{order.shippingAddress.name}</div>
                                        <div>{order.shippingAddress.street}</div>
                                        <div>{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                                        <div>{order.shippingAddress.phone}</div>
                                      </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                      <h4 className="font-semibold text-gray-800 mb-2">Payment Method</h4>
                                      <div className="p-3 bg-white rounded-lg text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                          <CreditCard className="w-4 h-4" />
                                          <span>{order.paymentMethod}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Tracking Info */}
                                    {order.trackingNumber && (
                                      <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Tracking Information</h4>
                                        <div className="p-3 bg-white rounded-lg text-sm">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-600">Tracking Number:</span>
                                            <span className="font-mono text-gray-800">{order.trackingNumber}</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                              {order.status === 'delivered' ? 'Delivered:' : 'Expected Delivery:'}
                                            </span>
                                            <span className="text-gray-800">
                                              {order.status === 'delivered' 
                                                ? new Date(order.actualDelivery!).toLocaleDateString()
                                                : new Date(order.estimatedDelivery).toLocaleDateString()
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2">
                                      {order.canReview && (
                                        <Button
                                          onClick={() => handleLeaveReview(order.id)}
                                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                        >
                                          <Star className="w-4 h-4 mr-2" />
                                          Leave Review
                                        </Button>
                                      )}
                                      {order.canReturn && (
                                        <Button
                                          onClick={() => handleReturnRequest(order.id)}
                                          variant="outline"
                                          className="border-red-200 text-red-600 hover:bg-red-50"
                                        >
                                          <RotateCcw className="w-4 h-4 mr-2" />
                                          Return Items
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline"
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                      >
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy Order ID
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                      >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Invoice
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}