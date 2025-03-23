/*
 * This script adds a user as an admin
 * Run with: npx tsx scripts/add-admin-user.ts <email>
 */

import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import { resolve } from "path"

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or service role key")
  process.exit(1)
}

const email = process.argv[2]

if (!email) {
  console.error("Please provide an email address")
  process.exit(1)
}

async function addAdminUser() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // First, check if the user exists
    const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email)

    if (userError) {
      console.error("Error finding user:", userError.message)
      process.exit(1)
    }

    if (!userData.user) {
      console.error("User not found. Please create the user first.")
      process.exit(1)
    }

    // Check if user is already an admin
    const { data: existingAdmin, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", userData.user.id)
      .single()

    if (existingAdmin) {
      console.log(`User ${email} is already an admin.`)
      process.exit(0)
    }

    // Add user to admin_users table
    const { data, error } = await supabase.from("admin_users").insert([{ user_id: userData.user.id }])

    if (error) {
      console.error("Error adding admin user:", error.message)
      process.exit(1)
    }

    console.log(`Successfully added ${email} as an admin user.`)
    console.log("Please ensure this user sets up 2FA for enhanced security.")
  } catch (error) {
    console.error("Unexpected error:", error)
    process.exit(1)
  }
}

addAdminUser()

