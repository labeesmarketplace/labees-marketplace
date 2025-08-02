"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"

const styleOptions = [
  { id: "minimal", emoji: "✨", label: "Minimal Chic", description: "Clean, simple outfits" },
  { id: "street", emoji: "🔥", label: "Street Style", description: "Casual, trendy" },
  { id: "traditional", emoji: "🌙", label: "Traditional Modest", description: "Abayas, hijab styles" },
  { id: "business", emoji: "💼", label: "Business Professional", description: "Work attire" },
  { id: "occasion", emoji: "💎", label: "Occasion Wear", description: "Formal, events" },
  { id: "bohemian", emoji: "🍃", label: "Bohemian", description: "Flowy, artistic" },
]

const occasionOptions = [
  { id: "campus", emoji: "📚", label: "Campus" },
  { id: "work", emoji: "💼", label: "Work" },
  { id: "weddings", emoji: "💒", label: "Weddings" },
  { id: "eid", emoji: "🌙", label: "Eid" },
  { id: "casual", emoji: "☕", label: "Casual Hangouts" },
  { id: "date", emoji: "💕", label: "Date Night" },
  { id: "travel", emoji: "✈️", label: "Travel" },
]

const budgetOptions = [
  { id: "budget", label: "Budget Friendly", range: "Under QAR 200", color: "bg-green-100 border-green-300" },
  { id: "mid", label: "Mid-Range", range: "QAR 200-500", color: "bg-yellow-100 border-yellow-300" },
  { id: "premium", label: "Premium", range: "QAR 500-1000", color: "bg-orange-100 border-orange-300" },
  { id: "luxury", label: "Luxury", range: "QAR 1000+", color: "bg-purple-100 border-purple-300" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string>("")

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles((prev) => (prev.includes(styleId) ? prev.filter((id) => id !== styleId) : [...prev, styleId]))
  }

  const handleOccasionToggle = (occasionId: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasionId) ? prev.filter((id) => id !== occasionId) : [...prev, occasionId],
    )
  }

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedStyles.length > 0
      case 1:
        return selectedOccasions.length > 0
      case 2:
        return selectedBudget !== ""
      default:
        return false
    }
  }

  const progress = ((currentStep + 1) / 3) * 100

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-[#003153]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#003153]" />
            <span className="font-semibold text-[#003153]">Labees</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-500">
              Skip
            </Button>
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="p-8 card-shadow mb-8 bg-white">
          {currentStep === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#003153] mb-2">What's your style vibe?</h2>
                <p className="text-gray-600">Help us personalize your experience (select multiple)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {styleOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleStyleToggle(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedStyles.includes(option.id)
                        ? "border-[#003153] bg-[#003153]/5"
                        : "border-gray-200 hover:border-[#003153]/30"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-medium mb-1">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                    {selectedStyles.includes(option.id) && <CheckCircle className="w-4 h-4 text-[#00A388] mt-2" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#003153] mb-2">When do you need outfits for?</h2>
                <p className="text-gray-600">Select all occasions that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {occasionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOccasionToggle(option.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                      selectedOccasions.includes(option.id)
                        ? "border-[#00A388] bg-[#00A388]/5"
                        : "border-gray-200 hover:border-[#00A388]/30"
                    }`}
                  >
                    <span className="text-lg">{option.emoji}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                    {selectedOccasions.includes(option.id) && (
                      <CheckCircle className="w-4 h-4 text-[#00A388] ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#003153] mb-2">What's your typical budget?</h2>
                <p className="text-gray-600">This helps us show you the right options</p>
              </div>
              <div className="space-y-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedBudget(option.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedBudget === option.id
                        ? "border-[#003153] bg-[#003153]/5"
                        : "border-gray-200 hover:border-[#003153]/30"
                    } ${option.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[#003153]">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.range}</div>
                      </div>
                      {selectedBudget === option.id && <CheckCircle className="w-5 h-5 text-[#00A388]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step <= currentStep ? "bg-[#003153]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {currentStep === 2 ? (
            <Link href="/avatar-creation">
              <Button className="primary-button button-press" disabled={!canProceed()}>
                Complete Setup & Create Avatar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()} className="primary-button button-press">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
