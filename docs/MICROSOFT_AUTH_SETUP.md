# 🔐 Microsoft Entra ID (Single-Tenant) Setup Guide

This document outlines the step-by-step procedure for configuring **Microsoft Entra ID (formerly Azure Active Directory)** for the **AI Placement Prep** college platform.

---

## 🏛️ 1. Create a Microsoft Entra App Registration

1. Log in to the [Microsoft Entra Admin Center](https://entra.microsoft.com/) using an account with **Application Administrator** or **Global Administrator** privileges in your college tenant.
2. In the left navigation menu, go to **Identity** $\rightarrow$ **Applications** $\rightarrow$ **App registrations**.
3. Click **+ New registration**.
4. Configure the application:
   - **Name:** `AI Placement Prep — [College Name]` (e.g., `AI Placement Prep — NIET`).
   - **Supported account types:** Select **Accounts in this organizational directory only ([College Name] only - Single tenant)**.
     > ⚠️ **Important:** Selecting Single Tenant ensures that personal Microsoft accounts (Outlook, Live, Hotmail) and accounts from other universities/enterprises cannot authenticate.
5. **Redirect URI (Web):**
   - Platform: Select **Web**.
   - Development URI: `http://localhost:3000/api/auth/callback/azure-ad`
   - *(You can add your production URL later e.g. `https://placement-prep.college.edu/api/auth/callback/azure-ad`)*.
6. Click **Register**.

---

## 📋 2. Obtain Client ID & Tenant ID

From the application's **Overview** blade:
- **Application (client) ID:** Copy the 36-character GUID (e.g., `12345678-abcd-1234-abcd-1234567890ab`).
- **Directory (tenant) ID:** Copy the 36-character GUID (e.g., `87654321-dcba-4321-dcba-ba0987654321`).

---

## 🔑 3. Create a Client Secret

1. Under **Manage**, select **Certificates & secrets**.
2. Click **+ New client secret**.
3. Description: `AI Placement Prep Web Client Secret`.
4. Expires: Select recommended duration (e.g., **24 months**).
5. Click **Add**.
6. **Copy the `Value` immediately** (the secret value is hidden permanently once you navigate away).

---

## 🛡️ 4. Configure Minimal API Permissions (Principle of Least Privilege)

1. Under **Manage**, select **API permissions**.
2. Verify that **Microsoft Graph** has the following delegated permission:
   - **`User.Read`** (*Sign in and read user profile*).
3. Do **NOT** add broad directory, mailbox, or administrative permissions.

---

## ⚙️ 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Application Branding
NEXT_PUBLIC_APP_NAME="AI Placement Prep"
COLLEGE_NAME="National Institute of Engineering & Technology"
COLLEGE_EMAIL_DOMAIN="niet.ac.in"

# NextAuth Session Secret (Generate with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_32_character_random_secret"

# Microsoft Entra ID Single Tenant Configuration
MICROSOFT_CLIENT_ID="your_application_client_id"
MICROSOFT_CLIENT_SECRET="your_client_secret_value"
MICROSOFT_TENANT_ID="your_directory_tenant_id"
MICROSOFT_REDIRECT_URI="http://localhost:3000/api/auth/callback/azure-ad"

# Supabase / PostgreSQL Database
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your_supabase_anon_key"
```

> 🚨 **SECURITY RULE:** `.env.local` is added to `.gitignore` and must **NEVER** be committed to Git. In production, configure these variables directly in your cloud hosting environment (e.g., Vercel / AWS / Docker Environment Variables).

---

## 🔒 6. Tenant Validation Logic

The platform validates the tenant on the server side:

```
[ Microsoft OAuth Callback ]
            │
            ▼
[ Read 'tid' claim from validated token ]
            │
            ├─► Matches MICROSOFT_TENANT_ID ──► Allow Access ──► Provision/Find User in DB
            │
            └─► Does NOT Match (Personal/Other) ──► Destroy Session ──► Redirect /login?error=WrongOrganization
```

---

## 🧪 7. Authentication Testing Checklist

| Test Case | Expected Behavior |
| :--- | :--- |
| **New College Student Login** | Authenticates $\rightarrow$ Provisions user & student profile $\rightarrow$ Redirects to `/onboarding/profile`. |
| **Returning Student Login** | Authenticates $\rightarrow$ Recognizes existing record $\rightarrow$ Redirects directly to `/dashboard`. |
| **Wrong Organization / Tenant** | Blocked with message: *"This account is not authorized to access the college placement platform."* |
| **Personal Microsoft Account** | Blocked with message: *"Please sign in using your official college Microsoft account."* |
| **Cancelled Login** | Returns to `/login` with message: *"Sign-in was cancelled. Please try again."* |
| **Direct URL to `/dashboard` (Unauthenticated)** | Middleware intercepts and redirects to `/login?callbackUrl=/dashboard`. |
| **Sign Out** | Invalidation of session cookies $\rightarrow$ Clean redirect to `/login`. |
| **Mobile & Keyboard Navigation** | Responsive two-to-one column shift, full keyboard accessibility, WCAG contrast. |
