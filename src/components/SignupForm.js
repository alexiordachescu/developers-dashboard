import React, { useState } from "react";
import { signUp } from "../store/user/actions";
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

export default function SignupForm() {
  const classes = useStyles();
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
    <Paper elevation={3} className={classes.root}>
      <form onSubmit={submitSignupForm}>
        <FormControl variant="filled" className={classes.formControl}>
          <CssTextField
            label="Enter Fullname"
            required
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              maxLength: 255,
            }}
          />

          <CssTextField
            label="Enter Email Address"
            type="email"
            required
            variant="filled"
            value={email}
            className={classes.inputSpacing}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              maxLength: 255,
            }}
          />

          <CssTextField
            label="Enter Password"
            required
            variant="filled"
            value={password}
            type="password"
            className={classes.inputSpacing}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              maxLength: 255,
            }}
          />

          <Button variant="contained" type="submit">
            Signup
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
}
