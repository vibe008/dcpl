import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnection";
import Client from "@/models/Client";

const json = (body, status = 200) => NextResponse.json(body, { status });

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) return json({ success: false, message: "ID is required" }, 400);
    if (!body.name) return json({ success: false, message: "Name is required" }, 400);
    if (!body.sector) return json({ success: false, message: "Sector is required" }, 400);
    
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        name: body.name,
        sector: body.sector,
        logo: body.logo || ""
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedClient) {
      return json({ success: false, message: "Client not found" }, 404);
    }
    
    return json({ success: true, data: updatedClient }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}

// DELETE client
export async function DELETE(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) return json({ success: false, message: "ID is required" }, 400);
    
    const deletedClient = await Client.findByIdAndDelete(id);
    
    if (!deletedClient) {
      return json({ success: false, message: "Client not found" }, 404);
    }
    
    return json({ success: true, message: "Client deleted successfully" }, 200);
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
}
