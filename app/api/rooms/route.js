import connectToDatabase from "@/lib/mongodb";
import Room from "@/models/Room";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Auto-reset expired rooms
    const now = new Date();
    await Room.updateMany(
      { rentUntil: { $lte: now }, isAvailable: false },
      { $set: { isAvailable: true, rentUntil: null } }
    );

    const rooms = await Room.find({}).populate("hostelId", "name").sort({ createdAt: -1 });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const room = await Room.create(data);
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
