import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, minlength: 3 },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date },
});

// pre-save
taskSchema.pre("save", function () {
  this.updateAt = Date.now();
});

export const Task = mongoose.model("Task", taskSchema);
