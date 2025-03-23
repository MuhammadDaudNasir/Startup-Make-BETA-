import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Admin Supabase client (separate from user client)
const adminSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqslnwhbkpwujinztiah.supabase.co"
const adminSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const adminAuthClient = createClient(adminSupabaseUrl, adminSupabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// Check if user is an admin
export async function isAdmin(userId: string) {
  const { data, error } = await adminAuthClient.from("admin_users").select("*").eq("user_id", userId).single()

  if (error || !data) {
    return false
  }

  return true
}

// Server-side admin auth check
export async function getAdminSession() {
  const cookieStore = cookies()
  const supabaseAdmin = createClient(adminSupabaseUrl, adminSupabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  const {
    data: { session },
  } = await supabaseAdmin.auth.getSession()

  if (!session) {
    return null
  }

  const isUserAdmin = await isAdmin(session.user.id)

  if (!isUserAdmin) {
    return null
  }

  return session
}

// Enable 2FA for an admin user
export async function enableAdminTwoFactor(userId: string) {
  const { data, error } = await adminAuthClient.auth.mfa.enroll({
    factorType: "totp",
  })

  if (error) {
    throw error
  }

  return {
    factorId: data.id,
    qrCode: data.totp.qr_code,
    secret: data.totp.secret,
  }
}

// Verify 2FA code
export async function verifyTwoFactorCode(factorId: string, code: string) {
  const { data, error } = await adminAuthClient.auth.mfa.challenge({
    factorId,
    code,
  })

  if (error) {
    throw error
  }

  return data
}

// Authenticate with 2FA
export async function authenticateWithTwoFactor(factorId: string, code: string) {
  const { data, error } = await adminAuthClient.auth.mfa.verify({
    factorId,
    code,
  })

  if (error) {
    throw error
  }

  return data
}

