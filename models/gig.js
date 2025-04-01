import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const gigSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    status: { type: String },
    labor: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Gig = mongoose.models.gigs || mongoose.model("gigs", gigSchema);

export default Gig;