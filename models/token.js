import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const tokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    token: { type: String },
  },
  { timestamps: true }
);

const Token = mongoose.models.tokens || mongoose.model("tokens", tokenSchema);

export default Token;