import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Contact from "@/models/Contact";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Inquiry deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE contact error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry", error: error.message },
      { status: 500 }
    );
  }
}
