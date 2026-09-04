/**
 * Central College & Product Branding Configuration
 * 
 * Update this file or set environment variables to rebrand the platform for any institution.
 */

export const BRANDING_CONFIG = {
  // Product Information
  productName: process.env.NEXT_PUBLIC_APP_NAME || "AI Placement Prep",
  tagline: "Prepare smarter. Know when you're ready.",
  subtagline: "Analyze your resume. Understand your skill gaps. Practice interviews. Measure your placement readiness.",

  // College / University Information
  collegeName: process.env.COLLEGE_NAME || "National Institute of Engineering & Technology",
  collegeShortName: "NIET",
  collegeEmailDomain: process.env.COLLEGE_EMAIL_DOMAIN || "niet.ac.in",
  
  // Microsoft Entra ID Single Tenant Configuration
  // Used to strictly validate that only authorized college accounts access the platform
  collegeTenantId: process.env.MICROSOFT_TENANT_ID || "YOUR_COLLEGE_TENANT_ID_HERE",

  // Asset paths
  collegeLogoPath: "/branding/college-logo.svg",
  productLogoPath: "/branding/product-logo.svg",

  // Support & Institutional Contact
  tpoEmail: "placements@niet.ac.in",
  supportUrl: "/support",
  privacyUrl: "/privacy",
  termsUrl: "/terms",
} as const;

export type BrandingConfig = typeof BRANDING_CONFIG;
