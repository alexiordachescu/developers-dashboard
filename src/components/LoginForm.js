import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={submitLoginForm}>
        <div>
          <label>Email:</label>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
