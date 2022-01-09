const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment").schema;
const Like = require("./like").schema;

const issueSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    likes: [Like],
    comments: [Comment],
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;