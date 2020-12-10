import React, { useState } from "react";
import { signUp } from "../store/user/actions";
import { useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#333333",
    width: "33%",
    minWidth: "360px",
    margin: "auto",
  },
  formControl: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
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
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Fullname"
          required
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Email Address"
          required
          variant="outlined"
          value={email}
          className={classes.inputSpacing}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Password"
          required
          variant="outlined"
          value={password}
          type="password"
          className={classes.inputSpacing}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" type="submit" onClick={submitSignupForm}>
          Login
        </Button>
      </FormControl>
    </Paper>
  );
}
