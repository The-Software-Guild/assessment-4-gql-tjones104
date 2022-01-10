const User = require("../models/user");
const Issue = require("../models/issue");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  getUsers: async () => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      return users;
    } catch (err) {
      throw new Error(err);
    }
  },
  getOneUser: async (_, { id }) => {
    try {
      const user = await User.findById(id);
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  getIssues: async () => {
    try {
      const issues = await Issue.find()
        .sort({ likeCount: -1 })
        .populate([
          "postedBy",
          { path: "comments", populate: { path: "commentedBy" } },
          { path: "likes", populate: { path: "likedBy" } },
          { path: "dislikes", populate: { path: "dislikedBy" } },
        ]);
      return issues;
    } catch (err) {
      throw new Error(err);
    }
  },
  getUserIssues: async (_, args, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }
    const id = payload.user._id;
    try {
      const issues = await Issue.find({ postedBy: id })
        .sort({ likeCount: -1 })
        .populate([
          "postedBy",
          { path: "comments", populate: { path: "commentedBy" } },
          { path: "likes", populate: { path: "likedBy" } },
          { path: "dislikes", populate: { path: "dislikedBy" } },
        ]);
      return issues;
    } catch (err) {
      throw new Error(err);
    }
  },
  getOneIssue: async (_, { id }) => {
    try {
      const issue = await Issue.findById(id).populate([
        "postedBy",
        { path: "comments", populate: { path: "commentedBy" } },
        { path: "likes", populate: { path: "likedBy" } },
        { path: "dislikes", populate: { path: "dislikedBy" } },
      ]);
      if (issue) {
        return issue;
      } else {
        throw new Error("Post not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};
