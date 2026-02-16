const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  email: String,
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
  token: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invitation", invitationSchema);
