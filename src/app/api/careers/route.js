import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Position from "@/models/CareerPosition";


const json = (body, status = 200) => NextResponse.json(body, { status });

export async function GET() {
  try {
    await dbConnect();
    const positions = await Position.find().sort({ createdAt: -1 });
    return json({ success: true, data: positions });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    if (!body.title) return json({ success: false, message: "Title required" }, 400);

    const slug = (body.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);

    let finalSlug = slug;
    let exists = await Position.findOne({ slug: finalSlug });
    if (exists) finalSlug = `${slug}-${Date.now().toString(36).slice(-4)}`;

    const position = await Position.create({
      title: body.title,
      department: body.department || "",
      location: body.location || "",
      type: body.type || "full-time",
      slug: finalSlug,
      description: body.description || "",
      requirements: body.requirements || [],
      responsibilities: body.responsibilities || [],
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    });

    return json({ success: true, data: position }, 201);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
