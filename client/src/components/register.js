import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $username: String!
    $password: String!
    $email: String!
  ) {
    register(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const Register = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [register] = useMutation(REGISTER_MUTATION, {
    variables: {
      username: formState.name,
      password: formState.password,
      email: formState.email,
    },
    onCompleted: ({ register }) => {
      //localStorage.setItem("Token", register.token);
      props.handleToken(register.token);
      navigate("/");
    },
  });

  return (
    <div className="post-item">
      <h2>Register</h2>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Bob"
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value,
            })
          }
          required
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          placeholder="*******"
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          required
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          placeholder="bob@gmail.com"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          required
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
