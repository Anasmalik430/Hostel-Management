import connectToDatabase from "@/lib/mongodb";
import Room from "@/models/Room";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    const room = await Room.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    await Room.findByIdAndDelete(id);
    return NextResponse.json({ message: "Room deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
