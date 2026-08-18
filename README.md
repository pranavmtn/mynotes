# Idea → Plan → Growth

A minimal, distraction-free tool for capturing ideas, turning them into
actionable plans, and tracking execution progress.

## 1. Installation

```bash
npm install
```

## 2. Database setup (Neon)

Data is stored in a [Neon](https://neon.tech) Postgres database so it syncs
across devices.

1. Create a free Neon project at [neon.tech](https://neon.tech).
2. In the project dashboard, go to **Connection Details** and copy the
   **pooled connection** string.
3. Copy `.env.local.example` to `.env.local` and paste it in:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   DATABASE_URL=postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ```

No manual schema setup is needed — the app creates its table
(`ideas_store`) automatically on first request.

## 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Production build

```bash
npm run build
npm run start
```

## 5. Vercel deployment

Push this repository to GitHub (or another Git provider) and import it at
[vercel.com/new](https://vercel.com/new). Vercel auto-detects the Next.js
app and runs `npm run build`. In the project's **Settings → Environment
Variables**, add `DATABASE_URL` with your Neon connection string before
deploying.

## 6. Where data is stored

All data (ideas, plans, notes, steps, completion state, colors, and
timestamps) is stored as a single JSON document in a Neon Postgres table
(`ideas_store`), accessed through the `/api/ideas` route
([`app/api/ideas/route.ts`](app/api/ideas/route.ts)). Data is shared across
any device that loads the app, since it lives server-side rather than in
the browser.

There is no login — anyone with access to the deployed URL can read/write
this data. That's an intentional simplification for a personal, single-user
tool; add auth if you deploy this somewhere less private.

## 7. Changing the storage backend later

All persistence goes through the `DataStore` interface in
[`lib/storage.ts`](lib/storage.ts), which currently talks to `/api/ideas`.
To switch providers, implement `DataStore` (`load(): Promise<Idea[]>` /
`save(ideas: Idea[]): Promise<void>`) against your new backend and swap the
`dataStore` export — no changes are needed in any component, since they all
read/write through `useIdeas`, which only talks to `dataStore`.
