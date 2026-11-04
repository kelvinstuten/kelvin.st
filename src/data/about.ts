// Personal "about me" content for the skills terminal.
// Only shown through terminal commands, but also rendered (hidden) in the HTML for search engines.

export type AboutItem = {
  label: string
  note?: string
  href?: string
}

export type AboutSection = {
  /** Command name, e.g. `games`, and file name `games.txt` for `cat` */
  id: string
  title: string
  items: AboutItem[]
}

export const aboutSections: AboutSection[] = [
  {
    id: 'hobbies',
    title: 'Hobbies',
    items: [
      { label: 'Sim racing', note: 'iRacing & BeamNG.drive' },
      { label: 'Cars & motorsport' },
      { label: 'Homelab' },
      { label: 'Automating things' },
      { label: 'Gaming' },
    ],
  },
  {
    id: 'games',
    title: 'Favourite games',
    items: [
      { label: 'iRacing' },
      { label: 'BeamNG.drive' },
      { label: 'Elden Ring' },
      { label: "Baldur's Gate 3" },
    ],
  },
  {
    id: 'cars',
    title: 'Favourite cars',
    items: [{ label: 'Porsche 911 GT3 (992)' }, { label: 'Toyota Supra MK4 (A80)' }],
  },
  {
    id: 'favorites',
    title: 'Favourite websites',
    items: [
      { label: 'tweakers.net', href: 'https://tweakers.net' },
      { label: 'youtube.com', href: 'https://www.youtube.com' },
    ],
  },
]

export const aboutById = (id: string) => aboutSections.find((section) => section.id === id)
