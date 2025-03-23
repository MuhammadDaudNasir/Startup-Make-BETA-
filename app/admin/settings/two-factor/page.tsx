"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"
import { adminAuthClient, enableAdminTwoFactor, verifyTwoFactorCode } from "@/lib/admin-auth"

export default function AdminTwoFactorPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasTwoFactor, setHasTwoFactor] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")

  useEffect(() => {
    async function checkTwoFactorStatus() {
      try {
        const { data, error } = await adminAuthClient.auth.mfa.getAuthenticatorAssuranceLevel()

        if (error) {
          setError(error.message)
          return
        }

        setHasTwoFactor(data.currentLevel === "aal2" || data.currentFactors.length > 0)
      } catch (err) {
        console.error(err)
        setError("Failed to check two-factor status")
      } finally {
        setIsLoading(false)
      }
    }

    checkTwoFactorStatus()
  }, [])

  const handleEnableTwoFactor = async () => {
    setIsEnrolling(true)
    setError(null)
    setSuccess(null)

    try {
      const { data: session } = await adminAuthClient.auth.getSession()

      if (!session.session) {
        setError("You must be logged in")
        return
      }

      const { factorId, qrCode, secret } = await enableAdminTwoFactor(session.session.user.id)

      setFactorId(factorId)
      setQrCode(qrCode)
      setSecret(secret)
    } catch (err: any) {
      setError(err.message || "Failed to enable two-factor authentication")
      console.error(err)
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleVerifyTwoFactor = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!factorId) {
        setError("Factor ID is missing")
        return
      }

      await verifyTwoFactorCode(factorId, verificationCode)

      setSuccess("Two-factor authentication has been enabled successfully")
      setHasTwoFactor(true)
      setQrCode(null)
      setSecret(null)
      setFactorId(null)
      setVerificationCode("")
    } catch (err: any) {
      setError(err.message || "Failed to verify code")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Two-Factor Authentication</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Secure your admin account with two-factor authentication</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {hasTwoFactor && !qrCode ? (
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-medium">Two-Factor Authentication is Enabled</h3>
                <p className="text-sm text-muted-foreground">
                  Your account is protected with an additional layer of security.
                </p>
              </div>
            </div>
          ) : qrCode ? (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Scan this QR code with your authenticator app</h3>
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <img src={qrCode || "/placeholder.svg"} alt="QR Code" width={200} height={200} />
                  </div>
                </div>
                {secret && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Or enter this code manually:</p>
                    <code className="bg-muted-foreground/20 px-2 py-1 rounded text-sm font-mono">{secret}</code>
                  </div>
                )}
              </div>

              <form onSubmit={handleVerifyTwoFactor} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
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
                    "Verify and Enable"
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Why use Two-Factor Authentication?</h3>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account. In addition to your
                  password, you'll need a code from your authenticator app to sign in.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Recommended Authenticator Apps:</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Google Authenticator (Android/iOS)</li>
                  <li>Microsoft Authenticator (Android/iOS)</li>
                  <li>Authy (Android/iOS/Desktop)</li>
                  <li>1Password (Android/iOS/Desktop)</li>
                </ul>
              </div>

              <Button onClick={handleEnableTwoFactor} disabled={isEnrolling}>
                {isEnrolling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Enable Two-Factor Authentication"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

