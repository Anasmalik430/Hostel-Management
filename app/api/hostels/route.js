import connectToDatabase from "@/lib/mongodb";
import Hostel from "@/models/Hostel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const hostels = await Hostel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(hostels);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const hostel = await Hostel.create(data);
    return NextResponse.json(hostel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
