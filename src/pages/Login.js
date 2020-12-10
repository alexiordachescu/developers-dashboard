import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/developersSnippets");
    }
  }, [token, history]);

  return (
    <div>
      <LoginForm />

      <Link style={{ color: "white", textDecoration: "none" }} to="/signUp">
        Please use this link to create an account!
      </Link>
    </div>
  );
}
