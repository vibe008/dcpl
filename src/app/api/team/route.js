import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Team from "@/models/Team";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        if (!body.name) return json({ success: false, message: " name  is required" }, 400);
        if (!body.position) return json({ success: false, message: " position  is required" }, 400);
        const team = await Team.create({
            name: body.name,
            profile: body.profile || "",
            position: body.position,
            isLeaderShip: body.isLeaderShip || false,
            description: body.description || "",
            email: body.email || ""
        });
        return json({ success: true, data: team }, 201);

    }
    catch (err) {
        return json({ success: false, message: err.message }, 500);
    }
}


export async function GET() {
  try {
    await dbConnect();

    const team = await Team.find().sort({ createdAt: -1 });

    return json({ success: true, data: team }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
