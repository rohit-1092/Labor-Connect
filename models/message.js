import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;