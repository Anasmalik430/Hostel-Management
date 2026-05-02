import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    image: { type: String, required: false },
    isAvailable: { type: Boolean, default: true },
    tags: [{ type: String }],
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);
