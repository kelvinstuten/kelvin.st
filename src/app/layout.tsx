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
import ThemeProvider from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';

// Stylesheet Imports
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://kelvin.st'
const title = 'Kelvin Stuten | DevOps Tech Lead'
const description =
  'Kelvin Stuten is a DevOps Tech Lead specializing in Azure, Kubernetes, CI/CD pipelines, and cloud-native web development.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    images: [{ url: '/images/kelvinstuten.jpg', width: 800, height: 800, alt: 'Kelvin Stuten' }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/images/kelvinstuten.jpg'],
  },
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Kelvin Stuten',
                url: siteUrl,
                jobTitle: 'DevOps Tech Lead',
                email: 'hello@kelvin.st',
                image: `${siteUrl}/images/kelvinstuten.jpg`,
                sameAs: [
                  'https://www.linkedin.com/in/kelvinstuten',
                  'https://github.com/kelvinstuten',
                  'https://www.instagram.com/kelvinstuten',
                ],
                knowsAbout: [
                  'DevOps', 'Kubernetes', 'Azure', 'CI/CD', 'Cloud Computing',
                  'Web Development', 'Docker', 'Microservices', 'TypeScript',
                ],
              }),
            }}
          />
          <ThemeToggle />
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
        </ThemeProvider>
      </body>
    </html>
  )
}
