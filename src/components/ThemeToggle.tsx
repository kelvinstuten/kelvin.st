'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 cursor-pointer"
    >
      <FontAwesomeIcon icon={faSun} className="text-sm text-yellow-500" />
      <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isDark ? 'bg-slate-600' : 'bg-gray-300'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isDark ? 'translate-x-7' : 'translate-x-1'}`} />
      </div>
      <FontAwesomeIcon icon={faMoon} className="text-sm text-slate-300" />
    </button>
  )
}
