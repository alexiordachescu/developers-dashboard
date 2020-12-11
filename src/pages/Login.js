import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { Typography } from "@material-ui/core";

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
        <Typography>Please use this link to create an account</Typography>
      </Link>
    </div>
  );
}
