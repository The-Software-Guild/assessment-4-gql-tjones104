const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment").schema;
const Like = require("./like").schema;
const Dislike = require("./dislike").schema;

const issueSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    voteCount: { type: Number },
    likes: [Like],
    dislikes: [Dislike],
    comments: [Comment],
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
