import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Application from "@/models/Application";
import Position from "@/models/CareerPosition";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { position, name, email, phone, coverLetter, resumeUrl } = body;

    if (!position || !name || !email) {
      return NextResponse.json({
        success: false,
        message: "Required fields missing"
      }, { status: 400 });
    }

    // Check if position exists
    const pos = await Position.findById(position);
    if (!pos) {
      return NextResponse.json({ success: false, message: "Invalid Position" }, { status: 400 });
    }

    // Create Application
    const app = await Application.create({
      position,
      name,
      email,
      phone,
      coverLetter,
      resumeUrl
    });

    // ---------- SEND EMAIL TO ADMIN ----------
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
      subject: `New Application for ${pos.title}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${pos.title}</p>
        <p><strong>Cover Letter:</strong><br>${coverLetter}</p>
        <p><strong>Resume:</strong> <a href="${resumeUrl}">Download</a></p>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Application Submitted",
      data: app
    });

  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const apps = await Application.find()
      .populate("position") 
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: apps
    });

  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, 500);
  }
}


