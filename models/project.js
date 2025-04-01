import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    budget: { type: Number },
    status: { type: String },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    labor: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;