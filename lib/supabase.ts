import { createClient } from "@supabase/supabase-js"

// Use hardcoded values as fallbacks if environment variables are not available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqslnwhbkpwujinztiah.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxc2xud2hia3B3dWppbnp0aWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNzg2MzgsImV4cCI6MjA1Nzk1NDYzOH0.uNFcZ2BZJ_91tWSN1dkyHN2lQZ3P4b_PurGmZT0_4sQ"

// Check if the URL and key are available
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserProfile = {
  id: string
  email: string
  full_name: string
  company_name: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
}

export type Pitch = {
  id: string
  user_id: string
  startup_name: string
  tagline: string
  industry: string
  description: string
  problem: string
  solution: string
  market: string
  competition: string
  business_model: string
  funding_stage: string
  amount_seeking: string
  use_of_funds: string
  financial_projections: string
  status: "draft" | "complete"
  created_at: string
  updated_at: string
}

export type FundingOpportunity = {
  id: string
  user_id: string
  name: string
  organization: string
  type: "grant" | "investor" | "accelerator"
  amount: string
  deadline: string
  status: "open" | "applied" | "closed" | "awarded"
  notes: string
  created_at: string
  updated_at: string
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data as UserProfile
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase.from("profiles").update(updates).eq("id", userId)

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

export async function getPitches(userId: string): Promise<Pitch[]> {
  const { data, error } = await supabase
    .from("pitches")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching pitches:", error)
    return []
  }

  return data as Pitch[]
}

export async function getPitch(pitchId: string): Promise<Pitch | null> {
  const { data, error } = await supabase.from("pitches").select("*").eq("id", pitchId).single()

  if (error) {
    console.error("Error fetching pitch:", error)
    return null
  }

  return data as Pitch
}

export async function createPitch(userId: string, pitchData: Partial<Pitch>): Promise<string | null> {
  const { data, error } = await supabase
    .from("pitches")
    .insert([
      {
        user_id: userId,
        ...pitchData,
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating pitch:", error)
    return null
  }

  return data[0].id
}

export async function updatePitch(pitchId: string, updates: Partial<Pitch>) {
  const { error } = await supabase
    .from("pitches")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pitchId)

  if (error) {
    console.error("Error updating pitch:", error)
    throw error
  }
}

export async function deletePitch(pitchId: string) {
  const { error } = await supabase.from("pitches").delete().eq("id", pitchId)

  if (error) {
    console.error("Error deleting pitch:", error)
    throw error
  }
}

export async function getFundingOpportunities(userId: string): Promise<FundingOpportunity[]> {
  const { data, error } = await supabase
    .from("funding_opportunities")
    .select("*")
    .eq("user_id", userId)
    .order("deadline", { ascending: true })

  if (error) {
    console.error("Error fetching funding opportunities:", error)
    return []
  }

  return data as FundingOpportunity[]
}

export async function createFundingOpportunity(
  userId: string,
  fundingData: Partial<FundingOpportunity>,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("funding_opportunities")
    .insert([
      {
        user_id: userId,
        ...fundingData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating funding opportunity:", error)
    return null
  }

  return data[0].id
}

export async function updateFundingOpportunity(fundingId: string, updates: Partial<FundingOpportunity>) {
  const { error } = await supabase
    .from("funding_opportunities")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", fundingId)

  if (error) {
    console.error("Error updating funding opportunity:", error)
    throw error
  }
}

export async function deleteFundingOpportunity(fundingId: string) {
  const { error } = await supabase.from("funding_opportunities").delete().eq("id", fundingId)

  if (error) {
    console.error("Error deleting funding opportunity:", error)
    throw error
  }
}

