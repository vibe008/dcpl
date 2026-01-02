import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Empanelments from "@/models/Empanelments";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const item = await Empanelments.findById(params.id);

    if (!item) return json({ success: false, message: "Not found" }, 404);

    return json({ success: true, data: item });
  } catch (error) {
    return json({ success: false, message: error.message }, 500);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) return json({ success: false, message: "ID is required" }, 400);
    if (!body.title) return json({ success: false, message: "Title is required" }, 400);

    const updatedEmp = await Empanelments.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedEmp) {
      return json({ success: false, message: "Empanelment not found" }, 404);
    }

    return json({ success: true, data: updatedEmp }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

// DELETE empanelment
export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) return json({ success: false, message: "ID is required" }, 400);

    const deletedEmp = await Empanelments.findByIdAndDelete(id);

    if (!deletedEmp) {
      return json({ success: false, message: "Empanelment not found" }, 404);
    }

    return json({ success: true, message: "Empanelment deleted successfully" }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
