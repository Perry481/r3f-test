# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js routes; `page.tsx` landing, `workspace/page.tsx` CAD workspace, `globals.css` global styles.
- `src/components/3d` for scene primitives and animations; `src/components/ui` for reusable controls.
- `src/lib/utils.ts` holds shared helpers; static icons and future models live in `public/`; build and tooling config stays in root TypeScript files.

## Build, Test, and Development Commands
- `npm run dev`: Turbopack dev server on `http://localhost:3000`.
- `npm run build` / `npm run preview`: production build and smoke-test before deploying to Vercel.
- `npm run lint`, `npm run type-check`, `npm run clean`: enforce ESLint, check TypeScript, reset `.next` artifacts.

## Coding Style & Naming Conventions
- Stick to ESLint defaults in `eslint.config.mjs`; run `npm run lint -- --fix` before pushing.
- Use PascalCase exports for components, camelCase for hooks/utilities, kebab-case filenames such as `brick-building-animation.tsx`.
- Two-space indentation, double quotes, and grouped Tailwind classes (layout → spacing → color) match the existing codebase.

## Testing Guidelines
- No automated harness yet; manually exercise landing and workspace flows in desktop Chrome after every change.
- When adding tests, colocate `*.test.tsx` files near components and use React Testing Library to simulate camera controls and animation triggers.
- Document manual verification steps and expected fps in the PR until coverage targets are defined.

## Commit & Pull Request Guidelines
- Follow the repo’s concise, present-tense commit style (`animation done`, `make phase2 dotted line`); add bodies if context is non-obvious.
- Each PR includes a brief summary, linked issue (if any), and checklist of manual checks or screenshots/GIFs for visual changes.
- Call out schema or dependency updates, and tag reviewers who own affected 3D modules.

## 3D Scene & Asset Practices
- Keep R3F logic inside focused client components; reset local state when routes change to avoid lingering refs.
- Store heavy models under `public/models` (create if absent) and lazy-load via `@react-three/drei` loaders to control bundle size.
- Monitor frame rate in Chrome DevTools; flag drops below 60fps with proposed optimizations.
