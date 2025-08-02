"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Sparkles, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function VendorSignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    description: "",
    category: "",
  })
  const { toast } = useToast()

  const handleSubmit = () => {
    toast({
      title: "Application submitted!",
      description: "We'll review your application within 24 hours",
    })
    setStep(3)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center card-shadow">
          <div className="w-16 h-16 bg-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#003153] mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">We'll review your application and get back to you within 24 hours.</p>
          <div className="space-y-3">
            <Link href="/vendor/dashboard">
              <Button className="w-full primary-button">Preview Dashboard</Button>
            </Link>
            <Link href="/home">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/profile">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="font-semibold text-[#003153]">Become a Vendor</h1>
        <div className="w-8" />
      </header>

      <div className="max-w-2xl mx-auto p-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? "50%" : "100%"}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#003153] h-2 rounded-full transition-all duration-300"
              style={{ width: `${step * 50}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            {/* Hero */}
            <Card className="p-6 card-shadow text-center bg-gradient-to-r from-[#003153]/5 to-[#00A388]/5">
              <div className="w-16 h-16 bg-[#003153] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#003153] mb-2">Join Labees Marketplace</h2>
              <p className="text-gray-600 mb-4">Reach thousands of fashion-conscious customers across the GCC</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[#003153]">500+</div>
                  <div className="text-xs text-gray-600">Active Vendors</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#003153]">50K+</div>
                  <div className="text-xs text-gray-600">Monthly Shoppers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#003153]">15%</div>
                  <div className="text-xs text-gray-600">Commission</div>
                </div>
              </div>
            </Card>

            {/* Basic Info */}
            <Card className="p-6 card-shadow">
              <h3 className="font-semibold text-[#003153] mb-4">Business Information</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="modest-wear">Modest Wear</option>
                  <option value="accessories">Accessories</option>
                  <option value="footwear">Footwear</option>
                  <option value="jewelry">Jewelry</option>
                </select>
                <Textarea
                  placeholder="Tell us about your brand..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </Card>

            <Button
              onClick={() => setStep(2)}
              className="w-full primary-button"
              disabled={!formData.businessName || !formData.email}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Documents */}
            <Card className="p-6 card-shadow">
              <h3 className="font-semibold text-[#003153] mb-4">Required Documents</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Business License</p>
                  <Button variant="outline" size="sm">
                    Upload File
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Tax Registration</p>
                  <Button variant="outline" size="sm">
                    Upload File
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Product Samples (3-5 photos)</p>
                  <Button variant="outline" size="sm">
                    Upload Files
                  </Button>
                </div>
              </div>
            </Card>

            {/* AI Features */}
            <Card className="p-6 card-shadow bg-[#00A388]/5 border-[#00A388]/20">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="ai-badge">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <h3 className="font-semibold text-[#003153]">Exclusive AI Features</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#00A388]" />
                  <span className="text-sm">AI Try-On for your products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#00A388]" />
                  <span className="text-sm">Smart inventory forecasting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#00A388]" />
                  <span className="text-sm">Automated lookbook generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#00A388]" />
                  <span className="text-sm">Personalized customer matching</span>
                </div>
              </div>
            </Card>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 primary-button">
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
