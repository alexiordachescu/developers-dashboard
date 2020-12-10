import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../store/categories/selectors";
import { addSnippet } from "../store/snippets/actions";

const initialForm = {
  category: "",
  name: "",
  content: "",
  comment: "",
};

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    borderRadius: "4px",
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#212121",
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
export default function AddSnippet() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [form, setForm] = useState(initialForm);

  function submitForm(e) {
    e.preventDefault();
    dispatch(addSnippet(form));
    setForm(initialForm);
  }

  if (categories.length === 0) return null;

  return (
    <Paper elevation={3} className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          id="demo-simple-select-outlined-label"
          style={{
            color: "white",
          }}
        >
          Technology
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={form.category}
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          label="Technology"
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
          label="Add a snippet name"
          fullWidth
          required
          variant="outlined"
          value={form.name}
          className={classes.inputSpacing}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <CssTextField
          id="outlined-multiline-flexible"
          label="Add a code snippet"
          multiline
          fullWidth
          required
          variant="outlined"
          value={form.content}
          className={classes.inputSpacing}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <CssTextField
          id="outlined-multiline-flexible"
          label="Add a comment"
          multiline
          fullWidth
          variant="outlined"
          value={form.comment}
          className={classes.inputSpacing}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />

        <Button variant="contained" type="submit" onClick={submitForm}>
          Add this snippet!
        </Button>
      </FormControl>
    </Paper>
  );
}
