import { AuthEmailTemplate } from "@/components/email-templates/auth-email-template"

export default function EmailTemplatesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Email Templates Preview</h1>

      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Magic Link Email</h2>
        <iframe
          srcDoc={AuthEmailTemplate({
            type: "magic-link",
            actionUrl: "https://startuppitchmaker.com/auth/callback",
            username: "Muhammad",
          }).toString()}
          className="w-full h-[600px] border rounded"
        />
      </div>

      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Reset Password Email</h2>
        <iframe
          srcDoc={AuthEmailTemplate({
            type: "reset-password",
            actionUrl: "https://startuppitchmaker.com/auth/reset-password",
            username: "Muhammad",
          }).toString()}
          className="w-full h-[600px] border rounded"
        />
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
        <iframe
          srcDoc={AuthEmailTemplate({
            type: "verify-email",
            actionUrl: "https://startuppitchmaker.com/auth/verify",
            username: "Muhammad",
          }).toString()}
          className="w-full h-[600px] border rounded"
        />
      </div>
    </div>
  )
}

