"use client"

import { motion } from "framer-motion"
import { FileText, ChevronRight, ChevronLeft } from "lucide-react"
import { useState } from "react"

interface PdfTemplatePreviewProps {
  pitchData: {
    startupName: string
    tagline: string
    industry: string
  }
}

export function PdfTemplatePreview({ pitchData }: PdfTemplatePreviewProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 5

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const pageContent = [
    // Cover page
    <div key="cover" className="flex flex-col h-full">
      <div className="h-1/3 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <FileText className="h-12 w-12 mx-auto text-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold mb-2"
        >
          {pitchData.startupName || "Your Startup Name"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground mb-4"
        >
          {pitchData.tagline || "Your Catchy Tagline Here"}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Pitch Deck | {new Date().toLocaleDateString()}
        </motion.div>
      </div>
    </div>,

    // Problem & Solution
    <div key="problem-solution" className="flex flex-col h-full p-4">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold mb-4 text-primary"
      >
        Problem & Solution
      </motion.h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h4 className="font-medium">The Problem</h4>
          <div className="space-y-1">
            <div className="h-2 w-full bg-muted rounded-full" />
            <div className="h-2 w-5/6 bg-muted rounded-full" />
            <div className="h-2 w-4/6 bg-muted rounded-full" />
          </div>
          <div className="h-20 bg-muted rounded-lg mt-2" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h4 className="font-medium">Our Solution</h4>
          <div className="space-y-1">
            <div className="h-2 w-full bg-muted rounded-full" />
            <div className="h-2 w-5/6 bg-muted rounded-full" />
            <div className="h-2 w-4/6 bg-muted rounded-full" />
          </div>
          <div className="h-20 bg-muted rounded-lg mt-2" />
        </motion.div>
      </div>
    </div>,

    // Market Analysis
    <div key="market" className="flex flex-col h-full p-4">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold mb-4 text-primary"
      >
        Market Analysis
      </motion.h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h4 className="font-medium">Target Market</h4>
          <div className="space-y-1">
            <div className="h-2 w-full bg-muted rounded-full" />
            <div className="h-2 w-5/6 bg-muted rounded-full" />
            <div className="h-2 w-4/6 bg-muted rounded-full" />
          </div>
          <div className="h-20 bg-muted rounded-lg mt-2" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <h4 className="font-medium">Market Size</h4>
          <div className="h-24 bg-muted rounded-lg" />
          <div className="space-y-1">
            <div className="h-2 w-full bg-muted rounded-full" />
            <div className="h-2 w-3/4 bg-muted rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>,

    // Business Model
    <div key="business-model" className="flex flex-col h-full p-4">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold mb-4 text-primary"
      >
        Business Model
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 flex-1"
      >
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-muted rounded-lg flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary/20" />
          </div>
          <div className="h-16 bg-muted rounded-lg flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-secondary/20" />
          </div>
          <div className="h-16 bg-muted rounded-lg flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-accent/20" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-2 w-full bg-muted rounded-full" />
          <div className="h-2 w-5/6 bg-muted rounded-full" />
          <div className="h-2 w-4/6 bg-muted rounded-full" />
        </div>
        <div className="h-32 bg-muted rounded-lg" />
      </motion.div>
    </div>,

    // Funding & Financials
    <div key="funding" className="flex flex-col h-full p-4">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-bold mb-4 text-primary"
      >
        Funding & Financials
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 flex-1"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Funding Requirements</h4>
            <div className="h-16 bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Use of Funds</h4>
            <div className="h-16 bg-muted rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Financial Projections</h4>
          <div className="h-32 bg-muted rounded-lg" />
        </div>
      </motion.div>
    </div>,
  ]

  return (
    <div className="relative">
      <div className="aspect-[4/3] w-full max-w-md mx-auto overflow-hidden rounded-lg border shadow-lg bg-card">
        {pageContent[currentPage]}
      </div>
      <div className="flex items-center justify-between mt-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevPage}
          className="rounded-full p-2 bg-muted hover:bg-muted/80"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextPage}
          className="rounded-full p-2 bg-muted hover:bg-muted/80"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}

