'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { skillGroups, type SkillGroup } from '@/data/skills'
import { aboutById, aboutSections, type AboutSection } from '@/data/about'

type Tone = 'default' | 'muted' | 'accent' | 'error'
type Output =
  | { kind: 'groups'; groups: SkillGroup[] }
  | { kind: 'text'; lines: { text: string; tone?: Tone }[] }
  | { kind: 'table'; title: string; rows: [string, string][]; footer: string[] }
  | { kind: 'sections'; sections: AboutSection[] }
  | { kind: 'none' }
type Entry = { id: number; command: string; output: Output; intro?: boolean }

// Delays (ms) for the CSS intro animation; see .term-* in globals.css

const INTRO_COMMAND = 'skills --all'
const TYPE_START_MS = 300
const TYPE_DURATION_MS = 700
const REVEAL_START_MS = TYPE_START_MS + TYPE_DURATION_MS + 250
const REVEAL_STEP_MS = 140
const PROMPT_DELAY_MS = REVEAL_START_MS + (skillGroups.length + 1) * REVEAL_STEP_MS
// Top-level personal commands; favourite games and cars only appear under `favorites`
const ABOUT_IDS = ['hobbies', 'favorites', 'tools']
const FILES = ['skills/', ...ABOUT_IDS.map((id) => `${id}.txt`)]
// Commands offered by Tab completion (hidden gimmicks are left out on purpose)
const COMMANDS = ['help', 'ls', 'cat', 'skills', ...ABOUT_IDS, 'whoami', 'contact', 'clear']
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const FORTUNES = [
  'It works on my machine. Then we shipped your machine. That is how Docker was born.',
  "There is no cloud. It's just someone else's computer.",
  'Have you tried turning it off and on again?',
  'YAML: Yet Another Misindented Line.',
  'Friday deploys build character.',
  'It is always DNS.',
  '99 little bugs in the code, take one down, patch it around… 127 little bugs in the code.',
]
const GROUP_IDS = skillGroups.map((g) => g.id)

const toneClass: Record<Tone, string> = {
  default: 'text-white/85',
  muted: 'text-white/55',
  accent: 'text-amber-300',
  error: 'text-rose-400',
}

const text = (...lines: (string | { text: string; tone?: Tone })[]): Output => ({
  kind: 'text',
  lines: lines.map((line) => (typeof line === 'string' ? { text: line } : line)),
})

// `favorites` bundles the favourite games, cars and websites
function sectionsFor(id: string): AboutSection[] | undefined {
  if (!ABOUT_IDS.includes(id)) return undefined
  const section = aboutById(id)
  if (!section) return undefined
  if (id !== 'favorites') return [section]
  return [aboutById('games'), aboutById('cars'), section].filter((s): s is AboutSection => Boolean(s))
}

