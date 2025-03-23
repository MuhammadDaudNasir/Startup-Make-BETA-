"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save } from "lucide-react"

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Muhammad Daud Nasir" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="muhammad@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="Innovative Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Entrepreneur and innovator with a passion for technology solutions."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure your OpenAI API for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <Input id="api-key" type="password" defaultValue="sk-••••••••••••••••••••••" />
                <p className="text-sm text-muted-foreground">
                  Your API key is stored securely and used for AI analysis of your pitches.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <Input id="model" defaultValue="gpt-4" />
                <p className="text-sm text-muted-foreground">
                  The OpenAI model to use for analysis. We recommend GPT-4 for best results.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="advanced-analysis" defaultChecked />
                <Label htmlFor="advanced-analysis">Enable Advanced Analysis</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save API Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">PDF Generation</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="custom-branding" defaultChecked />
                  <Label htmlFor="custom-branding">Include Custom Branding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-generate" defaultChecked />
                  <Label htmlFor="auto-generate">Auto-generate PDF on completion</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="deadline-reminders" defaultChecked />
                  <Label htmlFor="deadline-reminders">Funding Deadline Reminders</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Display</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="compact-view" />
                  <Label htmlFor="compact-view">Compact View</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

