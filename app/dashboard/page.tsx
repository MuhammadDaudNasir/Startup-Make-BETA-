"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, BarChart3, FileSpreadsheet, Settings } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getPitches, getFundingOpportunities, type Pitch, type FundingOpportunity } from "@/lib/supabase"

export default function Dashboard() {
  const { user } = useAuth()
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [fundingOpportunities, setFundingOpportunities] = useState<FundingOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true)
        const fetchedPitches = await getPitches(user.id)
        const fetchedFunding = await getFundingOpportunities(user.id)
        setPitches(fetchedPitches)
        setFundingOpportunities(fetchedFunding)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/pitches/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Pitch
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Pitches</TabsTrigger>
          <TabsTrigger value="funding">Funding Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pitches</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pitches.length}</div>
                <p className="text-xs text-muted-foreground">
                  {pitches.length > 0
                    ? `Last updated: ${new Date(pitches[0].updated_at).toLocaleDateString()}`
                    : "No pitches yet"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Pitches</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pitches.filter((pitch) => pitch.status === "complete").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {pitches.filter((pitch) => pitch.status === "complete").length > 0
                    ? `${Math.round((pitches.filter((pitch) => pitch.status === "complete").length / pitches.length) * 100)}% completion rate`
                    : "No completed pitches yet"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Funding Opportunities</CardTitle>
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fundingOpportunities.length}</div>
                <p className="text-xs text-muted-foreground">
                  {fundingOpportunities.length > 0
                    ? `${fundingOpportunities.filter((f) => f.status === "open").length} open opportunities`
                    : "No funding opportunities yet"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Link href="/dashboard/pitches/new">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Pitch
                </Button>
              </Link>
              <Link href="/dashboard/pitches">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View My Pitches
                </Button>
              </Link>
              <Link href="/dashboard/funding">
                <Button className="w-full justify-start" variant="outline">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Manage Funding
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Pitches</CardTitle>
              <CardDescription>Your most recently created or updated pitches</CardDescription>
            </CardHeader>
            <CardContent>
              {pitches.length > 0 ? (
                <div className="space-y-4">
                  {pitches.slice(0, 3).map((pitch) => (
                    <div
                      key={pitch.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium">{pitch.startup_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {new Date(pitch.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/pitches/${pitch.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/dashboard/pitches/${pitch.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't created any pitches yet.</p>
                  <Link href="/dashboard/pitches/new">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Pitch
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
            {pitches.length > 0 && (
              <CardFooter>
                <Link href="/dashboard/pitches" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Pitches
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Opportunities</CardTitle>
              <CardDescription>Track grants and investment opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              {fundingOpportunities.length > 0 ? (
                <div className="space-y-4">
                  {fundingOpportunities.slice(0, 3).map((funding) => (
                    <div
                      key={funding.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium">{funding.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {new Date(funding.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-sm">Amount: {funding.amount}</p>
                      </div>
                      <Link href={`/dashboard/funding/${funding.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't added any funding opportunities yet.</p>
                  <Link href="/dashboard/funding">
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Funding Opportunity
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
            {fundingOpportunities.length > 0 && (
              <CardFooter>
                <Link href="/dashboard/funding" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Funding Opportunities
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

