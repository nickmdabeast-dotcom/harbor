import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, env: process.env.VERCEL ? "production" : "development" });
}
