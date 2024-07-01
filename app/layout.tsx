import { ThemeContextProvider } from "@/context/theme-provider";
import "@/styles/prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "AskPro",
  description:
    "A platform designed to foster knowledge sharing and community interaction.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const AppLayout = ({ children }: { children: ReactNode }) => (
  <ClerkProvider
    appearance={{
      elements: {
        formButtonPrimary: "primary-gradient",
        footerActionLink: "primary-text-gradient hover:text-primary-500",
      },
    }}
  >
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default AppLayout;
