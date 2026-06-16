import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Empanelments from "@/models/Empanelments";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
   console.log('body',body)
    if (!body.title) {
      return json({ success: false, message: "Title is required" }, 400);
    }

    const emp = await Empanelments.create(body);
    return json({ success: true, data: emp }, 201);
  } catch (error) {
    return json({ success: false, message: error.message }, 500);
  }
}

export async function GET() {
  try {
    await dbConnect();
    const data = await Empanelments.find().sort({ createdAt: -1 });
    return json({ success: true, data });
  } catch (error) {
    return json({ success: false, message: error.message }, 500);
  }
}
