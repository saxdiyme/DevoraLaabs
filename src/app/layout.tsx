import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devora Laabs — We Build Digital Products That Scale",
  description:
    "Devora Laabs by Kronyx Group is an IT product studio building web, iOS, Android, AI-powered SaaS, and cloud platforms for startups and businesses globally.",
  keywords: [
    "Devora Laabs",
    "Kronyx Group",
    "IT product studio",
    "Web development",
    "iOS development",
    "Android development",
    "UI/UX design",
    "DevOps & Cloud",
    "AI integration",
    "SaaS",
  ],
  authors: [{ name: "Devora Laabs", url: "https://devoralabs.io" }],
  creator: "Devora Laabs",
  openGraph: {
    title: "Devora Laabs — We Build Digital Products That Scale",
    description:
      "Web · iOS · Android · UI/UX · DevOps · AI · SaaS. A Kronyx Group studio.",
    url: "https://devoralabs.io",
    siteName: "Devora Laabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devora Laabs — We Build Digital Products That Scale",
    description:
      "Web · iOS · Android · UI/UX · DevOps · AI · SaaS. A Kronyx Group studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dl-deep text-dl-warm-white font-inter selection:bg-dl-orange selection:text-dl-deep">
        {children}
      </body>
    </html>
  );
}
