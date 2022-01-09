import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Issue from "./issue";
import GetOneIssue from "./getOneIssue";

const ISSUE_QUERY = gql`
  query IssueQuery {
    getIssues {
      id
      title
      description
      createdAt
      postedBy {
        username
      }
      likeCount
      commentCount
    }
  }
`;

const GetIssues = () => {
  const navigate = useNavigate();
  const [fetchIssue, setfetchIssue] = useState();
  const {
    data: query,
    loading,
    error,
  } = useQuery(ISSUE_QUERY, { pollInterval: 500 });

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
          {issues &&
            issues.map((issue) => (
              <div key={issue.id} onClick={(e) => setfetchIssue(issue)}>
                <Issue issue={issue} />
              </div>
            ))}
        </div>
      ) : (
        <div
        // onClick={(e) => setfetchIssue()}
        >
          <GetOneIssue id={fetchIssue.id} />
        </div>
      )}
    </div>
  );
};

export default GetIssues;
