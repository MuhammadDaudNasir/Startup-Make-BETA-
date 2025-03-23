import type React from "react"
import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/admin-auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  // If not authenticated as admin, redirect to admin login
  if (!session && !process.env.SKIP_ADMIN_AUTH) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

