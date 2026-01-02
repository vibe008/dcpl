import { dbConnect } from "@/lib/dbConnection";
import MainSlider from "@/models/HomeSlider";
import { NextResponse } from "next/server";

// ------------------ PUT ------------------
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await MainSlider.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Main slider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Main slider updated successfully",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ------------------ DELETE ------------------
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const deleted = await MainSlider.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Main slider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Main slider deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
