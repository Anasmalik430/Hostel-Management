import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Room 101"
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    type: { type: String, required: true }, // e.g., "Single", "Double"
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    location: { type: String, required: true }, // This will be synced from Hostel
    image: { type: String, required: false },
    rentUntil: { type: Date, default: null },
    gender: { type: String, enum: ["Male Only", "Female Only"], default: "Male Only" },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
