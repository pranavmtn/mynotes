import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_email TEXT PRIMARY KEY,
      display_name TEXT
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
    SELECT display_name FROM user_profiles WHERE user_email = ${session.email}
  `;
  const name = (rows[0]?.display_name as string | undefined) || session.name;
  return NextResponse.json({ email: session.email, name });
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = (await request.json()) as { name?: string };
  const trimmed = name?.trim();
  if (!trimmed) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const sql = getSql();
  await ensureTable();
  await sql`
    INSERT INTO user_profiles (user_email, display_name)
    VALUES (${session.email}, ${trimmed})
    ON CONFLICT (user_email) DO UPDATE SET display_name = EXCLUDED.display_name
  `;
  return NextResponse.json({ email: session.email, name: trimmed });
}
