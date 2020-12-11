import React, { useState } from "react";
import { login } from "../store/user/actions";
import { useDispatch } from "react-redux";

import { Button, FormControl, makeStyles, Paper } from "@material-ui/core";
import { CssTextField } from "./AddSnippet";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#212121",
    width: "33%",
    minWidth: "360px",
    margin: "100px auto",
  },
  formControl: {
    width: "100%",
    backgroundColor: "#212121",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputSpacing: {
    marginTop: "1rem",
  },
}));

export default function LoginForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };
  return (
    <Paper elevation={3} className={classes.root}>
      <form onSubmit={submitLoginForm}>
        <FormControl variant="filled" className={classes.formControl}>
          <CssTextField
            label="Enter Email Address"
            type="email"
            required
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              maxLength: 255,
            }}
          />

          <CssTextField
            label="Enter Password"
            required
            variant="filled"
            type="password"
            value={password}
            className={classes.inputSpacing}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              maxLength: 255,
            }}
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
