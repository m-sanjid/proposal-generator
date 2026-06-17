import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { InvoiceProvider } from '@/context/invoice-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProposalFlow - Professional Proposal Generator',
  description:
    'Create beautiful, professional proposals with real-time preview, customizable templates, and instant PDF export. Perfect for freelancers, agencies, and businesses.',
  keywords: [
    'proposal generator',
    'business proposals',
    'PDF export',
    'professional templates',
    'SaaS',
  ],
  authors: [{ name: 'ProposalFlow' }],
  creator: 'ProposalFlow',
  openGraph: {
    type: 'website',
    title: 'ProposalFlow - Professional Proposal Generator',
    description: 'Create beautiful, professional proposals in minutes',
    siteName: 'ProposalFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProposalFlow - Professional Proposal Generator',
    description: 'Create beautiful, professional proposals in minutes',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <InvoiceProvider>
            {children}
            <Toaster position="top-right" />
            <Analytics />
          </InvoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
