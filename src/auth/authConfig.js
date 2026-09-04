import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

/**
 * Microsoft Entra ID / Microsoft Identity Platform Configuration
 * 
 * Configurable via environment variables (.env / .env.local):
 * - VITE_MICROSOFT_CLIENT_ID: Application (client) ID from Azure Portal
 * - VITE_MICROSOFT_TENANT_ID: Directory (tenant) ID (or "common" / "organizations")
 * - VITE_MICROSOFT_REDIRECT_URI: Registered redirect URI (defaults to window.location.origin)
 */

const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID || "";
const tenantId = import.meta.env.VITE_MICROSOFT_TENANT_ID || "common";
const redirectUri = import.meta.env.VITE_MICROSOFT_REDIRECT_URI || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

// Check if valid client ID is provided
export const isMsalConfigured = Boolean(clientId && clientId !== "YOUR_MICROSOFT_CLIENT_ID_HERE");

export const msalConfig = {
  auth: {
    clientId: isMsalConfigured ? clientId : "00000000-0000-0000-0000-000000000000",
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage", // "sessionStorage" is safer against XSS than localStorage
    storeAuthStateInCookie: false, // Set to true only if supporting legacy IE11/Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) {
          console.error(`[MSAL Error] ${message}`);
        } else if (level === LogLevel.Warning) {
          console.warn(`[MSAL Warning] ${message}`);
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

/**
 * Minimal Scopes requested for University / SaaS authentication (Principle of Least Privilege)
 * - openid: Required for OpenID Connect ID token
 * - profile: Basic profile info (name, given_name, family_name)
 * - email: User's primary university/work email address
 * - User.Read: Basic Microsoft Graph profile access
 */
export const loginRequest = {
  scopes: ["openid", "profile", "email", "User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

// Initialize the MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);