function run(raw: string): Output | 'clear' {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)
  const arg = args.join(' ').toLowerCase()
  const name = cmd?.toLowerCase()

  // Personal sections: `games`, `cars`, …
  const sections = name ? sectionsFor(name) : undefined
  if (sections) return { kind: 'sections', sections }

  switch (name) {
    case '':
    case undefined:
      return { kind: 'none' }
    case 'help':
      return {
        kind: 'table',
        title: 'Available commands:',
        rows: [
          ['skills [group]', 'my skills, e.g. skills cloud'],
          ['hobbies', 'what I do when I am not working'],
          ['favorites', 'favourite games, cars & websites'],
          ['tools', 'tools I work with'],
          ['whoami', 'who is this guy?'],
          ['contact', 'ways to reach me'],
          ['ls / cat', 'browse it like files'],
          ['clear', 'clear the screen'],
        ],
        footer: [
          `Skill groups: ${GROUP_IDS.join(', ')}`,
          'Tip: use Tab to autocomplete and ↑/↓ for history.',
        ],
      }
    case 'skills': {
      if (!arg || arg === '--all' || arg === '-a') return { kind: 'groups', groups: skillGroups }
      const group = skillGroups.find((g) => g.id === arg)
      if (group) return { kind: 'groups', groups: [group] }
      return text(
        { text: `skills: unknown group "${arg}"`, tone: 'error' },
        { text: `Try one of: ${GROUP_IDS.join(', ')}`, tone: 'muted' },
      )
    }
    case 'ls':
    case 'dir':
      return text(FILES.join('  '), { text: 'Open one with "cat <file>", or just type its name.', tone: 'muted' })
    case 'cat': {
      if (!arg) return text({ text: 'cat: missing file. Try "ls".', tone: 'error' })
      if (arg.replace(/\/$/, '') === 'skills') return text({ text: 'cat: skills: Is a directory. Try "skills".', tone: 'error' })
      const file = sectionsFor(arg.replace(/\.txt$/, ''))
      if (file) return { kind: 'sections', sections: file }
      return text({ text: `cat: ${arg}: No such file or directory`, tone: 'error' })
    }
    case 'whoami':
      return text(
        { text: 'Kelvin Stuten', tone: 'accent' },
        'DevOps Tech Lead. From web designer to developer to running the platform.',
      )
    case 'contact':
      return text('email     hello@kelvin.st', 'linkedin  linkedin.com/in/kelvinstuten', 'github    github.com/kelvinstuten')
    case 'clear':
      return 'clear'

    // --- Hidden gimmicks (not listed in help) ---
    case 'sudo':
      if (arg === 'make me a sandwich') return text('Okay. 🥪')
      return text({ text: 'visitor is not in the sudoers file. This incident will be reported. 😉', tone: 'error' })
    case 'make':
      if (arg === 'me a sandwich') return text({ text: 'What? Make it yourself.', tone: 'error' })
      return text({ text: 'make: *** No targets specified and no makefile found. Stop.', tone: 'error' })
    case 'rm':
      return text({ text: 'rm: permission denied. Nice try though. 😏', tone: 'error' })
    case 'exit':
    case 'logout':
    case 'quit':
      return text('There is no escape. 😄 (try "clear")')
    case 'coffee':
      return text('☕ Brewing… done. Productivity +10.')
    case 'fortune':
      return text({ text: FORTUNES[Math.floor(Math.random() * FORTUNES.length)], tone: 'accent' })
    case 'ping':
      return text(
        `PING ${arg || 'kelvin.st'}: 64 bytes, time=1ms`,
        { text: 'For a real reply: hello@kelvin.st 📬', tone: 'muted' },
      )
    case 'hire':
      return text({ text: 'Great choice! 📬 hello@kelvin.st', tone: 'accent' })
    case 'vim':
    case 'vi':
    case 'nano':
      return text({ text: `${name}: you are now stuck forever. Just kidding, nothing opened. 😅`, tone: 'muted' })
    case 'hello':
    case 'hi':
      return text('Hi there! 👋 Type "help" to look around.')
    default:
      return text({ text: `command not found: ${cmd}. Type "help" to see what I can do.`, tone: 'error' })
  }
}

function complete(value: string): string {
  const lower = value.toLowerCase()
  if (lower.startsWith('cat ')) {
    const partial = lower.slice('cat '.length)
    const matches = FILES.filter((file) => file.startsWith(partial))
    return matches.length === 1 ? `cat ${matches[0]}` : value
  }
  if (lower.startsWith('skills ')) {
    const partial = lower.slice('skills '.length)
    const matches = GROUP_IDS.filter((id) => id.startsWith(partial))
    return matches.length === 1 ? `skills ${matches[0]}` : value
  }
  const matches = COMMANDS.filter((c) => c.startsWith(lower))
  return matches.length === 1 ? matches[0] : value
}

function Prompt() {
  return (
    <span className="select-none whitespace-pre">
      <span className="text-emerald-400">visitor@kelvin.st</span>
      <span className="text-white/50">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-white/50">$ </span>
    </span>
  )
}

