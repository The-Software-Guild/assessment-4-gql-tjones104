const User = require("../models/user");
const Issue = require("../models/issue");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");

module.exports = {
  // User
  register: async (_, { username, password, email }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new UserInputError("Account with this email already exists");
    }
    const user = await User.create({
      username: username,
      password: password,
      email: email,
      createdAt: new Date().toISOString(),
    });
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
      issuer: "Tristan Jones",
    });
    return {
      token,
      user,
    };
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserInputError("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UserInputError("Invalid password");
    }

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
      issuer: "Tristan Jones",
    });

    return {
      token,
      user,
    };
  },

  // Issues
  postIssue: async (_, { title, description }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }
    const likeCount = 0;
    const issue = await Issue.create({
      title: title,
      description: description,
      createdAt: new Date().toISOString(),
      likeCount,
      postedBy: payload.user,
    });
    return issue;
  },

  deleteIssue: async (_, { id }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }
    try {
      const issue = await Issue.findById(id);
      if (issue) {
        if (payload.user._id === issue.postedBy.valueOf()) {
          await issue.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("You are not the owner of the issue");
        }
      } else {
        throw new Error("Issue not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  //comments
  postComment: async (_, { issueId, description }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }
    if (description.trim() === "") {
      throw new UserInputError("Empty comment");
    }
    const commentedBy = payload.user._id;
    const issue = await Issue.findById(issueId);
    if (issue) {
      issue.comments.unshift({
        description,
        createdAt: new Date().toISOString(),
        commentedBy,
      });
      await issue.save();
      return issue;
    } else {
      throw new UserInputError("Issue not found");
    }
  },

  deleteComment: async (_, { issueId, commentId }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }
    const issue = await Issue.findById(issueId);

    if (issue) {
      const commentIndex = issue.comments.findIndex((c) => c.id === commentId);
      if (
        issue.comments[commentIndex].commentedBy.valueOf() === payload.user._id
      ) {
        issue.comments.splice(commentIndex, 1);
        await issue.save();
        return issue;
      } else {
        throw new AuthenticationError("You are not the owner of the comment");
      }
    } else {
      throw new UserInputError("Issue not found");
    }
  },

  //Liking & disliking
  likePost: async (_, { issueId }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }

    const issue = await Issue.findById(issueId);
    if (issue) {
      if (
        issue.likes.find((like) => like.likedBy.valueOf() === payload.user._id)
      ) {
        // Unlike if liked
        issue.likes = issue.likes.filter(
          (like) => like.likedBy.valueOf() !== payload.user._id
        );
        issue.likeCount--;
      } else {
        // Like if not liked
        const likedBy = payload.user._id;
        issue.likes.push({
          likedBy,
        });
        issue.likeCount++;
      }
      await issue.save();
      return issue;
    } else {
      throw new UserInputError("Issue not found");
    }
  },

  dislikePost: async (_, { issueId }, context) => {
    const { payload } = context;
    if (!payload) {
      throw new AuthenticationError("No Token");
    }

    const issue = await Issue.findById(issueId);
    if (issue) {
      if (
        issue.dislikes.find(
          (dislike) => dislike.dislikedBy.valueOf() === payload.user._id
        )
      ) {
        // Unlike if liked
        issue.dislikes = issue.dislikes.filter(
          (dislike) => dislike.dislikedBy.valueOf() !== payload.user._id
        );
        issue.likeCount++;
      } else {
        // Like if not liked
        const dislikedBy = payload.user._id;
        issue.dislikes.push({
          dislikedBy,
        });
        issue.likeCount--;
      }
      await issue.save();
      return issue;
    } else {
      throw new UserInputError("Issue not found");
    }
  },
};
