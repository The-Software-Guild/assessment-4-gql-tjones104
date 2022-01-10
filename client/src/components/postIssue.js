import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const POST_ISSUE_MUTATION = gql`
  mutation PostIssueMutation($title: String!, $description: String!) {
    postIssue(title: $title, description: $description) {
      id
    }
  }
`;

const PostIssue = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const [postIssue] = useMutation(POST_ISSUE_MUTATION, {
    variables: {
      title: formState.title,
      description: formState.description,
    },
    onCompleted: () => {
      navigate("/");
    },
  });

  return (
    <div className="post-item">
      <h2>Add an Issue</h2>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          postIssue();
        }}
      >
        <label>Title:</label>
        <input
          type="text"
          name="title"
          placeholder="eye catching title"
          value={formState.title}
          onChange={(e) =>
            setFormState({
              ...formState,
              title: e.target.value,
            })
          }
          required
        />
        <label>Description:</label>
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
        <button>Add Issue</button>
      </form>
    </div>
  );
};

export default PostIssue;
