import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../store/categories/selectors";
import { addLink } from "../store/links/actions";
import { CssTextField } from "./AddSnippet";

const initialForm = {
  category: "",
  name: "",
  content: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#212121",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: "100%",
    backgroundColor: "#212121",
  },
  inputSpacing: {
    marginTop: "1rem",
  },
}));

export default function AddLink() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [form, setForm] = useState(initialForm);

  function submitForm(e) {
    e.preventDefault();
    dispatch(addLink(form));
    setForm(initialForm);
  }

  if (categories.length === 0) return null;

  return (
    <Paper elevation={3} className={classes.root}>
      <FormControl variant="outlined" className={classes.form}>
        <InputLabel
          id="demo-simple-select-outlined-label"
          style={{ color: "white" }}
        >
          Technology
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={form.category}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          label="Choose Technology"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <CssTextField
          id="outlined-multiline-flexible"
          label="Add a link name"
          fullWidth
          required
          variant="outlined"
          value={form.name}
          className={classes.inputSpacing}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <CssTextField
          id="outlined-multiline-flexible"
          label="Add the link to this resource"
          multiline
          fullWidth
          required
          variant="outlined"
          value={form.content}
          className={classes.inputSpacing}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <Button variant="contained" type="submit" onClick={submitForm}>
          Add this link!
        </Button>
      </FormControl>
    </Paper>
  );
}
