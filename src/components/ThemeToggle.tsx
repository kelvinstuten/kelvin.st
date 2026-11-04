'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const noopSubscribe = () => () => {}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // true on the client, false during SSR — avoids a hydration mismatch on the theme icon
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed top-5 right-5 z-50 cursor-pointer"
    >
      <div className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${isDark ? 'bg-slate-600' : 'bg-gray-300'}`}>
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-200 ${isDark ? 'translate-x-7' : 'translate-x-1'}`}>
          <FontAwesomeIcon icon={isDark ? faMoon : faSun} className={`text-xs ${isDark ? 'text-slate-500' : 'text-yellow-500'}`} />
        </div>
      </div>
    </button>
  )
}
