import { dbConnect } from "@/lib/dbConnection";
import MainSlider from "@/models/HomeSlider";
import { NextResponse } from "next/server";

// ------------------ POST ------------------
export async function POST(req) {
  try {
    await dbConnect();
    const { mainimageurl, sectors ,title } = await req.json();

    if (!mainimageurl) {
      return NextResponse.json(
        { success: false, message: "Main image URL is required" },
        { status: 400 }
      );
    }
    if (!title) {
      return NextResponse.json(
        { success: false, message: "Project Title  is required" },
        { status: 400 }
      );
    }

    const newSlider = await MainSlider.create({
      mainimageurl,
      sectors: sectors || [],
      title
    });

    return NextResponse.json(
      {
        success: true,
        message: "Main slider created successfully",
        data: newSlider,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ------------------ GET ------------------
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    let query = {};

    if (search) {
      query = {
        sectors: { $regex: search, $options: "i" },
      };
    }

    const sliders = await MainSlider.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: sliders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
