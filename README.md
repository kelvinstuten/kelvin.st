# kelvin.st

The personal website of Kelvin Stuten, live at [kelvin.st](https://kelvin.st). It shows my journey and skills, with an interactive terminal you can type commands into (try `help`).

## Tech stack
- [Next.js](https://nextjs.org) (App Router, statically rendered) and React
- TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Font Awesome](https://fontawesome.com) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode, following the visitor's system setting
- Hosted on Vercel, with Vercel Analytics and Speed Insights

## Getting started
Requires Node.js 24 (see `.nvmrc`; with nvm or fnm run `nvm use` / `fnm use`).

```bash
git clone git@github.com:kelvinstuten/kelvin.st.git
cd kelvin.st
npm ci --ignore-scripts
npm run dev
```

Then open http://localhost:3000.

Install with `--ignore-scripts` so package install scripts never run on your machine. When adding or updating packages, only use releases that are at least 3 days old.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm test` | Unit tests (Node's built-in test runner, no extra dependencies) |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests, build and `npm audit` on every pull request and push to `main`. Dependabot proposes weekly updates for npm packages and GitHub Actions, with a 3-day cooldown.

## Editing content
| What | Where |
|---|---|
| Skills shown in the terminal | `src/data/skills.ts` |
| Hobbies, favourites (games, cars, websites) and tools | `src/data/about.ts` |
| Terminal commands | `src/components/terminal/commands.ts` (tests in `commands.test.ts`) |
| Intro text | `src/app/page.tsx` |
| Sidebar (photo, social links) | `src/components/sidebar.tsx` |
| Security headers and image settings | `next.config.js` |

Personal content in `about.ts` is only shown through terminal commands, but is also rendered (hidden) in the HTML so search engines can index it.

## Contact
Questions or feedback? Email [hello@kelvin.st](mailto:hello@kelvin.st) or open an issue.
