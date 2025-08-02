"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Upload, Edit, Eye, TrendingUp, AlertTriangle, Sparkles } from "lucide-react"

const inventoryData = [
  {
    id: 1,
    sku: "BQ-BLZ-001",
    name: "Modest Blazer",
    category: "Outerwear",
    sizes: { XS: 5, S: 12, M: 2, L: 8, XL: 0 },
    price: 180,
    tryOnViews: 1247,
    aiForecast: 92,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    sku: "BQ-TRS-002",
    name: "Wide-leg Trousers",
    category: "Bottoms",
    sizes: { XS: 8, S: 15, M: 6, L: 12, XL: 3 },
    price: 120,
    tryOnViews: 892,
    aiForecast: 78,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    sku: "BQ-HJB-003",
    name: "Silk Hijab",
    category: "Accessories",
    sizes: { "One Size": 25 },
    price: 45,
    tryOnViews: 634,
    aiForecast: 85,
    status: "low-stock",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function VendorInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getStockStatus = (sizes: Record<string, number>) => {
    const totalStock = Object.values(sizes).reduce((sum, qty) => sum + qty, 0)
    if (totalStock === 0) return { status: "out-of-stock", color: "text-red-600" }
    if (totalStock <= 5) return { status: "low-stock", color: "text-orange-600" }
    return { status: "in-stock", color: "text-green-600" }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-[#FAF8F4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Inventory Manager</h1>
                <p className="text-gray-600">Manage your products and stock levels</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
              <Button className="primary-button">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 card-shadow mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="outerwear">Outerwear</option>
                <option value="bottoms">Bottoms</option>
                <option value="accessories">Accessories</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </Card>

          {/* Inventory Table */}
          <Card className="card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-[#003153]">Product</th>
                    <th className="text-left p-4 font-medium text-[#003153]">SKU</th>
                    <th className="text-left p-4 font-medium text-[#003153]">Stock</th>
                    <th className="text-left p-4 font-medium text-[#003153]">Price</th>
                    <th className="text-left p-4 font-medium text-[#003153]">Try-On Views</th>
                    <th className="text-left p-4 font-medium text-[#003153]">
                      <div className="flex items-center">
                        AI Forecast
                        <Badge className="ai-badge ml-2">
                          <Sparkles className="w-3 h-3" />
                        </Badge>
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-[#003153]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => {
                    const stockStatus = getStockStatus(item.sizes)
                    return (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-[#003153]">{item.name}</p>
                              <p className="text-sm text-gray-600">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {Object.entries(item.sizes).map(([size, qty]) => (
                              <div key={size} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{size}:</span>
                                <span className={qty <= 2 ? "text-orange-600 font-medium" : ""}>{qty}</span>
                              </div>
                            ))}
                          </div>
                          <Badge variant="outline" className={`mt-2 ${stockStatus.color}`}>
                            {stockStatus.status === "low-stock" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {stockStatus.status.replace("-", " ")}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">QAR {item.price}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span>{item.tryOnViews.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-[#00A388] h-2 rounded-full" style={{ width: `${item.aiForecast}%` }} />
                            </div>
                            <span className="text-sm font-medium">{item.aiForecast}%</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">7-day sell-through</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <TrendingUp className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="mt-6 p-6 card-shadow bg-[#00A388]/5 border-[#00A388]/20">
            <div className="flex items-center space-x-3 mb-4">
              <Badge className="ai-badge">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Insights
              </Badge>
              <h3 className="font-semibold text-[#003153]">Inventory Recommendations</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-[#003153] mb-2">Restock Alert</h4>
                <p className="text-sm text-gray-700">
                  Modest Blazer (Size M) is running low. Based on current trends, consider restocking 15-20 units within
                  the next week.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-[#003153] mb-2">Trending Opportunity</h4>
                <p className="text-sm text-gray-700">
                  Wide-leg trousers in earth tones are trending +35%. Consider expanding this category for maximum
                  impact.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  )
}
