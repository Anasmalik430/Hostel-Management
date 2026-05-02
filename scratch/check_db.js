import mongoose from "mongoose";
import Room from "../models/Room.js";

async function checkRooms() {
  try {
    await mongoose.connect("mongodb://localhost:27017/hostel-management");
    const rooms = await Room.find({});
    console.log("TOTAL ROOMS IN DB:", rooms.length);
    rooms.forEach(r => {
      console.log(`Room: ${r.name}, Location: ${r.location}, Gender: ${r.gender}, Available: ${r.isAvailable}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkRooms();
