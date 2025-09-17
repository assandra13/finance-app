import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Keuangan Pribadi - Aplikasi Pencatatan Keuangan",
  description:
    "Aplikasi pencatatan keuangan pribadi yang komprehensif untuk mengontrol pengeluaran dan mencapai tujuan keuangan",
  generator: "v0.app",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Keuangan Pribadi",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.jpg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.jpg" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.jpg" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.jpg" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256x256.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.jpg" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.jpg" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.jpg" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
