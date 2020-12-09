import React from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../store/categories/selectors";
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
    color: "#58A6FF",
  },
}));

export default function Toolbar({ selectCategory }) {
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
            Select category:
          </Typography>
          {categories.map((category) => {
            return (
              <Grid
                key={category.id}
                container
                direction="column"
                alignItems="stretch"
                justify="space-between"
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
          })}
          <AddCategory />
        </Grid>
      </Paper>
    </div>
  );
}
