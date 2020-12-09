import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectToken } from "../store/user/selectors";

import SignupForm from "../components/SignupForm";

export default function Signup() {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/developerSnippets");
    }
  }, [token, history]);

  return (
    <div>
      <SignupForm />
    </div>
  );
}
