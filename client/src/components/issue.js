import React, { useContext } from 'react';
import Comment from './comment';
import PostComment from './postComment';
import VoteButtons from './voteButtons';
import DatePosted from './datePosted';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth';

const Issue = ({
  issue,
  issue: {
    id,
    title,
    description,
    createdAt,
    postedBy: { username },
    voteCount,
    commentCount,
  },
  handlefetch,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className='issue-container'>
        {user.user ? (
          <VoteButtons
            id={id}
            likes={issue.likes}
            dislikes={issue.dislikes}
            voteCount={voteCount}
          />
        ) : (
          <VoteButtons
            id={id}
            likes={issue.likes}
            dislikes={issue.dislikes}
            voteCount={voteCount}
          />
        )}
        <div
          className='issue-body'
          onClick={(e) => {
            if (handlefetch) {
              handlefetch(issue);
            }
          }}
        >
          <header className='header'>
            <h3>{title}</h3>

            <h4>
              By: <i>{username}</i> |
              <>
                <DatePosted createdAt={createdAt} />
              </>
            </h4>
          </header>
          <div>
            {issue.comments ? (
              <p>{description}</p>
            ) : (
              <p className='issue-preview'>{description}</p>
            )}
          </div>
          <div className='comment-box'>
            <button className='comment-button '>
              Comments: {commentCount}
            </button>
          </div>
        </div>
      </div>
      {issue.comments && (
        <div>
          {issue.comments.length > 0 ? (
            <div>
              {user.user ? (
                <PostComment issueID={issue.id} />
              ) : (
                <h3 onClick={(e) => navigate('/login')}>
                  <b>
                    <u>You must be logged in to comment, click here to login</u>
                  </b>
                </h3>
              )}
              <div className='comments-container'>
                {issue.comments.map((comment) => (
                  <div key={comment.id}>
                    <Comment comment={comment} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className='comments-container'>
                <h3>No comments yet! Be the first one to comment!</h3>
              </div>
              {user.user ? (
                <PostComment issueID={issue.id} />
              ) : (
                <h3 onClick={(e) => navigate('/login')}>
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
