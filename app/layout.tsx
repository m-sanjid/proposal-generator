import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Navbar } from '@/components/editor/navbar'
import { InvoiceProvider } from '@/context/invoice-context'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProposalCraft - Professional Proposal Generator',
  description: 'Create beautiful, professional proposals with real-time preview, customizable templates, and instant PDF export. Perfect for freelancers, agencies, and businesses.',
  keywords: ['proposal generator', 'invoice creator', 'business proposals', 'PDF export', 'professional templates'],
  authors: [{ name: 'ProposalCraft' }],
  creator: 'ProposalCraft',
  openGraph: {
    type: 'website',
    title: 'ProposalCraft - Professional Proposal Generator',
    description: 'Create beautiful, professional proposals in minutes',
    siteName: 'ProposalCraft',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProposalCraft - Professional Proposal Generator',
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
    <html lang="en">
      <body className={`font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <InvoiceProvider>
            <SidebarProvider
              className="relative">
              <AppSidebar />
              <SidebarInset>
                <Navbar />
                {children}
              </SidebarInset>
            </SidebarProvider>
            <Toaster position="top-right" />
            <Analytics />
          </InvoiceProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}
