import connectToDatabase from "@/lib/mongodb";
import GuestRoom from "@/models/GuestRoom";

export async function GET() {
  try {
    await connectToDatabase();
    const guestRooms = await GuestRoom.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(guestRooms), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newGuestRoom = await GuestRoom.create(data);
    return new Response(JSON.stringify(newGuestRoom), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
