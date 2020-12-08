import React, { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = (event) => {
    event.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={submitLoginForm}>
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
