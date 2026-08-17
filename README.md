# Idea → Plan → Growth

A minimal, distraction-free tool for capturing ideas, turning them into
actionable plans, and tracking execution progress.

## 1. Installation

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Production build

```bash
npm run build
npm run start
```

## 4. Vercel deployment

Push this repository to GitHub (or another Git provider) and import it at
[vercel.com/new](https://vercel.com/new). No environment variables or extra
configuration are required — Vercel auto-detects the Next.js app, runs
`npm run build`, and deploys it.

## 5. Where data is stored

All data (ideas, plans, notes, steps, completion state, colors, and
timestamps) is stored in the browser's `localStorage` under the key
`idea-plan-growth:ideas`. Nothing is sent to a server. Data persists across
page reloads but is local to the device/browser it was created in.

## 6. Replacing localStorage with a database later

All persistence goes through the `DataStore` interface in
[`lib/storage.ts`](lib/storage.ts), which currently has a single
`load()`/`save()` implementation backed by `localStorage`. To move to a
database (e.g. Supabase/PostgreSQL):

1. Implement `DataStore` with calls to your backend (e.g. REST/RPC calls to
   Supabase), keeping the same `load(): Idea[]` / `save(ideas: Idea[]): void`
   shape (or convert them to async and update `hooks/useIdeas.ts`
   accordingly).
2. Swap the `dataStore` export in `lib/storage.ts` to your new
   implementation.
3. No changes are required in any component — they all read/write through
   `useIdeas`, which only talks to `dataStore`.
