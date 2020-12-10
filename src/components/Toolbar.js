import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../store/categories/selectors";
import Paper from "@material-ui/core/Paper";
import AddCategory from "./AddCategory";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteCategory } from "../store/categories/actions";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
    padding: "1rem",
  },
  toolbarTitle: {
    color: "#58A6FF",
  },
}));

export default function Toolbar({ selectCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={2} className={classes.toolbar}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Typography className={classes.toolbarTitle} variant="h5">
            Select Category
          </Typography>
          {categories.map((category) => {
            return (
              <Grid
                key={category.id}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <FormControlLabel
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
                <Button
                  startIcon={<DeleteForeverIcon color="secondary" />}
                  onClick={() => {
                    const confirm = window.confirm(
                      "Are you sure? Deleting this category will also remove its links and snippets"
                    );
                    if (confirm) dispatch(deleteCategory(category.id));
                  }}
                />
              </Grid>
            );
          })}

          <AddCategory />
        </Grid>
      </Paper>
    </div>
  );
}
