import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import Issue from "./issue";
import GetOneIssue from "./getOneIssue";

const USER_ISSUE_QUERY = gql`
  query UserIssueQuery {
    getUserIssues {
      id
      title
      description
      createdAt
      postedBy {
        username
      }
      likes {
        likedBy {
          id
        }
      }
      dislikes {
        dislikedBy {
          id
        }
      }
      voteCount
      likeCount
      dislikeCount
      commentCount
    }
  }
`;

const UserIssues = () => {
  const [fetchIssue, setfetchIssue] = useState();
  const {
    data: query,
    loading,
    error,
  } = useQuery(USER_ISSUE_QUERY, { pollInterval: 100 });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let issues = [];
  if (query) {
    issues = [...query.getUserIssues];
  }

  return (
    <div>
      <div className="issue-header">
        <h2>Your Issues</h2>
        {fetchIssue && (
          <button className="back-button" onClick={(e) => setfetchIssue()}>
            Back
          </button>
        )}
      </div>
      {!fetchIssue ? (
        <div>
          {issues &&
            issues.map((issue) => (
              <div key={issue.id} onClick={(e) => setfetchIssue(issue)}>
                <Issue issue={issue} />
              </div>
            ))}
          {issues.length === 0 && <p className="noItems">No issues found</p>}
        </div>
      ) : (
        <div>
          <GetOneIssue id={fetchIssue.id} />
        </div>
      )}
    </div>
  );
};

export default UserIssues;
