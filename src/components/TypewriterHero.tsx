'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCode, faSeedling, faRoute, faCloud, faPalette } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Segment = { type: 'text'; value: string } | { type: 'icon'; icon: IconDefinition }
type Unit = { type: 'char'; char: string } | { type: 'icon'; icon: IconDefinition }

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
]

// Flatten each line into individual units (char or icon)
const ALL_UNITS: Unit[][] = LINES.map(segments =>
  segments.flatMap(seg =>
    seg.type === 'text'
      ? [...seg.value].map(char => ({ type: 'char' as const, char }))
      : [{ type: 'icon' as const, icon: seg.icon }]
  )
)

const TYPING_SPEED_MS = 35
const LINE_PAUSE_MS = 350

function renderUnits(units: Unit[], count: number) {
  return units.slice(0, count).map((unit, i) =>
    unit.type === 'char'
      ? unit.char
      : <FontAwesomeIcon key={i} icon={unit.icon} className="align-middle" />
  )
}

export default function TypewriterHero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [unitIndex, setUnitIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return

    const currentUnits = ALL_UNITS[lineIndex]

    if (unitIndex < currentUnits.length) {
      const t = setTimeout(() => setUnitIndex(u => u + 1), TYPING_SPEED_MS)
      return () => clearTimeout(t)
    }

    if (lineIndex < LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex(l => l + 1)
        setUnitIndex(0)
      }, LINE_PAUSE_MS)
      return () => clearTimeout(t)
    }

    setDone(true)
  }, [lineIndex, unitIndex, done])

  return (
    <div className="grid gap-2 mb-5 md:mb-10">
      {LINES.map((_, i) => {
        if (i > lineIndex) return null
        const units = ALL_UNITS[i]
        const count = i < lineIndex ? units.length : unitIndex
        const isActive = i === lineIndex && !done

        return (
          <p
            key={i}
            className={i === 0 ? 'text-4xl md:text-5xl 2xl:text-6xl' : 'text-xl md:text-2xl 2xl:text-3xl'}
          >
            {renderUnits(units, count)}
            {isActive && <span className="cursor-blink">|</span>}
          </p>
        )
      })}
    </div>
  )
}
