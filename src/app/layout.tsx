import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AssessmentProvider } from "@/context/AssessmentContext";
import { ToastProvider } from "@/context/ToastContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SONAR MIND — MIL-AI Competency Framework",
  description: "Dashboard asesmen kompetensi AI untuk siswa berdasarkan kerangka MIL-AI UNESCO. Uji kemampuan deteksi halusinasi, bias algoritma, dan penalaran etika.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SONAR MIND",
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
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="h-full bg-background flex flex-col md:flex-row text-foreground overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <AssessmentProvider>
              <Sidebar />
              <main className="flex-1 h-full overflow-y-auto">
                {children}
              </main>
            </AssessmentProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
