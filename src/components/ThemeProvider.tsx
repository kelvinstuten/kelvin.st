'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // Follow the OS light/dark preference until the visitor picks one with the toggle
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
