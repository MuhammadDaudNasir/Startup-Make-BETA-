"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Check } from "lucide-react"

interface AnimatedPdfGeneratorProps {
  isGenerating: boolean
  onComplete?: () => void
}

export function AnimatedPdfGenerator({ isGenerating, onComplete }: AnimatedPdfGeneratorProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    "Preparing template",
    "Formatting content",
    "Adding visuals",
    "Finalizing document",
    "Ready for download",
  ]

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            if (onComplete) onComplete()
            return 100
          }

          // Update the current step based on progress
          const newStep = Math.floor((prev / 100) * steps.length)
          if (newStep !== currentStep) {
            setCurrentStep(newStep)
          }

          return prev + 1
        })
      }, 50)
      return () => clearInterval(interval)
    } else {
      setProgress(0)
      setCurrentStep(0)
    }
  }, [isGenerating, currentStep, steps.length, onComplete])

  if (!isGenerating && progress === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg border p-6 glass-morphism"
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative h-32 w-32">
          {progress < 100 ? (
            <>
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <svg className="h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                  />
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-12 w-12 text-primary" />
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100"
            >
              <Check className="h-16 w-16 text-green-600" />
            </motion.div>
          )}
        </div>

        <h3 className="text-xl font-medium">{progress < 100 ? "Generating PDF" : "PDF Generated Successfully!"}</h3>

        {progress < 100 && (
          <div className="w-full max-w-md space-y-2">
            <motion.div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{steps[currentStep]}</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="text-center text-muted-foreground">
              Your pitch deck is ready to download. It has been formatted with a beautiful template and is ready to
              present to investors.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

