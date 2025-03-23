import type React from "react"

interface AuthEmailTemplateProps {
  type: "magic-link" | "reset-password" | "verify-email"
  actionUrl: string
  username?: string
}

export const AuthEmailTemplate: React.FC<AuthEmailTemplateProps> = ({ type, actionUrl, username = "there" }) => {
  const titles = {
    "magic-link": "Your Magic Link",
    "reset-password": "Reset Your Password",
    "verify-email": "Verify Your Email",
  }

  const descriptions = {
    "magic-link": "Click the button below to sign in to your account. This link will expire in 24 hours.",
    "reset-password": "Click the button below to reset your password. This link will expire in 24 hours.",
    "verify-email": "Click the button below to verify your email address.",
  }

  const buttonTexts = {
    "magic-link": "Sign In",
    "reset-password": "Reset Password",
    "verify-email": "Verify Email",
  }

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{titles[type]}</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #f9fafb;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
              color: #111827;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            
            .header {
              text-align: center;
              padding: 20px 0;
            }
            
            .logo {
              margin-bottom: 20px;
            }
            
            .content {
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              padding: 40px;
              margin-bottom: 20px;
            }
            
            .title {
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 16px;
              color: #111827;
            }
            
            .description {
              font-size: 16px;
              line-height: 24px;
              color: #4b5563;
              margin-bottom: 32px;
            }
            
            .button {
              display: inline-block;
              background: linear-gradient(90deg, #3b82f6, #2563eb, #4f46e5);
              color: #ffffff;
              font-weight: 600;
              font-size: 16px;
              text-decoration: none;
              padding: 12px 32px;
              border-radius: 8px;
              margin-bottom: 24px;
            }
            
            .note {
              font-size: 14px;
              color: #6b7280;
              margin-top: 24px;
            }
            
            .footer {
              text-align: center;
              padding: 20px 0;
              font-size: 14px;
              color: #6b7280;
            }
            
            .divider {
              height: 1px;
              background-color: #e5e7eb;
              margin: 24px 0;
            }
            
            .help {
              font-size: 14px;
              color: #6b7280;
            }
            
            @media only screen and (max-width: 600px) {
              .content {
                padding: 24px;
              }
              
              .title {
                font-size: 20px;
              }
              
              .description {
                font-size: 14px;
              }
              
              .button {
                font-size: 14px;
                padding: 10px 24px;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="logo">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18H17V16H7V18Z" fill="#3B82F6" />
                <path d="M17 14H7V12H17V14Z" fill="#3B82F6" />
                <path d="M7 10H11V8H7V10Z" fill="#3B82F6" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
                  fill="#3B82F6"
                />
              </svg>
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>Startup Pitch Maker</div>
          </div>

          <div className="content">
            <h1 className="title">Hi {username},</h1>
            <p className="description">{descriptions[type]}</p>

            <div style={{ textAlign: "center" }}>
              <a href={actionUrl} className="button">
                {buttonTexts[type]}
              </a>
            </div>

            <div className="note">If you didn't request this email, you can safely ignore it.</div>

            <div className="divider"></div>

            <div className="help">
              <p>
                Need help? Contact our support team at{" "}
                <a href="mailto:support@startuppitchmaker.com" style={{ color: "#3b82f6" }}>
                  support@startuppitchmaker.com
                </a>
              </p>
            </div>
          </div>

          <div className="footer">
            <p>&copy; {new Date().getFullYear()} Startup Pitch Maker. All rights reserved.</p>
            <p>Muhammad Daud Nasir</p>
          </div>
        </div>
      </body>
    </html>
  )
}

