"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Upload, User, X, ArrowRight, Sun, Eye, Shirt, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type OnboardingStep = "welcome" | "selfies" | "fullbody" | "review" | "processing" | "reveal"

interface CapturedPhoto {
  id: string
  url: string
  type: "selfie" | "fullbody"
  angle?: string
}

const selfieAngles = [
  { id: "front", label: "Look Straight Ahead", icon: "👤" },
  { id: "left", label: "Turn Your Head Left", icon: "👈" },
  { id: "right", label: "Turn Your Head Right", icon: "👉" },
  { id: "up", label: "Look Up Slightly", icon: "👆" },
  { id: "down", label: "Look Down Slightly", icon: "👇" },
  { id: "smile", label: "Smile Naturally", icon: "😊" },
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [currentSelfieIndex, setCurrentSelfieIndex] = useState(0)
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([])
  const [fullBodyPhotos, setFullBodyPhotos] = useState<{ front?: string; side?: string }>({})
  const [isCapturing, setIsCapturing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [userName] = useState("Alex")

  const { toast } = useToast()

  // Gemini AI processing with real API calls
  useEffect(() => {
    if (currentStep === "processing") {
      processWithGeminiAI()
    }
  }, [currentStep, toast])

  const processWithGeminiAI = async () => {
    try {
      setProcessingProgress(10)
      
      // Get the first selfie and first full body photo for processing
      const selfiePhoto = capturedPhotos.find(p => p.type === "selfie")
      const bodyPhoto = fullBodyPhotos.front
      
      if (!selfiePhoto || !bodyPhoto) {
        throw new Error("Missing required photos for processing")
      }

      setProcessingProgress(30)
      
      // Call Gemini API for try-on generation
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate-tryon',
          selfieImage: selfiePhoto.url,
          bodyImage: bodyPhoto,
          clothingDescription: 'casual everyday outfit'
        })
      })

      setProcessingProgress(70)
      
      if (!response.ok) {
        throw new Error('Failed to process images with Gemini AI')
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Processing failed')
      }

      setProcessingProgress(100)
      
      setTimeout(() => {
        setCurrentStep("reveal")
        toast({
          title: "🎉 Your likeness is ready!",
          description: "Powered by Gemini AI",
        })
      }, 500)
      
    } catch (error) {
      console.error('Gemini processing error:', error)
      toast({
        title: "Processing Error",
        description: "Failed to create your likeness. Please try again.",
        variant: "destructive"
      })
      // Fallback to simulated processing
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setCurrentStep("reveal")
              toast({
                title: "🎉 Your likeness is ready!",
                description: "Using fallback processing",
              })
            }, 500)
            return 100
          }
          return prev + 5
        })
      }, 200)
    }
  }

  const capturePhoto = () => {
    setIsCapturing(true)

    // In a real implementation, we would capture an actual photo here
    // For now, we'll simulate with a data URL to demonstrate the concept
    setTimeout(() => {
      // Create a mock data URL to simulate actual image capture
      // In a real implementation, this would come from an actual camera capture
      const mockImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      
      const newPhoto: CapturedPhoto = {
        id: Date.now().toString(),
        url: mockImageData,
        type: "selfie",
        angle: selfieAngles[currentSelfieIndex].id,
      }

      setCapturedPhotos((prev) => [...prev, newPhoto])

      if (currentSelfieIndex < selfieAngles.length - 1) {
        setCurrentSelfieIndex((prev) => prev + 1)
      } else {
        // All selfies captured
        setCurrentStep("fullbody")
      }
      setIsCapturing(false)
    }, 800)
  }

  const handleFileUpload = (type: "front" | "side") => {
    // In a real implementation, we would handle actual file uploads here
    // For now, we'll simulate with a data URL to demonstrate the concept
    const mockImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    setFullBodyPhotos((prev) => ({ ...prev, [type]: mockImageData }))
  }

  const removePhoto = (photoId: string) => {
    setCapturedPhotos((prev) => prev.filter((p) => p.id !== photoId))
  }

  const retakePhoto = (angle: string) => {
    const angleIndex = selfieAngles.findIndex((a) => a.id === angle)
    if (angleIndex !== -1) {
      setCurrentSelfieIndex(angleIndex)
      setCurrentStep("selfies")
    }
  }

  // Welcome Screen
  const WelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-black">Create Your Digital Likeness</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            To create an accurate model for virtual try-ons, we need to capture your facial features and body shape.
            This involves two quick steps.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 text-left">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">6 Selfies</h3>
                <p className="text-gray-600">From different angles to capture your unique facial structure.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-left">
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">2 Full-Length Photos</h3>
                <p className="text-gray-600">To understand your body shape and proportions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-black mb-4">For Best Results</h4>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Sun className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Use bright, balanced lighting</span>
            </div>
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">No glasses, hats, or headphones</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shirt className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Wear form-fitting clothes for body photos</span>
            </div>
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Use a simple, uncluttered background</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setCurrentStep("selfies")}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium rounded-xl"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  )

  // Mock Selfie Capture Screen
  const SelfieScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black flex flex-col"
    >
      {/* Header */}
      <div className="p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Selfies ({currentSelfieIndex + 1}/6)</h2>
          <div className="text-4xl">{selfieAngles[currentSelfieIndex].icon}</div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSelfieIndex + 1) / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Mock Camera View */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden bg-gray-800">
          {/* Mock Video Feed */}
          <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="text-8xl">📷</div>
          </div>

          {/* Face Guide Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-80 border-2 border-white/50 rounded-full border-dashed" />
          </div>

          {/* Flash Effect */}
          {isCapturing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{selfieAngles[currentSelfieIndex].label}</h3>
        <p className="text-gray-400 mb-6">Position your face within the oval and hold still</p>

        <Button
          onClick={capturePhoto}
          disabled={isCapturing}
          className="w-20 h-20 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center"
        >
          <Camera className="w-8 h-8" />
        </Button>
      </div>
    </motion.div>
  )

  // Full Body Upload Screen
  const FullBodyScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white p-6"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-black mb-8 text-center">Upload Full-Length Photos</h2>

        <div className="space-y-6">
          {/* Front View */}
          <div
            onClick={() => handleFileUpload("front")}
            className="relative aspect-[3/4] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {fullBodyPhotos.front ? (
              <img
                src={fullBodyPhotos.front || "/placeholder.svg"}
                alt="Front view"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">Tap to upload front view</p>
              </>
            )}
          </div>

          {/* Side View */}
          <div
            onClick={() => handleFileUpload("side")}
            className="relative aspect-[3/4] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {fullBodyPhotos.side ? (
              <img
                src={fullBodyPhotos.side || "/placeholder.svg"}
                alt="Side view"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">Tap to upload side view</p>
              </>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6 mb-8">Remember: form-fitting clothes, clear background</p>

        <Button
          onClick={() => setCurrentStep("review")}
          disabled={!fullBodyPhotos.front || !fullBodyPhotos.side}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white py-4 text-lg font-medium rounded-xl"
        >
          Review Images
        </Button>
      </div>
    </motion.div>
  )

  // Review Screen
  const ReviewScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white p-6"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-black mb-8 text-center">Final Check</h2>

        {/* Selfies Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Selfies</h3>
          <div className="grid grid-cols-3 gap-3">
            {capturedPhotos.map((photo, index) => (
              <div key={photo.id} className="relative aspect-square">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={`Selfie ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => retakePhoto(photo.angle!)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Full Body Photos */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Full-Length Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {fullBodyPhotos.front && (
              <div className="relative aspect-[3/4]">
                <img
                  src={fullBodyPhotos.front || "/placeholder.svg"}
                  alt="Front view"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setFullBodyPhotos((prev) => ({ ...prev, front: undefined }))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {fullBodyPhotos.side && (
              <div className="relative aspect-[3/4]">
                <img
                  src={fullBodyPhotos.side || "/placeholder.svg"}
                  alt="Side view"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => setFullBodyPhotos((prev) => ({ ...prev, side: undefined }))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => setCurrentStep("processing")}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium rounded-xl"
        >
          Create My Likeness
        </Button>
      </div>
    </motion.div>
  )

  // Processing Screen - 5 seconds
  const ProcessingScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md space-y-8">
        {/* Animated Spheres */}
        <div className="relative w-32 h-32 mx-auto">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-black rounded-full"
              animate={{
                rotate: 360,
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.1,
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-8px",
                marginTop: "-8px",
              }}
            />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-black">Creating Your Likeness...</h2>
          <p className="text-lg text-gray-600">
            {processingProgress < 30 ? "Analyzing your photos..." :
             processingProgress < 70 ? "Generating AI try-on with Gemini..." :
             "Finalizing your digital likeness..."}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-black h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${processingProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-gray-500">{processingProgress}% complete</p>
        </div>
      </div>
    </motion.div>
  )

  // Reveal Screen
  const RevealScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-black mb-2">Welcome, {userName}!</h1>
        <p className="text-gray-600">Your likeness is ready</p>
      </div>

      {/* Avatar Display */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative">
          {/* Avatar Placeholder */}
          <div className="w-64 h-80 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="text-8xl">👤</div>

            {/* Default Outfit Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-blue-200/50 flex items-center justify-center">
              <div className="text-6xl">👕</div>
            </div>
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
          >
            This is you! Swipe to see different looks
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6">
        <Button
          onClick={() => {
            toast({
              title: "🎉 Welcome to Try-On!",
              description: "Start exploring your virtual wardrobe",
            })
          }}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium rounded-xl flex items-center justify-center space-x-2"
        >
          <span>Start Styling</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  )

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {currentStep === "welcome" && <WelcomeScreen key="welcome" />}
        {currentStep === "selfies" && <SelfieScreen key="selfies" />}
        {currentStep === "fullbody" && <FullBodyScreen key="fullbody" />}
        {currentStep === "review" && <ReviewScreen key="review" />}
        {currentStep === "processing" && <ProcessingScreen key="processing" />}
        {currentStep === "reveal" && <RevealScreen key="reveal" />}
      </AnimatePresence>
    </div>
  )
}
