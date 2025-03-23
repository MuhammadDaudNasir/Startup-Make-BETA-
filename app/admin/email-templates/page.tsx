"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { adminAuthClient } from "@/lib/admin-auth"

export default function AdminEmailTemplatesPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null)

  const updateTemplates = async () => {
    setIsUpdating(true)
    setResult(null)

    try {
      // Get the current session token
      const { data: sessionData } = await adminAuthClient.auth.getSession()

      if (!sessionData.session) {
        setResult({ error: "You must be logged in" })
        return
      }

      const response = await fetch("/api/update-email-templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true })
      } else {
        setResult({ error: data.error || "Failed to update templates" })
      }
    } catch (error) {
      setResult({ error: "An unexpected error occurred" })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Email Templates Administration</h1>

      <Card>
        <CardHeader>
          <CardTitle>Update Supabase Email Templates</CardTitle>
          <CardDescription>
            This will update the email templates used for magic links, password reset, and email verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to update all email templates in Supabase.</p>

          {result && (
            <div
              className={`p-4 mb-4 rounded-md ${result.success ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}
            >
              {result.success ? "Email templates updated successfully!" : result.error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={updateTemplates} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Templates...
              </>
            ) : (
              "Update Email Templates"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

