import React from "react";
import Comment from "./comment";
import PostComment from "./postComment";
import VoteButtons from "./voteButtons";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Issue = ({
  issue,
  issue: {
    id,
    title,
    description,
    createdAt,
    postedBy: { username },
    likeCount,
    dislikeCount,
    commentCount,
  },
}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  let { payload } = {};
  let today = new Date();
  let postDate = new Date(createdAt);
  let hours = Math.floor((today - postDate) / (1000 * 60 * 60));
  let minutes = Math.floor((today - postDate) / (1000 * 60));
  let seconds = Math.floor((today - postDate) / 1000);

  if (localStorage.getItem("Token")) {
    payload = jwtDecode(localStorage.getItem("Token"));
  }

  return (
    <div>
      <div className="issue-container">
        {token ? (
          <VoteButtons
            user={payload.user}
            id={id}
            likes={issue.likes}
            dislikes={issue.dislikes}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
          />
        ) : (
          <VoteButtons
            id={id}
            likes={issue.likes}
            dislikes={issue.dislikes}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
          />
        )}
        <div className="issue-body">
          <header className="header">
            <h3>{title}</h3>

            <h4>
              By: <i>{username}</i> |
              {seconds > 60 ? (
                <span>
                  {minutes > 60 ? (
                    <span> {hours} hours ago </span>
                  ) : (
                    <span> {minutes} minutes ago </span>
                  )}
                </span>
              ) : (
                <span> {seconds} seconds ago </span>
              )}
            </h4>
          </header>
          <div>
            <p>{description}</p>
          </div>
          <div className="comment-box">
            <button className="comment-button ">
              Comments: {commentCount}
            </button>
          </div>
        </div>
      </div>
      {issue.comments && (
        <div>
          {issue.comments.length > 0 ? (
            <div>
              {token ? (
                <PostComment issueID={issue.id} />
              ) : (
                <h3 onClick={(e) => navigate("/login")}>
                  <b>
                    <u>You must be logged in to comment, click here to login</u>
                  </b>
                </h3>
              )}
              <div className="comments-container">
                {issue.comments.map((comment) => (
                  <div key={comment.id}>
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="comments-container">
                <h3>No comments yet! Be the first one to comment!</h3>
              </div>
              {token ? (
                <PostComment issueID={issue.id} />
              ) : (
                <h3 onClick={(e) => navigate("/login")}>
                  <b>
                    <u>You must be logged in to comment, click here to login</u>
                  </b>
                </h3>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Issue;
