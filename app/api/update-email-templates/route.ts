import { NextResponse } from "next/server"
import { updateSupabaseEmailTemplates } from "@/lib/supabase-admin"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Verify the token and check if user is admin
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })

    // Verify the token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Check if user is admin
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (adminError || !adminData) {
      return NextResponse.json({ error: "Not authorized as admin" }, { status: 403 })
    }

    // User is authenticated and is an admin, update email templates
    await updateSupabaseEmailTemplates()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating email templates:", error)
    return NextResponse.json({ error: "Failed to update email templates" }, { status: 500 })
  }
}

