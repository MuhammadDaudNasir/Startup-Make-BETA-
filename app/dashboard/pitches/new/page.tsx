"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download } from "lucide-react"
import { AnimatedAnalysis } from "@/components/analysis/animated-analysis"
import { AnimatedPdfGenerator } from "@/components/pdf/animated-pdf-generator"
import { PdfTemplatePreview } from "@/components/pdf/pdf-template-preview"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { createPitch } from "@/lib/supabase"

export default function NewPitch() {
  const { user } = useAuth()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfGenerated, setPdfGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState("basics")
  const [formData, setFormData] = useState({
    startup_name: "",
    tagline: "",
    industry: "",
    description: "",
    problem: "",
    solution: "",
    market: "",
    competition: "",
    business_model: "",
    funding_stage: "",
    amount_seeking: "",
    use_of_funds: "",
    financial_projections: "",
  })

  const [analysisData, setAnalysisData] = useState({
    strengths: [
      "Clear problem statement",
      "Innovative solution approach",
      "Strong team background",
      "Well-defined target market",
    ],
    weaknesses: [
      "Financial projections seem optimistic",
      "Market entry strategy needs refinement",
      "Limited discussion of intellectual property",
      "Competitive analysis could be more thorough",
    ],
    opportunities: [
      "Growing market with increasing demand",
      "Potential for strategic partnerships",
      "International expansion possibilities",
      "Additional revenue streams not yet explored",
    ],
    threats: [
      "Established competitors with market share",
      "Regulatory challenges in target industry",
      "Potential technology disruption",
      "Economic uncertainty affecting funding",
    ],
    scores: {
      valueProp: 85,
      marketAnalysis: 65,
      financials: 45,
      team: 80,
      overall: 70,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const runAiAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 5000)
  }

  const generatePdf = () => {
    setIsGeneratingPdf(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingPdf(false)
      setPdfGenerated(true)
    }, 5000)
  }

  const handlePdfComplete = () => {
    // Handle PDF generation completion
    console.log("PDF generation complete")
  }

  const savePitch = async () => {
    if (!user) return

    try {
      const pitchId = await createPitch(user.id, {
        ...formData,
        status: "draft",
      })

      if (pitchId) {
        alert("Pitch saved successfully!")
      }
    } catch (error) {
      console.error("Error saving pitch:", error)
      alert("Failed to save pitch. Please try again.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold">
          Create New Pitch
        </motion.h1>
        <div className="flex gap-2">
          <AnimatedButton variant="outline" onClick={generatePdf} disabled={isGeneratingPdf}>
            {isGeneratingPdf ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate PDF
              </>
            )}
          </AnimatedButton>
          <AnimatedButton onClick={savePitch} delay={0.1}>
            Save Draft
          </AnimatedButton>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the core details about your startup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startup_name">Startup Name</Label>
                <Input
                  id="startup_name"
                  placeholder="Enter your startup name"
                  value={formData.startup_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="A short, catchy description"
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="health">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your startup in detail"
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <AnimatedButton onClick={() => setActiveTab("details")}>Next: Details</AnimatedButton>
            </CardFooter>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Detailed Information</CardTitle>
              <CardDescription>Provide more specific details about your startup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement</Label>
                <Textarea
                  id="problem"
                  placeholder="What problem does your startup solve?"
                  rows={3}
                  value={formData.problem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution">Solution</Label>
                <Textarea
                  id="solution"
                  placeholder="How does your startup solve this problem?"
                  rows={3}
                  value={formData.solution}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="market">Target Market</Label>
                <Textarea
                  id="market"
                  placeholder="Describe your target market and its size"
                  rows={3}
                  value={formData.market}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competition">Competition</Label>
                <Textarea
                  id="competition"
                  placeholder="Who are your competitors and how do you differentiate?"
                  rows={3}
                  value={formData.competition}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_model">Business Model</Label>
                <Textarea
                  id="business_model"
                  placeholder="How will your startup make money?"
                  rows={3}
                  value={formData.business_model}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basics")}>
                Back
              </Button>
              <AnimatedButton onClick={() => setActiveTab("funding")}>Next: Funding</AnimatedButton>
            </CardFooter>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>Funding Information</CardTitle>
              <CardDescription>Details about your funding needs and financial projections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="funding_stage">Funding Stage</Label>
                <Select
                  value={formData.funding_stage}
                  onValueChange={(value) => handleSelectChange("funding_stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="series-c">Series C+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount_seeking">Amount Seeking</Label>
                <Input
                  id="amount_seeking"
                  placeholder="$"
                  type="text"
                  value={formData.amount_seeking}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="use_of_funds">Use of Funds</Label>
                <Textarea
                  id="use_of_funds"
                  placeholder="How will you use the funding?"
                  rows={3}
                  value={formData.use_of_funds}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="financial_projections">Financial Projections</Label>
                <Textarea
                  id="financial_projections"
                  placeholder="Summarize your financial projections for the next 3-5 years"
                  rows={3}
                  value={formData.financial_projections}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Back
              </Button>
              <AnimatedButton onClick={() => setActiveTab("ai-analysis")}>Next: AI Analysis</AnimatedButton>
            </CardFooter>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
              <CardDescription>Get AI-powered insights and suggestions for your pitch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!analysisComplete ? (
                <div className="flex flex-col items-center justify-center space-y-4 p-6">
                  <AnimatedAnalysis isAnalyzing={isAnalyzing} analysisComplete={analysisComplete} />
                  <AnimatedButton onClick={runAiAnalysis} disabled={isAnalyzing} className="mt-4">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run Analysis"
                    )}
                  </AnimatedButton>
                </div>
              ) : (
                <AnimatedAnalysis
                  isAnalyzing={isAnalyzing}
                  analysisComplete={analysisComplete}
                  analysisData={analysisData}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("funding")}>
                Back
              </Button>
              <AnimatedButton onClick={generatePdf} disabled={isGeneratingPdf}>
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Generate PDF
                  </>
                )}
              </AnimatedButton>
            </CardFooter>
          </AnimatedCard>

          {isGeneratingPdf && <AnimatedPdfGenerator isGenerating={isGeneratingPdf} onComplete={handlePdfComplete} />}

          {pdfGenerated && (
            <AnimatedCard delay={0.2}>
              <CardHeader>
                <CardTitle>PDF Preview</CardTitle>
                <CardDescription>Preview your generated pitch deck</CardDescription>
              </CardHeader>
              <CardContent>
                <PdfTemplatePreview pitchData={formData} />
              </CardContent>
            </AnimatedCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

