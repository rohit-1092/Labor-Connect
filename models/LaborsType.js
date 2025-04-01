import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const laborsTypeSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// Change the model name to match the reference in the controller
const LaborsType = mongoose.models.LaborsType || mongoose.model("LaborsType", laborsTypeSchema);

export default LaborsType;