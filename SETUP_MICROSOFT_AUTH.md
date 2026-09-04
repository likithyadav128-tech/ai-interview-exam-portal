# 🔐 Microsoft Entra ID (Azure AD) Authentication Setup Guide

This application integrates the official **Microsoft Authentication Library for JavaScript (`@azure/msal-browser`)** using **OAuth 2.0 Authorization Code Flow with PKCE** and **OpenID Connect**.

---

## 🚀 1. Register Application in Microsoft Entra Admin Center

1. Navigate to the [Microsoft Entra Admin Center](https://entra.microsoft.com/) (or [Azure Portal](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)).
2. Go to **Identity** $\rightarrow$ **Applications** $\rightarrow$ **App registrations**.
3. Click **+ New registration**.
4. Configure the registration:
   - **Name:** `AI Placement & Career Portal` (or your university/company name).
   - **Supported account types:**
     - *Accounts in any organizational directory and personal Microsoft accounts* (Multi-tenant + Personal accounts).
     - OR *Accounts in this organizational directory only* (University/Company single-tenant).
   - **Redirect URI:**
     - Select **Single-page application (SPA)** from the platform dropdown.
     - Enter your development URI: `http://localhost:3000`
     - *(Add your production domain e.g. `https://your-app.streamlit.app` or `https://your-domain.vercel.app` later)*.
5. Click **Register**.

---

## 📋 2. Copy Client ID and Tenant ID

From the **Overview** page of your registered application, copy:
- **Application (client) ID** (e.g. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- **Directory (tenant) ID** (e.g. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` or use `common` for multi-tenant)

---

## 🛡️ 3. Configure API Permissions (Least Privilege)

Under **Manage** $\rightarrow$ **API permissions**:
- Verify **Microsoft Graph** has delegated permission **`User.Read`** (Sign in and read user profile).
- No sensitive or administrative permissions are required.

---

## ⚙️ 4. Set Environment Variables

Create a file named `.env.local` in the project root:

```env
# Application (client) ID from Microsoft Entra App Registration
VITE_MICROSOFT_CLIENT_ID=your_client_id_here

# Directory (tenant) ID (Use 'common' for multi-tenant or your specific Tenant ID)
VITE_MICROSOFT_TENANT_ID=common

# Redirect URI (Optional, defaults to window.location.origin)
VITE_MICROSOFT_REDIRECT_URI=http://localhost:3000
```

---

## 🧪 5. Testing the Authentication Flow

1. **Development Mode:**
   - If `VITE_MICROSOFT_CLIENT_ID` is not set yet, the portal automatically operates in safe **Development SSO Mode**, allowing instant 1-click test access.
2. **Production Mode:**
   - When `.env.local` contains a valid Client ID, clicking **"Continue with Microsoft"** opens the official Microsoft sign-in popup dialog, authenticates your account, retrieves basic profile info (`name`, `email`), and seamlessly redirects into the student/university dashboard.
3. **Logout:**
   - Clicking **Sign Out** cleanly destroys the MSAL session and returns to the login page.
