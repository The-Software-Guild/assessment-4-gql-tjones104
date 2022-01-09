const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    createdAt: DateTime!
  }

  type Issue {
    id: ID!
    title: String!
    description: String!
    createdAt: DateTime!
    postedBy: User!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: DateTime!
    description: String!
    commentedBy: User!
  }

  type Like {
    id: ID!
    likedBy: User!
  }

  type Query {
    getUsers: [User]
    getOneUser(id: ID!): User
    getIssues: [Issue]
    getOneIssue(id: ID!): Issue
  }

  type Mutation {
    register(username: String!, password: String!, email: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    postIssue(title: String!, description: String!): Issue!
    deleteIssue(id: ID!): String!
    postComment(issueId: ID!, description: String!): Issue!
    deleteComment(issueId: ID!, commentId: ID!): Issue!
    likePost(issueId: ID!): Issue!
  }

  type AuthPayload {
    token: String
    user: User
  }

  scalar DateTime
`;

module.exports = typeDefs;
