import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileText, Download, Edit, Trash2 } from "lucide-react"

export default function Pitches() {
  const pitches = [
    {
      id: 1,
      name: "AI-Powered Healthcare Solution",
      industry: "Healthcare",
      stage: "Seed",
      lastUpdated: "2 days ago",
      status: "Draft",
    },
    {
      id: 2,
      name: "Sustainable Energy Platform",
      industry: "Energy",
      stage: "Pre-Seed",
      lastUpdated: "1 week ago",
      status: "Complete",
    },
    {
      id: 3,
      name: "EdTech Learning Management System",
      industry: "Education",
      stage: "Series A",
      lastUpdated: "2 weeks ago",
      status: "Complete",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Pitches</h1>
        <Link href="/dashboard/pitches/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Pitch
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pitches</CardTitle>
          <CardDescription>Manage and organize all your startup pitches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search pitches..." className="pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-2">Name</div>
              <div>Industry</div>
              <div>Stage</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {pitches.map((pitch) => (
              <div key={pitch.id} className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0">
                <div className="col-span-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{pitch.name}</span>
                </div>
                <div>{pitch.industry}</div>
                <div>{pitch.stage}</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      pitch.status === "Complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pitch.status}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

