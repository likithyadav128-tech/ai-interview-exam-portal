# 🎓 AI Placement Prep — College-Only Authentication & Foundation

A production-grade, college-only **AI Placement Preparation Platform** foundation built with **Next.js (App Router), TypeScript, Tailwind CSS, NextAuth (Microsoft Entra ID Single Tenant), and Supabase PostgreSQL**.

---

## 🏛️ Architecture Overview

```
                               ┌──────────────────────────────────────────────┐
                               │  STUDENT WITH COLLEGE MICROSOFT 365 ACCOUNT  │
                               └──────────────────────┬───────────────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────┐
                                       │  NextAuth (Azure AD Provider)│
                                       │  OAuth 2.0 PKCE / OIDC       │
                                       └──────────────┬───────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────┐
                                       │   TENANT VALIDATION ENGINE   │
                                       │   (Matches College Tenant ID)│
                                       └──────┬────────────────┬──────┘
                                              │                │
                             [MATCH]          ▼                ▼          [MISMATCH]
                    ┌──────────────────────────────┐      ┌──────────────────────────────┐
                    │ Find / Provision User in DB  │      │ Reject Access & Kill Session │
                    │ (users + student_profiles)   │      │ Redirect /login?error=...    │
                    └──────────────┬───────────────┘      └──────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
        [FIRST-TIME LOGIN]               [RETURNING STUDENT]
        (profile_completed = false)      (profile_completed = true)
        /onboarding/profile              /dashboard
```

---

## 🚀 Key Features

1. **Strict College-Only Microsoft Single Sign-On:**
   - Single Tenant authentication powered by Microsoft Entra ID.
   - Automatically rejects personal Microsoft accounts (`@outlook.com`, `@hotmail.com`) and external organizations.
   - Zero passwords stored, zero separate credentials created.
2. **First-Time vs Returning Student Automatic Routing:**
   - First-time login automatically creates database records in `users` and `student_profiles` and routes to `/onboarding/profile`.
   - Returning students with completed profiles are routed directly to `/dashboard`.
3. **Split-Screen Academic Visual Design:**
   - Left: Institutional branding, college logo, abstract AI/career analytics visual, and value propositions.
   - Right: Centered, minimal, professional authentication card.
4. **Accessible & Responsive:**
   - Light (default) & Dark mode support with WCAG-compliant contrast.
   - Mobile-optimized single column layout.
   - Full keyboard navigation and screen-reader error announcements.
5. **Central Rebrandable Configuration:**
   - Replaceable college logo at `/public/branding/college-logo.svg`.
   - Central configuration in `src/config/branding.ts`.

---

## 📂 Project Structure

```
├── public/
│   └── branding/
│       ├── college-logo.svg           # Replaceable college logo asset
│       └── product-logo.svg           # Product badge asset
├── docs/
│   └── MICROSOFT_AUTH_SETUP.md        # Step-by-step Azure Entra ID guide
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/    # NextAuth API route handler
│   │   ├── dashboard/page.tsx         # Authenticated student dashboard
│   │   ├── onboarding/profile/page.tsx# First-time profile setup placeholder
│   │   ├── login/page.tsx             # Split-screen responsive login page
│   │   ├── globals.css                # Tailwind CSS variables & design tokens
│   │   ├── layout.tsx                 # Root layout with SessionProvider
│   │   └── page.tsx                   # Server-side root redirector
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthCard.tsx           # Authentication card component
│   │   │   ├── AuthError.tsx          # Accessible error alerts
│   │   │   ├── AuthVisual.tsx         # Abstract AI analytics visual
│   │   │   └── MicrosoftSignInButton.tsx # Official Microsoft button
│   │   ├── branding/
│   │   │   ├── CollegeLogo.tsx        # Dynamic college logo component
│   │   │   └── ProductLogo.tsx        # Dynamic product logo component
│   │   └── providers/
│   │       └── AuthProvider.tsx       # NextAuth SessionProvider wrapper
│   ├── config/
│   │   └── branding.ts                # Central college/product branding config
│   ├── lib/
│   │   ├── auth/
│   │   │   └── authOptions.ts         # NextAuth Azure AD & tenant validation engine
│   │   └── db/
│   │       ├── schema.sql             # PostgreSQL / Supabase migration schema
│   │       ├── supabaseClient.ts      # Supabase client initialization
│   │       ├── types.ts               # Database & session TypeScript interfaces
│   │       └── userService.ts         # User provisioning & profile tracking
│   └── middleware.ts                  # Server-side protected routes middleware
├── .env.example                       # Environment variables template
├── next.config.mjs                    # Next.js configuration
├── tailwind.config.mjs                # Tailwind theme tokens
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies & scripts
```

---

## ⚙️ Environment Variables

Create `.env.local` in your project root:

```env
# Application Branding
NEXT_PUBLIC_APP_NAME="AI Placement Prep"
COLLEGE_NAME="National Institute of Engineering & Technology"
COLLEGE_EMAIL_DOMAIN="niet.ac.in"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_32_character_generated_secret"

# Microsoft Entra ID (Single Tenant)
MICROSOFT_CLIENT_ID="your_application_client_id"
MICROSOFT_CLIENT_SECRET="your_client_secret_value"
MICROSOFT_TENANT_ID="your_college_tenant_id"
MICROSOFT_REDIRECT_URI="http://localhost:3000/api/auth/callback/azure-ad"

# Supabase / PostgreSQL Database
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your_supabase_anon_key"
```

---

## 🧪 Testing Checklist

- [x] **New Student Sign-In:** Authenticates via Microsoft $\rightarrow$ auto-provisions account $\rightarrow$ redirects to `/onboarding/profile`.
- [x] **Returning Student Sign-In:** Authenticates $\rightarrow$ recognizes completed profile $\rightarrow$ redirects to `/dashboard`.
- [x] **Wrong Organization / Personal Account:** Tenant validation rejects access with clear, friendly error messages.
- [x] **Server-Side Route Protection:** Unauthenticated access to `/dashboard` or `/onboarding/*` is redirected to `/login`.
- [x] **Secure Logout:** Invalidation of session token $\rightarrow$ clean redirect to `/login`.
- [x] **Mobile Responsiveness:** Clean two-to-one column shift with large touch targets.
