import { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { BRANDING_CONFIG } from "@/config/branding";
import { findOrCreateStudentUser } from "@/lib/db/userService";

const clientId = process.env.MICROSOFT_CLIENT_ID || "";
const clientSecret = process.env.MICROSOFT_CLIENT_SECRET || "";
const tenantId = process.env.MICROSOFT_TENANT_ID || BRANDING_CONFIG.collegeTenantId;

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: clientId || "00000000-0000-0000-0000-000000000000",
      clientSecret: clientSecret || "temporary_secret_placeholder",
      tenantId: tenantId || "common",
      authorization: {
        params: {
          // Request minimal scopes under the principle of least privilege
          scope: "openid profile email User.Read",
        },
      },
      profile(profile) {
        return {
          id: profile.sub || profile.oid,
          name: profile.name || profile.preferred_username?.split("@")[0],
          email: profile.email || profile.preferred_username,
          image: null,
          tenantId: profile.tid,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },

  callbacks: {
    /**
     * 1. Strict Tenant Validation during SignIn
     * Rejects personal Microsoft accounts and any account outside the configured college tenant.
     */
    async signIn({ user, account, profile }) {
      if (!account || account.provider !== "azure-ad") {
        return false;
      }

      const configuredTenant = process.env.MICROSOFT_TENANT_ID;
      const userTenantId = (profile as any)?.tid || (user as any)?.tenantId;

      // Check for personal Microsoft accounts (e.g. 9188040d-6c67-4c5b-b112-36a304b66dad is Microsoft personal MSA tenant)
      const isPersonalMsa = userTenantId === "9188040d-6c67-4c5b-b112-36a304b66dad";
      if (isPersonalMsa) {
        console.warn("[Auth] Access Denied: User attempted login with personal Microsoft account.");
        return "/login?error=PersonalAccount";
      }

      // If a specific college tenant is configured (and not wildcard "common"), strictly enforce matching
      if (configuredTenant && configuredTenant !== "common" && configuredTenant !== "YOUR_COLLEGE_TENANT_ID_HERE") {
        if (userTenantId !== configuredTenant) {
          console.warn(`[Auth] Access Denied: Tenant mismatch. Expected ${configuredTenant}, got ${userTenantId}`);
          return "/login?error=WrongOrganization";
        }
      }

      // Optional additional domain safeguard
      const collegeDomain = process.env.COLLEGE_EMAIL_DOMAIN || BRANDING_CONFIG.collegeEmailDomain;
      if (collegeDomain && user.email) {
        const emailDomain = user.email.split("@")[1]?.toLowerCase();
        if (emailDomain && !emailDomain.endsWith(collegeDomain.toLowerCase())) {
          console.warn(`[Auth] Warning: Email domain ${emailDomain} does not match ${collegeDomain}`);
        }
      }

      return true;
    },

    /**
     * 2. JWT Callback: Provisions local database records and embeds profile status in token
     */
    async jwt({ token, user, account, profile, trigger, session }) {
      // On initial login
      if (account && user) {
        const msUserId = user.id;
        const msTenantId = (profile as any)?.tid || "college_tenant";
        const email = user.email || "";
        const displayName = user.name || "Student";

        try {
          // Provision or fetch user record from database
          const { user: dbUser, profile: studentProfile, isNewUser } = await findOrCreateStudentUser({
            microsoftUserId: msUserId,
            microsoftTenantId: msTenantId,
            email,
            displayName,
          });

          token.userId = dbUser.id;
          token.microsoftUserId = msUserId;
          token.microsoftTenantId = msTenantId;
          token.profileCompleted = studentProfile.profile_completed;
          token.department = studentProfile.department;
          token.graduationYear = studentProfile.graduation_year;
          token.isNewUser = isNewUser;
        } catch (dbError) {
          console.error("[Auth] Database provisioning error:", dbError);
          token.userId = user.id;
          token.microsoftTenantId = msTenantId;
          token.profileCompleted = false;
        }
      }

      // Handle profile completion updates via useSession().update()
      if (trigger === "update" && session) {
        if (session.profileCompleted !== undefined) token.profileCompleted = session.profileCompleted;
        if (session.department) token.department = session.department;
      }

      return token;
    },

    /**
     * 3. Session Callback: Exposes clean, non-sensitive session payload to the application
     */
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.userId || token.sub;
        (session.user as any).microsoftUserId = token.microsoftUserId;
        (session.user as any).microsoftTenantId = token.microsoftTenantId;
        (session.user as any).profileCompleted = token.profileCompleted ?? false;
        (session.user as any).department = token.department || null;
        (session.user as any).graduationYear = token.graduationYear || null;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "development_nextauth_jwt_secret_must_be_configured_in_prod",
};
