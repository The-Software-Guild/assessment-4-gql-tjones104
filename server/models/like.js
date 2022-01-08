const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    likedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Like", likeSchema);
