import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/categories/actions";
import { makeStyles } from "@material-ui/core";
import { CssTextField } from "./AddSnippet";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "rgba(255, 255, 255, 0.65)",
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
    <form onSubmit={submitForm}>
      <CssTextField
        id="addCategory"
        label="Add Category"
        variant="filled"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={classes.toolbar}
        required
        inputProps={{
          maxLength: 255,
        }}
      />

      <Button variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
}
