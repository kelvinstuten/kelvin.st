// NextJS import
import type { Metadata } from 'next'

// Vercel Analytics
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Google font import
import { Inter } from 'next/font/google'

// FontAwesome import
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Component Imports
import Sidebar from '../components/sidebar';
import { skills } from '@/data/skills';
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
    images: [{ url: '/images/kelvin-stuten-2026.jpg', width: 1200, height: 1200, alt: 'Kelvin Stuten' }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/images/kelvin-stuten-2026.jpg'],
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

// Structured data (schema.org) for search engines. Only describe what is visible on the page.
// WebSite gives Google the site name, ProfilePage marks this as a profile of one person.
const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteUrl,
      name: 'Kelvin Stuten',
      alternateName: 'kelvin.st',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: title,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Kelvin Stuten',
      url: siteUrl,
      jobTitle: 'DevOps Tech Lead',
      hasOccupation: { '@type': 'Occupation', name: 'DevOps Tech Lead' },
      email: 'hello@kelvin.st',
      image: `${siteUrl}/images/kelvin-stuten-2026.jpg`,
      sameAs: [
        'https://www.linkedin.com/in/kelvinstuten',
        'https://github.com/kelvinstuten',
        'https://www.instagram.com/kelvinstuten',
      ],
      knowsAbout: skills,
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <ThemeToggle />
          <div className="font-sans flex min-h-dvh flex-col md:flex-row">
            <div className="grid p-10 top-0 relative md:sticky md:self-start md:min-h-dvh md:p-10 xl:p-12 md:basis-4/12 2xl:basis-3/12">
              <Sidebar/>
            </div>
            <main className="custom-main grid flex-1 p-10 md:p-10 xl:p-12 place-content-center md:basis-8/12 2xl:basis-9/12">
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
