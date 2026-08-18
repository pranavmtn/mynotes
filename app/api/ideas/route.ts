import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSql } from "@/lib/db";
import type { Idea } from "@/lib/types";

export const dynamic = "force-dynamic";

async function ensureTable() {
  const sql = getSql();
  // one-time migration from the earlier single-row (id INT) schema to per-user rows
  await sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'ideas_store' AND column_name = 'id'
      ) THEN
        DROP TABLE ideas_store;
      END IF;
    END $$;
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ideas_store (
      user_email TEXT PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '[]'::jsonb
    )
  `;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  await ensureTable();
  const rows = await sql`
    SELECT data FROM ideas_store WHERE user_email = ${session.email}
  `;
  const ideas = (rows[0]?.data ?? []) as Idea[];
  return NextResponse.json(ideas);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();
  await ensureTable();
  const ideas = (await request.json()) as Idea[];
  await sql`
    INSERT INTO ideas_store (user_email, data)
    VALUES (${session.email}, ${JSON.stringify(ideas)}::jsonb)
    ON CONFLICT (user_email) DO UPDATE SET data = EXCLUDED.data
  `;
  return NextResponse.json({ ok: true });
}
