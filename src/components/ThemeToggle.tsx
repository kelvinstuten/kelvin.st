'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const noopSubscribe = () => () => {}

export default function ThemeToggle() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme()
  // true on the client, false during SSR: the theme is only known in the browser
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

  // Before hydration the theme is unknown: render the empty button shell so it doesn't pop in later
  const isDark = mounted && resolvedTheme === 'dark'
  const showSun = mounted && !isDark
  const showMoon = mounted && isDark
  const next = isDark ? 'light' : 'dark'

  // Picking the same theme as the OS clears the override, so the site keeps following the system
  const toggle = () => setTheme(next === systemTheme ? 'system' : next)

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!mounted}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="fixed top-5 right-5 z-50 grid h-10 w-10 cursor-pointer place-items-center overflow-hidden rounded-full
        bg-white/80 text-[#012030] shadow-sm ring-1 ring-black/10 backdrop-blur-md
        transition-colors duration-200 hover:bg-white
        dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/20
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      <FontAwesomeIcon
        icon={faSun}
        aria-hidden
        className={`col-start-1 row-start-1 text-base transition-all duration-300 ease-out motion-reduce:transition-none
          ${showSun ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
      />
      <FontAwesomeIcon
        icon={faMoon}
        aria-hidden
        className={`col-start-1 row-start-1 text-base transition-all duration-300 ease-out motion-reduce:transition-none
          ${showMoon ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`}
      />
    </button>
  )
}
