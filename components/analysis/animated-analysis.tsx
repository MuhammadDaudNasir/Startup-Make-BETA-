"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

interface AnimatedAnalysisProps {
  isAnalyzing: boolean
  analysisComplete: boolean
  analysisData?: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
    scores: {
      valueProp: number
      marketAnalysis: number
      financials: number
      team: number
      overall: number
    }
  }
}

export function AnimatedAnalysis({ isAnalyzing, analysisComplete, analysisData }: AnimatedAnalysisProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 30)
      return () => clearInterval(interval)
    } else if (!isAnalyzing && !analysisComplete) {
      setProgress(0)
    } else if (analysisComplete) {
      setProgress(100)
    }
  }, [isAnalyzing, analysisComplete])

  if (!isAnalyzing && !analysisComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center space-y-4 p-6"
      >
        <BarChart3 className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-medium">Run AI Analysis</h3>
        <p className="text-center text-muted-foreground">
          Our AI will analyze your pitch and provide suggestions to improve it.
        </p>
      </motion.div>
    )
  }

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center space-y-6 p-6"
      >
        <div className="relative h-32 w-32">
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
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
            <span className="text-2xl font-bold">{progress}%</span>
          </div>
        </div>
        <h3 className="text-xl font-medium">Analyzing Your Pitch</h3>
        <div className="w-full max-w-md space-y-2">
          <motion.div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </motion.div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Analyzing content</span>
            <span>{progress}%</span>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Our AI is analyzing your pitch for strengths, weaknesses, and opportunities.</p>
          <p>This may take a moment...</p>
        </div>
      </motion.div>
    )
  }

  if (analysisComplete && analysisData) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border p-4 glass-morphism"
        >
          <h3 className="font-medium mb-2">Pitch Strength Analysis</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Value Proposition</span>
                <span className="font-medium">{analysisData.scores.valueProp}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.scores.valueProp}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Market Analysis</span>
                <span className="font-medium">{analysisData.scores.marketAnalysis}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.scores.marketAnalysis}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Financial Projections</span>
                <span className="font-medium">{analysisData.scores.financials}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.scores.financials}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Team Composition</span>
                <span className="font-medium">{analysisData.scores.team}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.scores.team}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Score</span>
                <span className="font-bold">{analysisData.scores.overall}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.scores.overall}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border p-4 glass-morphism"
        >
          <h3 className="font-medium mb-2">SWOT Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <h4 className="font-medium">Strengths</h4>
              </div>
              <ul className="space-y-1 pl-7 list-disc text-sm">
                {analysisData.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <h4 className="font-medium">Weaknesses</h4>
              </div>
              <ul className="space-y-1 pl-7 list-disc text-sm">
                {analysisData.weaknesses.map((weakness, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {weakness}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <TrendingUp className="h-5 w-5" />
                <h4 className="font-medium">Opportunities</h4>
              </div>
              <ul className="space-y-1 pl-7 list-disc text-sm">
                {analysisData.opportunities.map((opportunity, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {opportunity}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="h-5 w-5" />
                <h4 className="font-medium">Threats</h4>
              </div>
              <ul className="space-y-1 pl-7 list-disc text-sm">
                {analysisData.threats.map((threat, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {threat}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return null
}

