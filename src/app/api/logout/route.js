import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", "", {
    path: "/",          // 🔥 MUST MATCH
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}
