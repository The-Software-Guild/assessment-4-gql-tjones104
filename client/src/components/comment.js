import React from 'react';
import DatePosted from './datePosted';

const Comment = ({
  comment: {
    description,
    commentedBy: { username },
    createdAt,
  },
}) => {
  return (
    <div className='comments'>
      <h5>
        {username} |
        <DatePosted createdAt={createdAt} />
      </h5>
      <p>{description}</p>
    </div>
  );
};

export default Comment;
