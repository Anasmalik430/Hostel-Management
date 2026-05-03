import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false },
    isAvailable: { type: Boolean, default: true }  },
  { timestamps: true },
);

export default mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema);
