import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Services from "@/models/Services";
import Projects from "@/models/Projects";

// ---------- UPDATE SERVICE ----------
export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();

        if (!body.title && !body.description) {
            return NextResponse.json(
                { success: false, message: "Nothing to update" },
                { status: 400 }
            );
        }

        const updated = await Services.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Service updated successfully",
            data: updated,
        });

    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

// ---------- DELETE SERVICE ----------
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;

        // First: Remove service reference from all projects
        await Projects.updateMany(
            { services: id },
            { $pull: { services: id } }
        );

        // Second: Delete the service itself
        const deleted = await Services.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Service deleted successfully",
        });

    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