function SectionList({ section, asHeading }: { section: AboutSection; asHeading?: boolean }) {
  const Heading = asHeading ? 'h3' : 'div'
  return (
    <div>
      <Heading className={`font-normal ${toneClass.accent}`}>{section.title}</Heading>
      <ul className="pl-2 text-white/85">
        {section.items.map((item) => (
          <li key={item.label}>
            <span className="text-white/40" aria-hidden>
              -{' '}
            </span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:decoration-sky-300"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
            {item.note && <span className="text-white/50"> ({item.note})</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function OutputView({ output, intro }: { output: Output; intro?: boolean }) {
  if (output.kind === 'none') return null
  if (output.kind === 'table') {
    return (
      <div>
        <div className={toneClass.accent}>{output.title}</div>
        {/* Two columns so descriptions wrap inside their own column on narrow screens */}
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 pl-2 text-white/85">
          {output.rows.map(([cmd, desc]) => (
            <div key={cmd} className="contents">
              <dt className="whitespace-nowrap">{cmd}</dt>
              <dd>{desc}</dd>
            </div>
          ))}
        </dl>
        {output.footer.map((line) => (
          <div key={line} className={toneClass.muted}>
            {line}
          </div>
        ))}
      </div>
    )
  }
  if (output.kind === 'sections') {
    return (
      <div className="grid gap-2">
        {output.sections.map((section) => (
          <SectionList key={section.id} section={section} />
        ))}
      </div>
    )
  }
  if (output.kind === 'text') {
    return (
      <div className="whitespace-pre-wrap">
        {output.lines.map((line, i) => (
          <div key={i} className={toneClass[line.tone ?? 'default']}>
            {line.text}
          </div>
        ))}
      </div>
    )
  }
  // The server-rendered intro uses real headings so search engines get a clear outline
  const Heading = intro ? 'h3' : 'div'
  return (
    <div className="grid gap-3 py-1">
      {output.groups.map((group, i) => (
        <div
          key={group.id}
          className={intro ? 'term-reveal' : undefined}
          style={intro ? ({ '--term-delay': `${REVEAL_START_MS + i * REVEAL_STEP_MS}ms` } as CSSProperties) : undefined}
        >
          <Heading className="font-normal">
            <span className="text-amber-300">
              <span aria-hidden>▸ </span>
              {group.label}
            </span>{' '}
            <span className="text-white/40" aria-hidden>
              ({group.id} · {group.skills.length})
            </span>
          </Heading>
          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 pl-4 text-white/85">
            {group.skills.map((skill) => (
              <li key={skill} className="after:ml-3 after:text-white/30 after:content-['·'] last:after:content-none">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const introEntry: Entry = { id: 0, command: INTRO_COMMAND, output: { kind: 'groups', groups: skillGroups }, intro: true }

export default function SkillsTerminal() {
  // The intro output is part of the initial render, so it is in the server HTML
  const [entries, setEntries] = useState<Entry[]>([introEntry])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  // Keep the newest command output in view (scrolls the terminal, not the page).
  // The intro stays scrolled to the top so the typed command remains visible.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const last = entries[entries.length - 1]
    if (!last || last.intro) {
      el.scrollTop = 0
    } else if (el.scrollHeight > el.clientHeight) {
      el.scrollTop = el.scrollHeight
    } else {
      // On phones the terminal grows with its content, so bring the prompt into view instead
      inputRef.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [entries])

  // Secret: the Konami code (↑↑↓↓←→←→BA) anywhere on the page
  useEffect(() => {
    let position = 0
    const onKey = (e: globalThis.KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      position = key === KONAMI[position] ? position + 1 : key === KONAMI[0] ? 1 : 0
      if (position === KONAMI.length) {
        position = 0
        setEntries((list) => [
          ...list,
          {
            id: nextId.current++,
            command: '↑ ↑ ↓ ↓ ← → ← → B A',
            output: {
              kind: 'text',
              lines: [
                { text: '🎮 Cheat code accepted: +30 lives.', tone: 'accent' },
                { text: 'You found a secret. Respect.', tone: 'muted' },
              ],
            },
          },
        ])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = useCallback(() => {
    const command = input
    const result = run(command)
    if (command.trim()) setHistory((h) => [...h, command])
    setHistoryIndex(null)
    setInput('')
    if (result === 'clear') return setEntries([])
    setEntries((list) => [...list, { id: nextId.current++, command, output: result }])
  }, [input])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'Tab' && input) {
      e.preventDefault()
      setInput(complete(input))
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown' && historyIndex !== null) {
      e.preventDefault()
      const i = historyIndex + 1
      if (i >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(i)
        setInput(history[i])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    }
  }

  // Click anywhere in the terminal to type, unless the visitor is selecting text
  const focusInput = () => {
    if (window.getSelection()?.toString()) return
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-black/35 font-mono text-[13px] leading-relaxed shadow-lg ring-1 ring-white/10 md:text-sm">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs text-white/50">visitor@kelvin.st: ~</span>
      </div>

      <div
        ref={scrollRef}
        onClick={focusInput}
        className="term-scroll min-h-48 cursor-text p-4 md:max-h-[44rem] md:overflow-y-auto lg:max-h-[36rem]"
      >
        <div role="log" aria-live="polite" aria-label="Terminal output">
          {entries.map((entry) => (
            <div key={entry.id} className="mb-2">
              <Prompt />
              {entry.intro ? (
                <span
                  className="term-type text-white"
                  style={
                    {
                      '--term-chars': entry.command.length,
                      '--term-delay': `${TYPE_START_MS}ms`,
                      '--term-duration': `${TYPE_DURATION_MS}ms`,
                    } as CSSProperties
                  }
                >
                  {entry.command}
                </span>
              ) : (
                <span className="text-white">{entry.command}</span>
              )}
              <OutputView output={entry.output} intro={entry.intro} />
            </div>
          ))}
        </div>

        {/* Personal content only appears through commands, but is in the HTML for search engines */}
        <div hidden>
          {aboutSections.map((section) => (
            <SectionList key={section.id} section={section} asHeading />
          ))}
        </div>

        <div
          className="term-reveal flex items-center"
          style={{ '--term-delay': `${PROMPT_DELAY_MS}ms` } as CSSProperties}
        >
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHistoryIndex(null)
            }}
            onKeyDown={onKeyDown}
            aria-label="Type a command, for example help"
            placeholder="type 'help'"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-base text-white caret-emerald-400 outline-none placeholder:text-white/30 md:text-sm"
          />
        </div>
      </div>
    </div>
  )
}
