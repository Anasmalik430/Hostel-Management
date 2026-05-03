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
    rentDurationValue: { type: Number, default: 0 },
    rentDurationUnit: { type: String, default: "Month" },
    gender: { type: String, enum: ["Male Only", "Female Only"], default: "Male Only" },
    rentCycle: { type: String, enum: ["Day", "Week", "Month", "Year"], default: "Month" },
    amenities: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
