"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Sparkles, CheckCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function AvatarCreationPage() {
  const [step, setStep] = useState(0) // 0: instructions, 1: capture, 2: processing, 3: complete
  const [captureStep, setCaptureStep] = useState(0) // 0: front, 1: left, 2: right
  const [progress, setProgress] = useState(0)
  const [showAvatar, setShowAvatar] = useState(false)

  const captureSteps = [
    { title: "Front Photo", instruction: "Position your face in the circle", angle: "front" },
    { title: "Left Profile", instruction: "Turn left 45° and look straight ahead", angle: "left" },
    { title: "Right Profile", instruction: "Turn right 45° and look straight ahead", angle: "right" },
  ]

  const processingMessages = [
    "Analyzing your features...",
    "Building your 3D avatar...",
    "Adding realistic details...",
    "Almost ready!",
  ]

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setStep(3)
              setShowAvatar(true)
            }, 500)
            return 100
          }
          return prev + 2
        })
      }, 80)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleCapture = () => {
    if (captureStep < 2) {
      setCaptureStep((prev) => prev + 1)
    } else {
      setStep(2)
      setProgress(0)
    }
  }

  const handleStartCapture = () => {
    setStep(1)
    setCaptureStep(0)
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center card-shadow bg-white">
          <div className="w-16 h-16 bg-[#00A388] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#003153] mb-4">Create Your AI Avatar</h2>
          <p className="text-gray-600 mb-6">
            We'll create a personalized 3D avatar that respects your privacy and cultural preferences.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-[#00A388]/10 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-[#00A388]" />
              </div>
              <div>
                <p className="font-medium text-sm">3 Quick Photos</p>
                <p className="text-xs text-gray-500">Front and profile views</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-[#F4BB3B]/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#F4BB3B]" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Processing</p>
                <p className="text-xs text-gray-500">Takes about 4 seconds</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-[#003153]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#003153]" />
              </div>
              <div>
                <p className="font-medium text-sm">Ready to Shop</p>
                <p className="text-xs text-gray-500">Try on any outfit instantly</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={handleStartCapture} className="w-full primary-button button-press">
              <Camera className="w-4 h-4 mr-2" />
              Start Photo Capture
            </Button>
            <Button variant="outline" className="w-full bg-transparent border-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload Existing Photos
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">Your photos are processed securely and never shared</p>
        </Card>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center card-shadow bg-white">
          <div className="mb-6">
            <div className="flex justify-center space-x-2 mb-4">
              {captureSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index <= captureStep ? "bg-[#00A388]" : "bg-gray-300"}`}
                />
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#003153] mb-2">{captureSteps[captureStep].title}</h3>
            <p className="text-gray-600">{captureSteps[captureStep].instruction}</p>
          </div>

          {/* Camera Preview Mockup */}
          <div className="relative mb-6">
            <div className="w-64 h-80 mx-auto bg-gray-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-4 border-2 border-dashed border-[#00A388] rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-[#00A388] mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Position face here</p>
                </div>
              </div>

              {/* Angle indicator */}
              <div className="absolute top-4 left-4 right-4 flex justify-center">
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {captureStep === 0 && "Look straight ahead"}
                  {captureStep === 1 && "Turn left 45°"}
                  {captureStep === 2 && "Turn right 45°"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={handleCapture} className="w-full primary-button button-press">
              <Camera className="w-4 h-4 mr-2" />
              {captureStep < 2 ? "Capture & Next" : "Capture & Process"}
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Photo
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (step === 2) {
    const messageIndex = Math.floor((progress / 100) * processingMessages.length)
    const currentMessage = processingMessages[Math.min(messageIndex, processingMessages.length - 1)]

    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center card-shadow bg-white">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#00A388] rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#00A388] animate-spin" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#003153] mb-2">Creating Your Avatar</h3>
          <p className="text-gray-600 mb-6">{currentMessage}</p>

          <div className="mb-4">
            <Progress value={progress} className="h-3" />
          </div>

          <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center card-shadow bg-white">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div
            className={`w-24 h-24 mx-auto bg-[#00A388] rounded-full flex items-center justify-center transition-all duration-1000 ${showAvatar ? "scale-100" : "scale-0"}`}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ["#003153", "#00A388", "#F4BB3B"][Math.floor(Math.random() * 3)],
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#003153] mb-2">🎉 Your Avatar is Ready!</h2>
        <p className="text-gray-600 mb-6">
          Your personalized 3D avatar has been created successfully. You can now try on any outfit and see how it looks
          on you!
        </p>

        {/* Avatar Preview */}
        <div className="mb-6">
          <div className="w-32 h-40 mx-auto bg-gradient-to-b from-[#FAF8F4] to-white rounded-lg border-2 border-[#00A388] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00A388] rounded-full mx-auto mb-2 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs text-gray-600">Your Avatar</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/home">
            <Button className="w-full primary-button button-press">Start Shopping with AI</Button>
          </Link>
          <Button variant="outline" className="w-full bg-transparent border-gray-300">
            Preview Avatar Settings
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">You can update your avatar anytime in your profile</p>
      </Card>
    </div>
  )
}
