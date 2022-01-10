import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import Issue from "./issue";
import GetOneIssue from "./getOneIssue";

export const ISSUE_QUERY = gql`
  query IssueQuery {
    getIssues {
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
      likeCount
      dislikeCount
      commentCount
    }
  }
`;

const GetIssues = () => {
  const [fetchIssue, setfetchIssue] = useState();
  const {
    data: query,
    loading,
    error,
  } = useQuery(ISSUE_QUERY, { pollInterval: 100 });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let issues = [];
  if (query) {
    issues = [...query.getIssues];
  }

  return (
    <div>
      <div className="issue-header">
        <h2>Issues</h2>
        {fetchIssue && (
          <button className="back-button" onClick={(e) => setfetchIssue()}>
            Back
          </button>
        )}
      </div>
      {!fetchIssue ? (
        <div>
          <div>
            {issues &&
              issues.map((issue) => (
                <div
                  className="issue-box"
                  key={issue.id}
                  onClick={(e) => setfetchIssue(issue)}
                >
                  <Issue issue={issue} />
                </div>
              ))}
          </div>
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

export default GetIssues;
