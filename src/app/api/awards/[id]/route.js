import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Award from "@/models/Award";

function jsonResponse(success, message, data = null, status = 200) {
  return NextResponse.json({ success, message, data }, { status });
}

/* ------------ GET — Fetch award by ID ------------ */
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const award = await Award.findById(id);
    if (!award) return jsonResponse(false, "Award not found", null, 404);

    return jsonResponse(true, "Award fetched successfully", award);
  } catch (error) {
    return jsonResponse(false, "Failed to fetch award", { error: error.message }, 500);
  }
}

/* ------------ PUT — Update award by ID ------------ */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const updated = await Award.findByIdAndUpdate(
      id,
      {
        ...body,
        title: body.title?.trim(),
        description: body.description?.trim(),
        year: body.year?.toString().trim(),
        images: Array.isArray(body.images) ? body.images : undefined,
      },
      { new: true }
    );

    if (!updated) return jsonResponse(false, "Award not found", null, 404);

    return jsonResponse(true, "Award updated successfully", updated);
  } catch (error) {
    return jsonResponse(false, "Failed to update award", { error: error.message }, 500);
  }
}

/* ------------ DELETE — Remove award by ID ------------ */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await Award.findByIdAndDelete(id);
    if (!deleted) return jsonResponse(false, "Award not found", null, 404);

    return jsonResponse(true, "Award deleted successfully");
  } catch (error) {
    return jsonResponse(false, "Failed to delete award", { error: error.message }, 500);
  }
}
