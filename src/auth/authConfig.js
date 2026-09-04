import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

/**
 * Microsoft Entra ID / Microsoft Identity Platform Configuration
 * 
 * Supports:
 * - Environment variables: VITE_MICROSOFT_CLIENT_ID, VITE_MICROSOFT_TENANT_ID, VITE_MICROSOFT_REDIRECT_URI
 * - Dynamic browser configuration via localStorage for instant testing
 */

export const getStoredClientId = () => {
  if (typeof window !== "undefined") {
    const customId = localStorage.getItem("ai_custom_microsoft_client_id");
    if (customId && customId.trim()) return customId.trim();
  }
  return import.meta.env.VITE_MICROSOFT_CLIENT_ID || "";
};

export const getStoredTenantId = () => {
  if (typeof window !== "undefined") {
    const customTenant = localStorage.getItem("ai_custom_microsoft_tenant_id");
    if (customTenant && customTenant.trim()) return customTenant.trim();
  }
  return import.meta.env.VITE_MICROSOFT_TENANT_ID || "common";
};

export const getRedirectUri = () => {
  return import.meta.env.VITE_MICROSOFT_REDIRECT_URI || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
};

export const isClientConfigured = () => {
  const cid = getStoredClientId();
  return Boolean(cid && cid.length > 8 && cid !== "YOUR_MICROSOFT_CLIENT_ID_HERE" && cid !== "00000000-0000-0000-0000-000000000000");
};

export const createMsalConfig = (clientId = getStoredClientId(), tenantId = getStoredTenantId()) => {
  const isConfigured = Boolean(clientId && clientId.length > 8);
  const redirectUri = getRedirectUri();

  return {
    auth: {
      clientId: isConfigured ? clientId : "00000000-0000-0000-0000-000000000000",
      authority: `https://login.microsoftonline.com/${tenantId || "common"}`,
      redirectUri: redirectUri,
      postLogoutRedirectUri: redirectUri,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) return;
          if (level === LogLevel.Error) {
            console.error(`[MSAL Error] ${message}`);
          }
        },
        logLevel: LogLevel.Error,
      },
    },
  };
};

export const loginRequest = {
  scopes: ["openid", "profile", "email", "User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

let currentMsalInstance = null;

export const getMsalInstance = () => {
  if (!currentMsalInstance) {
    currentMsalInstance = new PublicClientApplication(createMsalConfig());
  }
  return currentMsalInstance;
};

export const resetMsalInstance = (newClientId, newTenantId) => {
  if (typeof window !== "undefined") {
    if (newClientId) {
      localStorage.setItem("ai_custom_microsoft_client_id", newClientId.trim());
    } else {
      localStorage.removeItem("ai_custom_microsoft_client_id");
    }
    if (newTenantId) {
      localStorage.setItem("ai_custom_microsoft_tenant_id", newTenantId.trim());
    }
  }
  currentMsalInstance = new PublicClientApplication(createMsalConfig(newClientId, newTenantId));
  return currentMsalInstance;
};
