// NextJS import
import type { Metadata } from 'next'

// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Google font import
import { Inter } from 'next/font/google'

// FontAwesome import
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Component Imports
import Sidebar from '../components/sidebar';

// Stylesheet Imports
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kelvin Stuten | DevOps Engineer',
  description: 'Who is Kelvin Stuten? | Cloud computing | Kubernetes | Webdevelopment',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="font-sans md:flex">
            <div className="grid p-10 top-0 relative md:sticky md:p-10 xl:p-12 md:basis-4/12 2xl:basis-3/12 md:max-h-screen md:h-screen">
              <Sidebar/>
            </div>
            <main className="custom-main grid p-10 md:p-10 xl:p-12 place-content-center md:basis-8/12 2xl:basis-9/12">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
        </div>
      </body>
    </html>
  )
}
