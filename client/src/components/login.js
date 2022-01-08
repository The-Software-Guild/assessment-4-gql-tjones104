import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = (props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.name,
      password: formState.password,
      email: formState.email,
    },
    onCompleted: ({ login }) => {
      //localStorage.setItem("Token", login.token);
      props.handleToken(login.token);
      navigate("/");
    },
  });

  return (
    <div className="post-item">
      <h2>Login</h2>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
