// Terminal command logic: pure functions without React, so they can be unit tested.
// Relative imports with .ts extensions so Node's test runner can load this file directly.
import { skillGroups, type SkillGroup } from '../../data/skills.ts'
import { aboutById, type AboutSection } from '../../data/about.ts'

export type Tone = 'default' | 'muted' | 'accent' | 'error'
export type Output =
  | { kind: 'groups'; groups: SkillGroup[] }
  | { kind: 'text'; lines: { text: string; tone?: Tone }[] }
  | { kind: 'table'; title: string; rows: [string, string][]; footer: string[] }
  | { kind: 'sections'; sections: AboutSection[] }
  | { kind: 'none' }

// Top-level personal commands; favourite games and cars only appear under `favorites`
export const ABOUT_IDS = ['hobbies', 'favorites', 'tools']
export const FILES = ['skills/', ...ABOUT_IDS.map((id) => `${id}.txt`)]
// Commands offered by Tab completion (hidden gimmicks are left out on purpose)
export const COMMANDS = ['help', 'ls', 'cat', 'skills', ...ABOUT_IDS, 'whoami', 'contact', 'credits', 'clear']
export const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export const FORTUNES = [
  'It works on my machine. Then we shipped your machine. That is how Docker was born.',
  "There is no cloud. It's just someone else's computer.",
  'Have you tried turning it off and on again?',
  'YAML: Yet Another Misindented Line.',
  'Friday deploys build character.',
  'It is always DNS.',
  '99 little bugs in the code, take one down, patch it around… 127 little bugs in the code.',
]
export const GROUP_IDS = skillGroups.map((g) => g.id)

export const text = (...lines: (string | { text: string; tone?: Tone })[]): Output => ({
  kind: 'text',
  lines: lines.map((line) => (typeof line === 'string' ? { text: line } : line)),
})

// `favorites` bundles the favourite games, cars and websites
export function sectionsFor(id: string): AboutSection[] | undefined {
  if (!ABOUT_IDS.includes(id)) return undefined
  const section = aboutById(id)
  if (!section) return undefined
  if (id !== 'favorites') return [section]
  return [aboutById('games'), aboutById('cars'), section].filter((s): s is AboutSection => Boolean(s))
}

export function run(raw: string): Output | 'clear' {
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
          ['credits', 'how this site was built'],
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
    case 'credits':
      return text(
        { text: 'kelvin.st', tone: 'accent' },
        'Built with Next.js, React, TypeScript and Tailwind CSS.',
        { text: 'Hosted on Vercel.', tone: 'muted' },
      )

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

export function complete(value: string): string {
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
