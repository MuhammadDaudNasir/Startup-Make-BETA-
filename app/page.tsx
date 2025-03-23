import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  FileText,
  BarChart3,
  Settings,
  Download,
  CheckCircle,
  Users,
  Rocket,
  FileSpreadsheet,
} from "lucide-react"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b glass-morphism backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>Startup Pitch Maker</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <AnimatedButton>Sign Up</AnimatedButton>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 animated-gradient-bg">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Create <AnimatedGradientText>Stunning</AnimatedGradientText> Startup Pitches with AI
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Generate professional pitch decks with AI analysis, detailed funding information, and beautiful
                    design that will impress investors.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <AnimatedButton size="lg" className="gap-1.5 bg-white text-primary hover:bg-white/90">
                      Get Started for Free
                      <ArrowRight className="h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                  <Link href="/login">
                    <AnimatedButton
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white/10"
                      delay={0.1}
                    >
                      Login
                    </AnimatedButton>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                    <span>Beautiful PDFs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                    <span>Funding Tracker</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl glass-morphism p-4 shadow-xl">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-md flex items-center px-3">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-xs text-white/70">Startup Pitch Maker</div>
                  </div>
                  <div className="mt-10 flex flex-col space-y-4">
                    <div className="h-6 w-3/4 rounded-md bg-white/10"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-white/10"></div>
                      <div className="h-4 w-full rounded-md bg-white/10"></div>
                      <div className="h-4 w-3/4 rounded-md bg-white/10"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-32 w-[48%] rounded-md bg-white/10"></div>
                      <div className="h-32 w-[48%] rounded-md bg-white/10"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-white/10"></div>
                      <div className="h-4 w-full rounded-md bg-white/10"></div>
                      <div className="h-4 w-3/4 rounded-md bg-white/10"></div>
                    </div>
                    <div className="h-32 w-full rounded-md bg-white/10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <AnimatedGradientText className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </AnimatedGradientText>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create professional pitch decks in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <AnimatedCard delay={0.1} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-primary p-3">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">1. Input Your Data</h3>
                <p className="text-center text-muted-foreground">
                  Fill in your startup details, business model, and funding requirements
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.2} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-secondary p-3">
                  <BarChart3 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">2. AI Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Our AI analyzes your pitch and provides suggestions to improve it
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.3} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-accent p-3">
                  <Download className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">3. Generate PDF</h3>
                <p className="text-center text-muted-foreground">
                  Download a professionally designed pitch deck ready to present to investors
                </p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <AnimatedGradientText className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </AnimatedGradientText>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create professional startup pitches
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <AnimatedCard delay={0.1} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-primary p-3">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Get intelligent insights and suggestions for your pitch using OpenAI integration
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.2} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-secondary p-3">
                  <FileText className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Beautiful PDFs</h3>
                <p className="text-center text-muted-foreground">
                  Generate professionally designed pitch decks that stand out to investors
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.3} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-accent p-3">
                  <FileSpreadsheet className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Funding Tracker</h3>
                <p className="text-center text-muted-foreground">
                  Manage all your funding opportunities and investor relationships in one place
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.4} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-primary p-3">
                  <Settings className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Customization</h3>
                <p className="text-center text-muted-foreground">
                  Tailor your pitch deck with custom branding and design elements
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.5} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-secondary p-3">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-center text-muted-foreground">
                  Work together with your team to create and refine your pitch
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.6} className="flex flex-col items-center space-y-2 p-6 glass-morphism">
                <div className="rounded-full bg-accent p-3">
                  <Rocket className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Investor Ready</h3>
                <p className="text-center text-muted-foreground">
                  Create pitches that address key investor concerns and questions
                </p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 animated-gradient-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Create Your Pitch?
                </h2>
                <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of founders who have created successful pitch decks with our platform
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <AnimatedButton size="lg" className="gap-1.5 bg-white text-primary hover:bg-white/90">
                    Get Started for Free
                    <ArrowRight className="h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 glass-morphism">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <FileText className="h-6 w-6" />
                <span>Startup Pitch Maker</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create professional startup pitch decks with AI analysis and beautiful design.
              </p>
              <p className="text-sm font-bold">
                &copy; {new Date().getFullYear()} Muhammad Daud Nasir.
                <br />
                All rights reserved.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>Designed and developed by Muhammad Daud Nasir. Powered by Next.js, Supabase, and OpenAI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

