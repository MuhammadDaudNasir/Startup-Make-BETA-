import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Login - Startup Pitch Maker",
  description: "Login to your Startup Pitch Maker account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>Startup Pitch Maker</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Startup Pitch Maker. All rights reserved by Muhammad Daud Nasir.
          </p>
        </div>
      </footer>
    </div>
  )
}

