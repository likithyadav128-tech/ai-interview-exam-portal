import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { BRANDING_CONFIG } from "@/config/branding";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRANDING_CONFIG.productName} — ${BRANDING_CONFIG.collegeShortName}`,
  description: `${BRANDING_CONFIG.tagline} ${BRANDING_CONFIG.subtagline}`,
  icons: {
    icon: BRANDING_CONFIG.productLogoPath,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
