import connectToDatabase from "@/lib/mongodb";
import GuestRoom from "@/models/GuestRoom";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const guestRoom = await GuestRoom.findById(id);
    if (!guestRoom) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(guestRoom), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    const updated = await GuestRoom.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    await GuestRoom.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
