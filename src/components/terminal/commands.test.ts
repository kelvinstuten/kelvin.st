// Unit tests for the terminal commands. Run with `npm test` (Node's built-in test runner, no dependencies).
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { COMMANDS, complete, FILES, FORTUNES, run, type Output } from './commands.ts'
import { skillGroups } from '../../data/skills.ts'

// Helpers to read results without repeating type guards in every test
const asText = (output: Output | 'clear') => {
  assert.ok(output !== 'clear' && output.kind === 'text', `expected text output, got ${JSON.stringify(output)}`)
  return output.lines.map((line) => line.text).join('\n')
}
const sectionTitles = (output: Output | 'clear') => {
  assert.ok(output !== 'clear' && output.kind === 'sections', 'expected sections output')
  return output.sections.map((section) => section.title)
}

describe('run', () => {
  it('returns nothing for empty input', () => {
    assert.deepEqual(run('   '), { kind: 'none' })
  })

  it('is case-insensitive and ignores surrounding spaces', () => {
    assert.deepEqual(run('  HELP '), run('help'))
  })

  it('lists the public commands in help, without hidden ones', () => {
    const output = run('help')
    assert.ok(output !== 'clear' && output.kind === 'table')
    const listed = output.rows.map(([cmd]) => cmd)
    for (const cmd of ['hobbies', 'favorites', 'tools', 'whoami', 'contact', 'clear']) {
      assert.ok(listed.includes(cmd), `help should list ${cmd}`)
    }
    for (const hidden of ['sudo', 'fortune', 'coffee', 'games', 'cars']) {
      assert.ok(!listed.some((cmd) => cmd.startsWith(hidden)), `help should not list ${hidden}`)
    }
  })

  it('shows all skill groups, or a single one', () => {
    const all = run('skills')
    assert.ok(all !== 'clear' && all.kind === 'groups')
    assert.equal(all.groups.length, skillGroups.length)

    const one = run('skills cloud')
    assert.ok(one !== 'clear' && one.kind === 'groups')
    assert.deepEqual(one.groups.map((g) => g.id), ['cloud'])
  })

  it('reports an unknown skill group', () => {
    assert.match(asText(run('skills nope')), /unknown group "nope"/)
  })

  it('bundles games, cars and websites under favorites', () => {
    assert.deepEqual(sectionTitles(run('favorites')), ['Favourite games', 'Favourite cars', 'Favourite websites'])
  })

  it('gives every favourite website an https link', () => {
    const output = run('favorites')
    assert.ok(output !== 'clear' && output.kind === 'sections')
    const websites = output.sections.find((s) => s.id === 'favorites')
    assert.ok(websites)
    assert.ok(websites.items.every((item) => item.href?.startsWith('https://')))
  })

  it('does not expose games and cars as separate commands', () => {
    assert.match(asText(run('games')), /command not found/)
    assert.match(asText(run('cars')), /command not found/)
  })

  it('shows hobbies and tools', () => {
    assert.deepEqual(sectionTitles(run('hobbies')), ['Hobbies'])
    assert.deepEqual(sectionTitles(run('tools')), ['Tools'])
  })

  it('lists files with ls and opens them with cat', () => {
    assert.match(asText(run('ls')), /skills\/ {2}hobbies\.txt {2}favorites\.txt {2}tools\.txt/)
    assert.deepEqual(sectionTitles(run('cat tools.txt')), sectionTitles(run('tools')))
    assert.match(asText(run('cat skills/')), /Is a directory/)
    assert.match(asText(run('cat secrets.txt')), /No such file or directory/)
    assert.match(asText(run('cat')), /missing file/)
  })

  it('returns the clear signal', () => {
    assert.equal(run('clear'), 'clear')
  })

  it('handles the hidden gimmicks', () => {
    assert.equal(asText(run('sudo make me a sandwich')), 'Okay. 🥪')
    assert.match(asText(run('sudo rm -rf /')), /not in the sudoers file/)
    assert.ok(FORTUNES.includes(asText(run('fortune'))))
  })

  it('reports unknown commands', () => {
    assert.match(asText(run('foo')), /command not found: foo/)
  })
})

describe('complete', () => {
  it('completes a unique command prefix', () => {
    assert.equal(complete('he'), 'help')
    assert.equal(complete('to'), 'tools')
  })

  it('leaves ambiguous or unknown input unchanged', () => {
    assert.equal(complete('c'), 'c') // cat, contact, clear
    assert.equal(complete('xyz'), 'xyz')
  })

  it('completes skill groups and files', () => {
    assert.equal(complete('skills cl'), 'skills cloud')
    assert.equal(complete('cat fa'), 'cat favorites.txt')
  })

  it('only offers public commands and existing files', () => {
    assert.ok(!COMMANDS.includes('sudo'))
    assert.deepEqual(FILES, ['skills/', 'hobbies.txt', 'favorites.txt', 'tools.txt'])
  })
})
