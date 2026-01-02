import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Client from "@/models/Client";

const json = (body, status = 200) => NextResponse.json(body, { status });


export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name) return json({ success: false, message: "name is required" }, 400);
    if (!body.sector) return json({ success: false, message: "sector is required" }, 400);

    const client = await Client.create({
      name: body.name,
      logo: body.logo || "",
      sector: body.sector,
    });

    return json({ success: true, data: client }, 201);

  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

export async function GET() {
  try {
    await dbConnect();

    const clients = await Client.find().sort({ createdAt: -1 });

    return json({ success: true, data: clients }, 200);

  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
