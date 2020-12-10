import React, { useState } from "react";
import { login } from "../store/user/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
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

  const history = useHistory();
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
      <FormControl variant="outlined" className={classes.formControl}>
        <CssTextField
          id="outlined-multiline-flexible"
          label="Enter Email Address"
          required
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <CssTextField
          id="outlined-multiline-flexible"
          label="Enter Password"
          required
          variant="outlined"
          type="password"
          value={password}
          className={classes.inputSpacing}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" type="submit" onClick={submitLoginForm}>
          Login
        </Button>
      </FormControl>
    </Paper>
  );
}
