import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const POST_COMMENT_MUTATION = gql`
  mutation PostCommentMutation($issueId: ID!, $description: String!) {
    postComment(issueId: $issueId, description: $description) {
      id
      title
      comments {
        id
        createdAt
        description
      }
    }
  }
`;

const PostComment = (props) => {
  const [formState, setFormState] = useState({
    description: "",
  });
  const [postComment] = useMutation(POST_COMMENT_MUTATION, {
    variables: {
      issueId: props.issueID,
      description: formState.description,
    },
    onCompleted: () => {
      setFormState({
        description: "",
      });
    },
  });

  return (
    <div className="post-comment">
      <h3>Comment:</h3>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          postComment();
        }}
      >
        <input
          type="text"
          name="description"
          placeholder="something interesting"
          value={formState.description}
          onChange={(e) =>
            setFormState({
              ...formState,
              description: e.target.value,
            })
          }
          required
        />
        <button>Add Comment</button>
      </form>
    </div>
  );
};

export default PostComment;
