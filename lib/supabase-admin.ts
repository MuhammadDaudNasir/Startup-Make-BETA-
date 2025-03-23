import { createClient } from "@supabase/supabase-js"
import { generateMagicLinkEmail, generateResetPasswordEmail, generateVerifyEmailTemplate } from "./email-templates"

// This file is for server-side Supabase admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aqslnwhbkpwujinztiah.supabase.co"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Check if the URL and key are available
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase admin client not initialized: missing URL or service role key")
}

export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

export async function updateSupabaseEmailTemplates() {
  if (!supabaseAdmin) {
    console.error("Supabase admin client not initialized")
    return
  }

  try {
    // Update magic link template
    await supabaseAdmin.auth.admin.updateEmailTemplate({
      type: "magiclink",
      template: generateMagicLinkEmail("{{ .ConfirmationURL }}", "{{ .Email }}"),
      subject: "Your Magic Link for Startup Pitch Maker",
    })

    // Update reset password template
    await supabaseAdmin.auth.admin.updateEmailTemplate({
      type: "recovery",
      template: generateResetPasswordEmail("{{ .ConfirmationURL }}", "{{ .Email }}"),
      subject: "Reset Your Startup Pitch Maker Password",
    })

    // Update email confirmation template
    await supabaseAdmin.auth.admin.updateEmailTemplate({
      type: "confirmation",
      template: generateVerifyEmailTemplate("{{ .ConfirmationURL }}", "{{ .Email }}"),
      subject: "Verify Your Startup Pitch Maker Email",
    })

    console.log("Email templates updated successfully")
  } catch (error) {
    console.error("Error updating email templates:", error)
  }
}

