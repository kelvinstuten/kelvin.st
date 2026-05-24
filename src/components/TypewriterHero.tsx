'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCode, faSeedling, faRoute, faCloud, faPalette, faCircle } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { skills } from '@/data/skills'

type Segment = { type: 'text'; value: string } | { type: 'icon'; icon: IconDefinition }
type Unit = { type: 'char'; char: string } | { type: 'icon'; icon: IconDefinition }

const HERO_LINE_COUNT = 5

const LINES: Segment[][] = [
  [
    { type: 'text', value: "Hi, I'm Kelvin!" },
  ],
  [
    { type: 'text', value: 'Started as a student ' },
    { type: 'icon', icon: faGraduationCap },
    { type: 'text', value: ' web designer ' },
    { type: 'icon', icon: faPalette },
  ],
  [
    { type: 'text', value: 'Followed ' },
    { type: 'icon', icon: faRoute },
    { type: 'text', value: ' my passion to become a front and backend web developer ' },
    { type: 'icon', icon: faCode },
  ],
  [
    { type: 'text', value: 'And finally grown up ' },
    { type: 'icon', icon: faSeedling },
    { type: 'text', value: ' to be a DevOps Tech Lead ' },
    { type: 'icon', icon: faCloud },
  ],
  [
    { type: 'text', value: 'And did you know that I picked up some cool skills along the way?' },
  ],
  ...skills.map(skill => ([
    { type: 'icon' as const, icon: faCircle },
    { type: 'text' as const, value: ' ' + skill },
  ])),
]

const ALL_UNITS: Unit[][] = LINES.map(segments =>
  segments.flatMap((seg): Unit[] =>
    seg.type === 'text'
      ? [...seg.value].map(char => ({ type: 'char' as const, char }))
      : [{ type: 'icon' as const, icon: seg.icon }]
  )
)

function renderUnits(units: Unit[], count: number) {
  return units.slice(0, count).map((unit, i) =>
    unit.type === 'char'
      ? unit.char
      : <FontAwesomeIcon key={i} icon={unit.icon} className="text-xs align-middle mr-1" />
  )
}

function getClassName(i: number): string {
  if (i === 0) return 'text-4xl md:text-5xl 2xl:text-6xl'
  if (i < HERO_LINE_COUNT) return 'text-xl md:text-2xl 2xl:text-3xl'
  return 'text-xs md:text-lg 2xl:text-xl'
}

export default function TypewriterHero() {
  const [mounted, setMounted] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [unitIndex, setUnitIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || done) return

    const currentUnits = ALL_UNITS[lineIndex]
    const isSkillLine = lineIndex >= HERO_LINE_COUNT
    const typingSpeed = isSkillLine ? 20 : 35
    const linePause = isSkillLine ? 80 : 350

    if (unitIndex < currentUnits.length) {
      const t = setTimeout(() => setUnitIndex(u => u + 1), typingSpeed)
      return () => clearTimeout(t)
    }

    if (lineIndex < LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex(l => l + 1)
        setUnitIndex(0)
      }, linePause)
      return () => clearTimeout(t)
    }

    setDone(true)
  }, [mounted, lineIndex, unitIndex, done])

  // SSR / pre-mount: render all content statically for search engines
  if (!mounted) {
    return (
      <div className="grid gap-2">
        {LINES.map((_, i) => (
          <p key={i} className={getClassName(i)}>
            {renderUnits(ALL_UNITS[i], ALL_UNITS[i].length)}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-2">
      {LINES.map((_, i) => {
        if (i > lineIndex) return null
        const units = ALL_UNITS[i]
        const count = i < lineIndex ? units.length : unitIndex
        const isActive = i === lineIndex && !done

        return (
          <p key={i} className={getClassName(i)}>
            {renderUnits(units, count)}
            {isActive && <span className="cursor-blink">|</span>}
          </p>
        )
      })}
    </div>
  )
}
