import { AuthEmailTemplate } from "@/components/email-templates/auth-email-template"
import { renderToStaticMarkup } from "react-dom/server"

export function generateMagicLinkEmail(actionUrl: string, username?: string): string {
  return renderToStaticMarkup(
    AuthEmailTemplate({
      type: "magic-link",
      actionUrl,
      username,
    }),
  )
}

export function generateResetPasswordEmail(actionUrl: string, username?: string): string {
  return renderToStaticMarkup(
    AuthEmailTemplate({
      type: "reset-password",
      actionUrl,
      username,
    }),
  )
}

export function generateVerifyEmailTemplate(actionUrl: string, username?: string): string {
  return renderToStaticMarkup(
    AuthEmailTemplate({
      type: "verify-email",
      actionUrl,
      username,
    }),
  )
}

