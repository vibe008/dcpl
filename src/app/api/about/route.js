import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import About from "@/models/About";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function GET() {
  try {
    await dbConnect();
    let about = await About.findOne();
    if (!about) {
      // Create and save default record in DB if it does not exist yet
      about = await About.create({
        sideImage: "/assets/aboutimg.png",
        title: "Dera Consultants Pvt. Ltd.",
        foundedText: "was founded by Ar. Mayank Garg in 2011. Later in 2014, it was converted to Dera Consultants Private Limited.",
        directorsText: "Dera Consultants Private Limited has 2 appointed Directors/decision makers: Mayank Garg and Anand Thakkar.",
        teamText: "Today, it is a design practice with over 25 people, with offices at:",
        offices: [
          { city: "Mathura", state: "Uttar Pradesh" },
          { city: "Ahmedabad", state: "Gujarat - (Branch Office)" },
        ],
        servicesText: "We are a multidisciplinary practice that provides professional services in Architectural design, interior design, Engineering, Urban planning, Project management and construction management.",
        philosophyText: "We believe that design is essentially problem-solving. The objective is to find simple and elegant solutions to practical problems, within the unique constraints faced by each project.",
      });
    }
    return json({ success: true, data: about }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    about.sideImage = body.sideImage || "/assets/aboutimg.png";
    about.title = body.title || "Dera Consultants Pvt. Ltd.";
    about.foundedText = body.foundedText || "";
    about.directorsText = body.directorsText || "";
    about.teamText = body.teamText || "";
    about.offices = Array.isArray(body.offices) ? body.offices : [];
    about.servicesText = body.servicesText || "";
    about.philosophyText = body.philosophyText || "";

    await about.save();

    return json({ success: true, data: about }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
