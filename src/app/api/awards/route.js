import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Award from "@/models/Award";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title) return json({ success: false, message: "Title is required" }, 400);
    if (!body.description) return json({ success: false, message: "Description is required" }, 400);
    if (!body.year) return json({ success: false, message: "Year is required" }, 400);

    const award = await Award.create({
      title: body.title.trim(),
      description: body.description.trim(),
      year: body.year.toString().trim(),
      images: Array.isArray(body.images) ? body.images : [],
    });

    return json({ success: true, data: award }, 201);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

export async function GET() {
  try {
    await dbConnect();
    // Sort awards by year descending, then by creation time descending
    const awards = await Award.find().sort({ year: -1, createdAt: -1 });
    return json({ success: true, data: awards }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
