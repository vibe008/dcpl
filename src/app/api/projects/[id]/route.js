import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Projects from "@/models/Projects";

function jsonResponse(success, message, data = null, status = 200) {
    return NextResponse.json({ success, message, data }, { status });
}

/* ------------ PUT — Update project by ID ------------ */
export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();
        const id = await params?.id
        if ("sectors" in body) {
            if (!Array.isArray(body.sectors)) {
                return jsonResponse(false, "Sectors must be an array", null, 400);
            }

            if (body.sectors.length < 1) {
                return jsonResponse(false, "At least one sector is required", null, 400);
            }
        }
        const updated = await Projects.findOneAndUpdate(
            { id: id },
            body,
            { new: true }
        );

        if (!updated) return jsonResponse(false, "Project not found", null, 404);

        return jsonResponse(true, "Project updated successfully", updated);
    } catch (error) {
        return jsonResponse(false, "Failed to update", { error: error.message }, 500);
    }
}

/* ------------ DELETE — Remove project by ID ------------ */
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const id = await params.id
        const deleted = await Projects.findOneAndDelete({ id: id });

        if (!deleted) return jsonResponse(false, "Project not found", null, 404);

        return jsonResponse(true, "Project deleted successfully");
    } catch (error) {
        return jsonResponse(false, "Failed to delete project", { error: error.message }, 500);
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params;
        let project = await Projects.findById(id);
        if (!project) {
            project = await Projects.findOne({ id });
        }
        if (!project) {
            return jsonResponse(false, "Project not found", null, 404);
        }

        return jsonResponse(true, "Project fetched successfully", project);
    } catch (error) {
        return jsonResponse(false, "Failed", { error: error.message }, 500);
    }
}
