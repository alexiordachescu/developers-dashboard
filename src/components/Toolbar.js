import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import Paper from "@material-ui/core/Paper";
import AddCategory from "./AddCategory";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export default function Toolbar({ selectCategory }) {
  const categories = useSelector(selectCategories);

  return (
    <div>
      <Paper elevation={2}>
        <h2>
          Please select a category to show the corresponding results for it:
        </h2>
        {categories.map((category) => {
          return (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  onClick={() => selectCategory(category.id)}
                  color="primary"
                  checkedIcon={<Favorite />}
                />
              }
              label={category.name}
            />
          );
        })}{" "}
        <AddCategory />
      </Paper>
    </div>
  );
}
