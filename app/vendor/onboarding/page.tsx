"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Upload,
  Store,
  Palette,
  Target,
  Users,
  Globe,
  Camera,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { id: "modest-wear", name: "Modest Wear", emoji: "👗", description: "Abayas, modest dresses, long sleeves" },
  { id: "hijab-accessories", name: "Hijab & Accessories", emoji: "🧕", description: "Hijabs, scarves, pins" },
  { id: "footwear", name: "Footwear", emoji: "👠", description: "Modest shoes, boots, sandals" },
  { id: "jewelry", name: "Jewelry", emoji: "💎", description: "Rings, necklaces, earrings" },
  { id: "bags", name: "Bags & Purses", emoji: "👜", description: "Handbags, clutches, backpacks" },
  { id: "sportswear", name: "Modest Sportswear", emoji: "🏃‍♀️", description: "Athletic modest clothing" },
]

const targetAudiences = [
  { id: "young-professionals", name: "Young Professionals", age: "25-35", description: "Career-focused women" },
  { id: "students", name: "Students", age: "18-25", description: "University and college students" },
  { id: "mothers", name: "Mothers", age: "30-45", description: "Working and stay-at-home moms" },
  { id: "mature-women", name: "Mature Women", age: "45+", description: "Established, sophisticated style" },
]

export default function VendorOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    brandStory: "",
    categories: [] as string[],
    targetAudience: [] as string[],
    priceRange: "",
    experience: "",
    socialMedia: {
      instagram: "",
      tiktok: "",
      website: "",
    },
  })
  const { toast } = useToast()

  const steps = [
    { title: "Brand Story", icon: Palette },
    { title: "Categories", icon: Store },
    { title: "Target Audience", icon: Users },
    { title: "Business Details", icon: Target },
    { title: "Portfolio", icon: Camera },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const handleAudienceToggle = (audienceId: string) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audienceId)
        ? prev.targetAudience.filter((id) => id !== audienceId)
        : [...prev.targetAudience, audienceId],
    }))
  }

  const handleComplete = () => {
    toast({
      title: "🎉 Welcome to Labees!",
      description: "Your vendor profile is being reviewed. We'll notify you within 24 hours.",
    })
    // Redirect to vendor dashboard
    window.location.href = "/vendor/dashboard"
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.brandStory.length > 50
      case 1:
        return formData.categories.length > 0
      case 2:
        return formData.targetAudience.length > 0
      case 3:
        return formData.priceRange && formData.experience
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#003153] to-[#00A388] bg-clip-text text-transparent">
                  Labees
                </span>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#003153] to-[#00A388] text-white">
              <Store className="w-3 h-3 mr-1" />
              Vendor Setup
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />

          {/* Step indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-[#003153] to-[#00A388] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${index <= currentStep ? "text-[#003153]" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 card-shadow bg-white/80 backdrop-blur-sm">
          {/* Step 0: Brand Story */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#003153] mb-2">Tell Your Brand Story</h2>
                <p className="text-gray-600">Help customers connect with your brand's mission and values</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#003153] mb-2">Brand Story & Mission</label>
                  <Textarea
                    placeholder="Tell us about your brand's journey, inspiration, and what makes you unique in the modest fashion space..."
                    value={formData.brandStory}
                    onChange={(e) => setFormData((prev) => ({ ...prev, brandStory: e.target.value }))}
                    className="min-h-32 border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.brandStory.length}/500 characters (minimum 50)</p>
                </div>

                <div className="bg-[#00A388]/5 p-4 rounded-lg">
                  <h4 className="font-medium text-[#003153] mb-2">💡 Tips for a great brand story:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Share what inspired you to start your brand</li>
                    <li>• Mention your commitment to modest fashion</li>
                    <li>• Highlight what makes your designs unique</li>
                    <li>• Include your target customer in mind</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Categories */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#003153] mb-2">Product Categories</h2>
                <p className="text-gray-600">Select the categories that best describe your products</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      formData.categories.includes(category.id)
                        ? "border-[#00A388] bg-[#00A388]/5"
                        : "border-gray-200 hover:border-[#00A388]/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#003153]">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      {formData.categories.includes(category.id) && <CheckCircle className="w-5 h-5 text-[#00A388]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Target Audience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#003153] mb-2">Target Audience</h2>
                <p className="text-gray-600">Who are your ideal customers? (Select all that apply)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetAudiences.map((audience) => (
                  <button
                    key={audience.id}
                    onClick={() => handleAudienceToggle(audience.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      formData.targetAudience.includes(audience.id)
                        ? "border-[#00A388] bg-[#00A388]/5"
                        : "border-gray-200 hover:border-[#00A388]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#003153] mb-1">{audience.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">Age: {audience.age}</p>
                        <p className="text-xs text-gray-500">{audience.description}</p>
                      </div>
                      {formData.targetAudience.includes(audience.id) && (
                        <CheckCircle className="w-5 h-5 text-[#00A388]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#003153] mb-2">Business Details</h2>
                <p className="text-gray-600">Tell us more about your business and experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#003153] mb-2">Price Range</label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData((prev) => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#00A388] focus:ring-[#00A388]"
                  >
                    <option value="">Select your typical price range</option>
                    <option value="budget">Budget Friendly (Under QAR 200)</option>
                    <option value="mid">Mid-Range (QAR 200-500)</option>
                    <option value="premium">Premium (QAR 500-1000)</option>
                    <option value="luxury">Luxury (QAR 1000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#003153] mb-2">Experience Level</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#00A388] focus:ring-[#00A388]"
                  >
                    <option value="">Select your experience level</option>
                    <option value="new">New to fashion business (0-1 years)</option>
                    <option value="emerging">Emerging designer (1-3 years)</option>
                    <option value="established">Established brand (3-5 years)</option>
                    <option value="veteran">Veteran designer (5+ years)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website
                    </label>
                    <Input
                      type="url"
                      placeholder="https://your-website.com"
                      value={formData.socialMedia.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, website: e.target.value },
                        }))
                      }
                      className="border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">📷 Instagram</label>
                    <Input
                      placeholder="@yourbrand"
                      value={formData.socialMedia.instagram}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, instagram: e.target.value },
                        }))
                      }
                      className="border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">🎵 TikTok</label>
                    <Input
                      placeholder="@yourbrand"
                      value={formData.socialMedia.tiktok}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, tiktok: e.target.value },
                        }))
                      }
                      className="border-gray-200 focus:border-[#00A388] focus:ring-[#00A388]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Portfolio */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#003153] mb-2">Portfolio & Samples</h2>
                <p className="text-gray-600">Upload your best work to showcase your design style</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00A388] transition-colors cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Upload Product Photo {index}</p>
                      <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#00A388]/5 p-4 rounded-lg">
                  <h4 className="font-medium text-[#003153] mb-2">📸 Photo Guidelines:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use high-quality, well-lit photos</li>
                    <li>• Show different angles and details</li>
                    <li>• Include lifestyle shots if possible</li>
                    <li>• Ensure photos represent your brand aesthetic</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-[#003153]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-3">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline" className="bg-transparent border-gray-300">
                Back
              </Button>
            )}

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-[#003153] to-[#00A388] hover:from-[#003153]/90 hover:to-[#00A388]/90 text-white font-semibold px-8"
              >
                Complete Setup
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-[#003153] to-[#00A388] hover:from-[#003153]/90 hover:to-[#00A388]/90 text-white font-semibold px-8"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
