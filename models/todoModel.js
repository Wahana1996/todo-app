import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      default: "Uncompleted",
      enum: ["Uncompleted", "Completed"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Todo", todoSchema);
