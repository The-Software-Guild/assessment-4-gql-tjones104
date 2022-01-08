module.exports = {
  likeCount: (parent) => parent.likes.length,
  commentCount: (parent) => parent.comments.length,
};
