import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Position from "@/models/CareerPosition";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const p = await Position.findById(id);
        if (!p) return json({ success: false, message: "Not found" }, 404);
        return json({ success: true, data: p });
    } catch (err) {
        return json({ success: false, message: err.message }, 500);
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        // OPTIONAL: admin auth

        const updated = await Position.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updated) return json({ success: false, message: "Not found" }, 404);
        return json({ success: true, data: updated });
    } catch (err) {
        return json({ success: false, message: err.message }, 500);
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } =await  params;

        const updated = await Position.findByIdAndDelete(
            id,
        );

        if (!updated) return json({ success: false, message: "Not found" }, 404);

        return json({ success: true, message: "Position deactivated (not deleted)" });

    } catch (err) {
        return json({ success: false, message: err.message }, 500);
    }
}

