module.exports = {
  likeCount: (parent) => parent.likes.length,
  dislikeCount: (parent) => parent.dislikes.length,
  commentCount: (parent) => parent.comments.length,
};
