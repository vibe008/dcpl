import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Projects from "@/models/Projects";

/* ---------------- Helper: JSON Response ---------------- */
function jsonResponse(success, message, data = null, status = 200) {
  return NextResponse.json({ success, message, data }, { status });
}

/* ---------------- Validation ---------------- */
function validateProjectData(data) {
  const errors = [];

  if (!data.title || data.title.trim().length < 3)
    errors.push("Project title must be at least 3 characters long.");

  if (!data.images || !Array.isArray(data.images) || data.images.length === 0)
    errors.push("At least one image is required.");

  if (!data.sectors || !Array.isArray(data.sectors) || data.sectors.length === 0)
    errors.push("At least one sector is required.");


  if (data.year && (isNaN(data.year) || data.year < 1900 || data.year > new Date().getFullYear()))
    errors.push("Invalid year provided.");
  if (
    (data.status === "active" || data.status === "complete") &&
    (!data.consturctionimages ||
      !Array.isArray(data.consturctionimages) ||
      data.consturctionimages.length === 0)
  ) {
    errors.push("Construction images are required when status is active or complete.");
  }
  return errors;
}

/* ---------------- Generate Custom Project ID ---------------- */
function generateProjectId(title, description = "") {
  const clean = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const base = clean(title).slice(0, 20);
  const desc = clean(description).slice(0, 10);
  const random = Math.random().toString(36).substring(2, 6);

  return `${base}-${desc}-${random}`.replace(/^-+|-+$/g, "");
}

/* ---------------- POST — Create Project ---------------- */
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const validationErrors = validateProjectData(body);

    if (validationErrors.length > 0) {
      return jsonResponse(false, "Validation failed", { errors: validationErrors }, 400);
    }
    // if (!markforhomepage) {
    //   return jsonResponse(false, "Validation failed", { errors: validationErrors }, 400);
    // }
    const projectId = generateProjectId(body.title, body.description);

    const project = await Projects.create({
      id: projectId,
      title: body.title.trim(),
      description: body.description || "",
      year: body.year || null,
      location: body.location || "",
      cost: body.cost || null,
      type: body.type || "",
      region: body.region || "",
      sectors: body.sectors || [],
      services: body.services || [],
      images: body.images,
      consturctionimages: body.consturctionimages,
      headerimage: body.headerimage || "",
      status: body.status || "active",
      markforhomepage: body.markforhomepage || false
    });

    return jsonResponse(true, "Project created successfully", project, 201);
  } catch (error) {
    console.log(error);
    return jsonResponse(false, "Failed to create project", { error: error.message }, 500);
  }
}

/* ---------------- GET — All or Single Project ---------------- */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const single = await Projects.findOne({ id });
      if (!single) return jsonResponse(false, "Project not found", null, 404);

      return jsonResponse(true, "Project fetched successfully", single);
    }

    const all = await Projects.find().sort({ createdAt: -1 });
    return jsonResponse(true, "Projects fetched successfully", all);
  } catch (error) {
    return jsonResponse(false, "Failed to fetch projects", { error: error.message }, 500);
  }
}
