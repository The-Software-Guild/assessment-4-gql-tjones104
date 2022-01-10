import React from "react";

const Issue = ({
  comment,
  comment: {
    id,
    description,
    commentedBy: { username },
    createdAt,
  },
}) => {
  let today = new Date();
  let postDate = new Date(createdAt);
  let hours = Math.floor((today - postDate) / (1000 * 60 * 60));
  let minutes = Math.floor((today - postDate) / (1000 * 60));
  let seconds = Math.floor((today - postDate) / 1000);

  return (
    <div className="comments">
      <h5>
        {username} |
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
      </h5>
      <p>{description}</p>
    </div>
  );
};

export default Issue;
