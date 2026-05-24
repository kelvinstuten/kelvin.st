'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch — only render after mount
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center gap-2 font-bold hover:scale-110 transition-transform cursor-pointer"
    >
      <FontAwesomeIcon
        className="text-3xl align-middle"
        icon={isDark ? faSun : faMoon}
      />
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
