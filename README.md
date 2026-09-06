# NoteHub (Next.js) — SEO & drafts

Final pass on the NoteHub app: SEO metadata and Open Graph tags on every route, the Roboto font,
a dedicated note creation route, and a draft saved with Zustand.

## Routes

- `/` — landing page.
- `/notes/[id]` — full page with note details, with metadata generated from the note itself.
- `/notes/filter/[...slug]` — notes filtered by tag (`/notes/filter/Work`, `/notes/filter/all`, ...),
  with a sidebar of tags next to it as a parallel route, and metadata generated from the tag.
- `/notes/action/create` — create a note. The form's draft is kept in a Zustand store, persisted to
  localStorage, and cleared only once the note is created.
- Opening a note from `/notes/filter/*` intercepts `/notes/[id]` and shows it in a modal instead of
  navigating away; closing it goes back to where it was opened from.
- Any other route shows a custom 404 page.

## Stack

- Next.js (App Router)
- TypeScript
- CSS Modules
- axios
- TanStack Query, with SSR prefetch + hydration
- Zustand, with the `persist` middleware for the note draft
- next/font/google (Roboto)
- Prettier

## Getting started

npm install

Create a `.env.local` file (see `.env.example`) with your NoteHub API token and site URL:

NEXT_PUBLIC_NOTEHUB_TOKEN="your-token-here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

Then run the dev server:

npm run dev

Open http://localhost:3000.

## Scripts

- `npm run dev` — start the dev server.
- `npm run build` — production build.
- `npm run start` — run the production build.
- `npm run lint` — run ESLint.
- `npm run format` — format the codebase with Prettier.

## Project structure

- `app/` — routes, layouts, parallel (`@sidebar`, `@modal`) and intercepting (`(.)notes/[id]`) segments.
- `components/` — reusable components, each in its own folder with a `.tsx` and a `.module.css`.
- `lib/api.ts` — axios instance and NoteHub API calls.
- `lib/constants.ts` — `PER_PAGE`, the tag list, and the site URL/OG image used in metadata.
- `lib/store/noteStore.ts` — Zustand store for the note draft (`draft`, `setDraft`, `clearDraft`).
- `types/note.ts` — shared `Note`/`NewNote`/`NoteTag` types.
