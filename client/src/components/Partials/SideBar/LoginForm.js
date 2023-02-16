import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

import classes from "./LoginForm.module.css";

const LoginForm = ({ setSideState }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.loginForm}>
      <form>
        <Input
          input={{
            id: "username",
            type: "text",
            value: username,
            onChange: (e) => {
              setUsername(e.target.value);
            },
          }}
          label="username"
          hidden="false"
        />
        <Input
          input={{
            id: "password",
            type: "password",
            value: password,
            onChange: (e) => {
              setPassword(e.target.value);
            },
          }}
          label="password"
          hidden="false"
        />
      </form>
      <Button>Login</Button>
      <Button>Create Account</Button>
    </div>
  );
};

export default LoginForm;
