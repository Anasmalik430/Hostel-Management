import connectToDatabase from "@/lib/mongodb";
import Hostel from "@/models/Hostel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const hostel = await Hostel.findById(id);
    if (!hostel) return NextResponse.json({ error: "Hostel not found" }, { status: 404 });
    return NextResponse.json(hostel);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    const hostel = await Hostel.findByIdAndUpdate(id, data, { returnDocument: "after" });
    if (!hostel) return NextResponse.json({ error: "Hostel not found" }, { status: 404 });
    return NextResponse.json(hostel);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const hostel = await Hostel.findByIdAndDelete(id);
    if (!hostel) return NextResponse.json({ error: "Hostel not found" }, { status: 404 });
    return NextResponse.json({ message: "Hostel deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
