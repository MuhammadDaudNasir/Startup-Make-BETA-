import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, FileSpreadsheet, Calendar, DollarSign, Edit, Trash2 } from "lucide-react"

export default function Funding() {
  const grants = [
    {
      id: 1,
      name: "Tech Innovation Grant",
      organization: "National Science Foundation",
      amount: "$50,000",
      deadline: "June 30, 2025",
      status: "Open",
    },
    {
      id: 2,
      name: "Green Energy Initiative",
      organization: "Department of Energy",
      amount: "$75,000",
      deadline: "August 15, 2025",
      status: "Open",
    },
    {
      id: 3,
      name: "Digital Transformation Fund",
      organization: "Tech Industry Association",
      amount: "$25,000",
      deadline: "May 10, 2025",
      status: "Applied",
    },
  ]

  const investors = [
    {
      id: 1,
      name: "Seed Round - Angel Investors",
      type: "Angel",
      target: "$250,000",
      raised: "$100,000",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Venture Capital Series A",
      type: "VC",
      target: "$2,000,000",
      raised: "$0",
      status: "Planned",
    },
    {
      id: 3,
      name: "Strategic Partnership Investment",
      type: "Corporate",
      target: "$500,000",
      raised: "$500,000",
      status: "Completed",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Funding Details</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Funding
        </Button>
      </div>

      <Tabs defaultValue="grants" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grants">Grants & Funds</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="grants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grants & Funds</CardTitle>
              <CardDescription>Track grant applications and funding opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search grants..." className="pl-8" />
                </div>
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-2">Name</div>
                  <div>Amount</div>
                  <div>Deadline</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>

                {grants.map((grant) => (
                  <div key={grant.id} className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0">
                    <div className="col-span-2 flex flex-col">
                      <span className="font-medium">{grant.name}</span>
                      <span className="text-sm text-muted-foreground">{grant.organization}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {grant.amount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {grant.deadline}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          grant.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : grant.status === "Applied"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {grant.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investors</CardTitle>
              <CardDescription>Track investment rounds and investor relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search investors..." className="pl-8" />
                </div>
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                  <div className="col-span-2">Name</div>
                  <div>Type</div>
                  <div>Target/Raised</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>

                {investors.map((investor) => (
                  <div key={investor.id} className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0">
                    <div className="col-span-2 flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                      <span>{investor.name}</span>
                    </div>
                    <div>{investor.type}</div>
                    <div className="flex flex-col">
                      <span className="text-sm">Target: {investor.target}</span>
                      <span className="text-sm">Raised: {investor.raised}</span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          investor.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : investor.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {investor.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

