import mongoose from "mongoose";

const GuestRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Premium Guest Suite"
    roomNumber: { type: String, required: true }, 
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    image: { type: String, required: false },
    rentCycle: { type: String, enum: ["Day", "Week", "Month", "Year"], default: "Day" },
    gender: { type: String, default: "Male Only" },
    sharing: { type: String, default: "Single" },
    amenities: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.GuestRoom || mongoose.model("GuestRoom", GuestRoomSchema);
