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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#333333",
  },
  formControl: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Email Address"
          required
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Enter Email Address"
          required
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" type="submit" onClick={submitLoginForm}>
          Login
        </Button>
      </FormControl>
    </Paper>
  );
}
