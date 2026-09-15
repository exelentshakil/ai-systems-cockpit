import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "AI Systems Cockpit | Fractional AI Systems Advisor & Agentic Architect",
  description: "Executive advisory console for multi-brand AI ecosystem architecture, repository rationalization, agent vs software classification, and revenue-prioritized automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Central traffic tracker pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=ai-systems-cockpit"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      </body>
    </html>
  );
}
