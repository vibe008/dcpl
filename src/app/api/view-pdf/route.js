// app/api/view-pdf/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ success: false, message: "No URL provided" }, { status: 400 });

  const response = await fetch(url); // fetch Cloudinary raw PDF
  const arrayBuffer = await response.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=download.pdf", // Open inline in browser
    },
  });
}
