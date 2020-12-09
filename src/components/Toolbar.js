import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import Paper from "@material-ui/core/Paper";
import AddCategory from "./AddCategory";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
  toolbarTitle: {
    color: "#5e35b1",
  },
}));

export default function Toolbar({ selectCategory }) {
  const categories = useSelector(selectCategories);
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={2} className={classes.toolbar}>
        <Typography className={classes.toolbarTitle} variant="h5">
          Select category:
        </Typography>
        {categories.map((category) => {
          return (
            <Grid
              container
              key={category.id}
              alignItems="center"
              justify="center"
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
            </Grid>
          );
        })}{" "}
        <AddCategory />
      </Paper>
    </div>
  );
}
