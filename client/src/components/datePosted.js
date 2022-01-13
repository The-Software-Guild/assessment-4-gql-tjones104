import React from 'react';

const DatePosted = ({ createdAt }) => {
  let today = new Date();
  let postDate = new Date(createdAt);
  let days = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
  let hours = Math.floor((today - postDate) / (1000 * 60 * 60));
  let minutes = Math.floor((today - postDate) / (1000 * 60));
  let seconds = Math.floor((today - postDate) / 1000);

  return (
    <>
      {seconds > 60 ? (
        <span>
          {minutes > 60 ? (
            <span>
              {hours > 24 ? (
                <span> {days} days ago </span>
              ) : (
                <span> {hours} hours ago </span>
              )}
            </span>
          ) : (
            <span> {minutes} minutes ago </span>
          )}
        </span>
      ) : (
        <span> {seconds} seconds ago </span>
      )}
    </>
  );
};

export default DatePosted;
