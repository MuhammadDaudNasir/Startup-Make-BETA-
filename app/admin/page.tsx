import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Users, Settings } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Manage authentication email templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Update the email templates used for magic links, password reset, and email verification.
            </p>
            <Link href="/admin/email-templates">
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Manage Email Templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              View, edit, and manage user accounts, roles, and permissions.
            </p>
            <Link href="/admin/users">
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Settings</CardTitle>
            <CardDescription>Configure admin account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">Manage your admin account, security settings, and 2FA.</p>
            <Link href="/admin/settings">
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Admin Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

