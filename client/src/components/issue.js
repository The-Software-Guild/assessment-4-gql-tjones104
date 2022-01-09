import React, { useState } from "react";
import Comment from "./comment";
import PostComment from "./postComment";
import { useNavigate } from "react-router-dom";

const Issue = ({
  issue,
  issue: {
    id,
    title,
    description,
    createdAt,
    postedBy: { username },
    likeCount,
    commentCount,
  },
}) => {
  const [style, setStyle] = useState("like-button");
  const navigate = useNavigate();

  let today = new Date();
  let postDate = new Date(createdAt);
  let hours = Math.floor((today - postDate) / (1000 * 60 * 60));
  let minutes = Math.floor((today - postDate) / (1000 * 60));
  let seconds = Math.floor((today - postDate) / 1000);

  const token = localStorage.getItem("Token");

  const handleLike = () => {
    if (token) {
      if (style === "like-button") {
        setStyle("liked-button");
      } else {
        setStyle("like-button");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="issue-container">
        <div className="like ">
          <button className={style} onClick={(e) => handleLike(e)}>
            Like
          </button>
          <p>{likeCount}</p>
        </div>
        <div className="issue-body">
          <header className="header">
            <h3>{title}</h3>

            <h4>
              By: <i>{username}</i> |{" "}
              {seconds > 60 ? (
                <span>
                  {" "}
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
