import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/categories/actions";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
}));

export default function AddCategory() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const classes = useStyles();

  function submitForm(e) {
    e.preventDefault();
    dispatch(addCategory(category));
    setCategory("");
  }

  return (
    <>
      <TextField
        id="addCategory"
        label="Add Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={classes.toolbar}
      />

      <Button variant="contained" type="submit" onClick={submitForm}>
        Add
      </Button>
    </>
  );
}
