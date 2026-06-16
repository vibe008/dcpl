import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Services from "@/models/Services";
import Projects from "@/models/Projects";
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.title) {
            return NextResponse.json(
                { success: false, message: "Title required" },
                { status: 400 }
            );
        }

        if (!body.description) {
            return NextResponse.json(
                { success: false, message: "Description required" },
                { status: 400 }
            );
        }

        // 🔍 Check if title already exists
        const exists = await Services.findOne({ title: { $regex: new RegExp(`^${body.title}$`, "i") } });

        if (exists) {
            return NextResponse.json(
                { success: false, message: "Service with this title already exists" },
                { status: 409 } // Conflict
            );
        }

        const service = await Services.create({
            title: body.title,
            description: body.description,
        });

        return NextResponse.json({
            success: true,
            message: "Service created",
            data: service,
        });

    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
export async function GET() {
    try {
        await dbConnect();

        // Get all services
        const services = await Services.find();

        // Map each service → get its projects
        const result = await Promise.all(
            services.map(async (service) => {
                const projects = await Projects.find({ services: service._id })
                    .populate("services"); // Optional: populate full service data

                return {
                    _id: service._id,
                    title: service.title,
                    description: service.description,
                    projects,
                };
            })
        );

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
