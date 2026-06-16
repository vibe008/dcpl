
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Application from "@/models/Application";
import Position from "@/models/CareerPosition";
import nodemailer from "nodemailer";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = await  params;
    const { status } = await req.json();

    const allowedStatus = ["reviewed", "accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    // Update DB first
    const app = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("position");

    if (!app) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    // ✅ EMAIL ONLY FOR accepted / rejected
    if (status === "accepted" || status === "rejected") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASS,
        }
      });

      const subject =
        status === "accepted"
          ? `Application Accepted – ${app.position.title}`
          : `Application Update – ${app.position.title}`;

      const html =
        status === "accepted"
          ? `
            <p>Dear ${app.name},</p>
            <p>We are pleased to inform you that your application for 
            <strong>${app.position.title}</strong> has been accepted.</p>
            <p>Our HR team will contact you soon.</p>
            <br/>
            <p>Best regards,<br/>HR Team</p>
          `
          : `
            <p>Dear ${app.name},</p>
            <p>Thank you for applying for 
            <strong>${app.position.title}</strong>.</p>
            <p>After review, we regret to inform you that your application was not selected.</p>
            <br/>
            <p>Best regards,<br/>HR Team</p>
          `;

      await transporter.sendMail({
        from: `"HR Team" <${process.env.ADMIN_EMAIL}>`,
        to: app.email,
        subject,
        html
      });
    }

    return NextResponse.json({
      success: true,
      message:
        status === "reviewed"
          ? "Application marked as reviewed"
          : `Application ${status} & email sent`,
      data: app
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}