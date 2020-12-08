import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div>
      <LoginForm />

      <Link style={{ color: "black", textDecoration: "none" }} to="/signUp">
        Please use this link to create an account!
      </Link>
    </div>
  );
}
