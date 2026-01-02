import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Team from "@/models/Team";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) return json({ success: false, message: "ID is required" }, 400);
    if (!body.name) return json({ success: false, message: "Name is required" }, 400);
    if (!body.position) return json({ success: false, message: "Position is required" }, 400);
    
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        name: body.name,
        position: body.position,
        profile: body.profile || "",
        isLeaderShip: body.isLeaderShip || false
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedTeam) {
      return json({ success: false, message: "Team member not found" }, 404);
    }
    
    return json({ success: true, data: updatedTeam }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}


export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) return json({ success: false, message: "ID is required" }, 400);
    
    const deletedTeam = await Team.findByIdAndDelete(id);
    
    if (!deletedTeam) {
      return json({ success: false, message: "Team member not found" }, 404);
    }
    
    return json({ success: true, message: "Team member deleted successfully" }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
