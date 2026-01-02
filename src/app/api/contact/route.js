import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import nodemailer from "nodemailer";
const json = (body, status = 200) => NextResponse.json(body, { status });

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        if (!body.email) return json({ success: false, message: " email  is required" }, 400);
        if (!body.name) return json({ success: false, message: " name  is required" }, 400);
        if (!body.message) return json({ success: false, message: " message  is required" }, 400);
        if (!body.subject) return json({ success: false, message: " subject  is required" }, 400);
        const contact = await Contact.create({
            email: body.email,
            phone: body.phone || "",
            name: body.name,
            message: body.message,
            subject: body.subject,
            date: Date.now()
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL, // send mail to admin
            subject: `New Incuiry from ${body.name}`,
            html: `
                <h2>New Application Received</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone:</strong> ${body.phone}</p>
                <p><strong>Subject:</strong> ${body.subject}</p>
                <p><strong>Message:</strong><br>${body.message}</p>
              `
        });
        return json({ success: true, data: contact }, 201);

    } catch (err) {
        return json({ success: false, message: err.message }, 500);
    }
}

export async function GET(req) {
    try {
        await dbConnect();

        const contacts = await Contact.find().sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, data: contacts },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
