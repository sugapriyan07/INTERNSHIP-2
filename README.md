# Quiz Project

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Repository: https://github.com/sugapriyan07/INTERNSHIP-2

## What this project is

This is a Quiz web application built with React + TypeScript, scaffolded with Vite. It provides functionality to create quizzes, take quizzes, and view results. The UI uses Tailwind CSS and components inspired by shadcn-ui.

Key features

- User authentication (pages present in `src/pages/Auth.tsx`)
- Create and manage quizzes (`src/pages/CreateQuiz.tsx`)
- List available quizzes (`src/pages/QuizList.tsx`)
- Take a quiz interface with per-question flow (`src/pages/TakeQuiz.tsx`)
- View results and analytics (`src/pages/Results.tsx`)

## Technologies

- Vite
- TypeScript
- React 18
- Tailwind CSS
- Radix UI primitives
- React Router
- TanStack Query

## Quick start (local development)

Prerequisites

- Node.js 16 or newer
- npm (or pnpm)

Install and run

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Available npm scripts (from `package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run build:dev` — build using development mode
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint

## Environment variables

Create a `.env` file in the project root for any runtime configuration you need. Example variables you may add:

- `VITE_API_URL` — backend API base URL (if you connect a backend)
- `VITE_AUTH_DOMAIN` — OAuth / auth provider domain (optional)

Note: Vite exposes env vars that start with `VITE_` to the browser.

## Project structure

- `src/` — application source
	- `src/pages/` — page-level routes (Auth, CreateQuiz, TakeQuiz, Results, etc.)
	- `src/components/` — shared UI components
	- `src/context/` — React contexts (Auth, Quiz state)
	- `src/hooks/` — custom hooks
	- `src/lib/` — utilities

## Running a production-like build

```bash
npm run build
npm run preview
```

## Testing & linting

This project includes ESLint configured. To lint the code:

```bash
npm run lint
```

Add tests (Jest, Vitest, or similar) if you want automated unit/integration tests.

## Deployment

You can deploy the built site to static hosts like Vercel, Netlify, or GitHub Pages. The typical steps for a static host:

1. Configure build command: `npm run build`
2. Set publish directory to `dist` (Vite's default output)
3. Add any necessary environment variables in the host settings

If you want, I can add a GitHub Actions workflow to build and deploy on push.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes and push: `git push origin feat/my-feature`
4. Open a pull request

Please follow the existing code style and run the linter before creating PRs.

## License

This repository is ready to be licensed. A common choice is the MIT license. To add it, create a `LICENSE` file containing the MIT text.

## Contact

For questions, issues, or help, open an issue on the repository: https://github.com/sugapriyan07/INTERNSHIP-2/issues


- Vite

