"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"
import { adminAuthClient } from "@/lib/admin-auth"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [factorId, setFactorId] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await adminAuthClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      // Check if MFA is required
      if (data?.session && data.user) {
        const { data: mfaData, error: mfaError } = await adminAuthClient.auth.mfa.getAuthenticatorAssuranceLevel()

        if (mfaError) {
          setError(mfaError.message)
          return
        }

        if (mfaData.currentLevel === "aal1" && mfaData.nextLevel === "aal2") {
          // User needs to complete 2FA
          const { data: challengeData, error: challengeError } = await adminAuthClient.auth.mfa.challenge({
            factorId: mfaData.currentFactors[0].id,
          })

          if (challengeError) {
            setError(challengeError.message)
            return
          }

          setFactorId(mfaData.currentFactors[0].id)
          setShowTwoFactor(true)
          return
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await adminAuthClient
          .from("admin_users")
          .select("*")
          .eq("user_id", data.user.id)
          .single()

        if (adminError || !adminData) {
          setError("You do not have admin privileges")
          await adminAuthClient.auth.signOut()
          return
        }

        // Admin login successful
        router.push("/admin")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await adminAuthClient.auth.mfa.verify({
        factorId,
        code: twoFactorCode,
      })

      if (error) {
        setError(error.message)
        return
      }

      // 2FA successful, check if user is admin
      const { data: session } = await adminAuthClient.auth.getSession()

      if (session.session) {
        const { data: adminData, error: adminError } = await adminAuthClient
          .from("admin_users")
          .select("*")
          .eq("user_id", session.session.user.id)
          .single()

        if (adminError || !adminData) {
          setError("You do not have admin privileges")
          await adminAuthClient.auth.signOut()
          return
        }

        // Admin login successful
        router.push("/admin")
      } else {
        setError("Session expired. Please login again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the admin area</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!showTwoFactor ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">Two-Factor Authentication Code</Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  required
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
                <p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-muted-foreground">
            This area is restricted to authorized administrators only.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

