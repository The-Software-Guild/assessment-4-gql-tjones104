import React from "react";

import { gql, useQuery } from "@apollo/client";
import Issue from "./issue";

const ONE_ISSUE_QUERY = gql`
  query OneIssueQuery($id: ID!) {
    getOneIssue(id: $id) {
      id
      title
      description
      createdAt
      postedBy {
        username
      }
      comments {
        id
        description
        createdAt
        commentedBy {
          username
        }
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

const GetOneIssue = (issue) => {
  const {
    data: query,
    loading,
    error,
  } = useQuery(ONE_ISSUE_QUERY, {
    variables: {
      id: issue.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let fetchedIssue;
  if (query) {
    fetchedIssue = query.getOneIssue;
  }

  return <div>{fetchedIssue && <Issue issue={fetchedIssue} />}</div>;
};

export default GetOneIssue;
