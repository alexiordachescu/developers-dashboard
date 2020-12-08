import React, { useState } from "react";
import { signUp } from "../store/user/actions";
import { useDispatch } from "react-redux";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitSignupForm = (event) => {
    event.preventDefault();
    dispatch(signUp(name, email, password));
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={submitSignupForm}>
        <div>
          <label>Please fill in your name:</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Your e-mail address:</label>
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <label>Password:</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <div>
          <button type="submit">Create this account!</button>
        </div>
      </form>
    </div>
  );
}
