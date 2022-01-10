const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = new Schema(
  {
    dislikedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Dislike", dislikeSchema);
