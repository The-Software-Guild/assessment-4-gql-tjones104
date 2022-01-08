const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    description: { type: String },
    date: { type: Date },
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Comment", commentSchema);
