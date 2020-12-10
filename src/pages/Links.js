import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllLinks } from "../store/links/selectors";
import LinkCard from "../components/LinkCard";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import Toolbar from "../components/Toolbar";

import AddLink from "../components/AddLink";
import { selectAllCategories } from "../store/categories/selectors";
import { makeStyles } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box/dist/esnext";
import { selectToken } from "../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: "0 15px 0 15px",
  },
}));

const Links = () => {
  const userToken = useSelector(selectToken);
  const history = useHistory();
  if (!userToken) {
    history.push("/login");
  }

  const classes = useStyles();
  const links = useSelector(selectAllLinks);
  const categories = useSelector(selectAllCategories);

  const [category, setCategory] = useState([]);

  const selectCategory = (id) => {
    let selectedCategory = id;
    let newResults = [""];
    if (category.includes(selectedCategory)) {
      newResults = category.filter((cat) => cat !== selectedCategory);
      setCategory(newResults);
    } else setCategory([...category, selectedCategory]);
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <StickyBox offsetTop={90} offsetBottom={20}>
          <Toolbar selectCategory={selectCategory} />
        </StickyBox>
      </Grid>
      <Grid
        item
        container
        lg={6}
        direction="column"
        justify="space-between"
        alignItems="stretch"
        spacing={2}
        className={classes.gridStyle}
      >
        {links
          .filter((s) => {
            if (category.length === 0) {
              return true;
            } else if (category.includes(s.categoryId)) {
              return true;
            } else return false;
          })
          .map((l) => {
            return (
              <Grid item key={l.id}>
                <LinkCard id={l.id} name={l.name} content={l.content} />
              </Grid>
            );
          })}
      </Grid>
      <Grid item xs={12} lg={4}>
        {categories.length !== 0 && (
          <StickyBox offsetTop={90} offsetBottom={20}>
            <AddLink />
          </StickyBox>
        )}
      </Grid>

      <Grid
        item
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
        lg={12}
      >
        {categories.length === 0 && (
          <Typography
            variant="h5"
            style={{ color: "white", width: "66%", margin: "20px auto" }}
          >
            Please use the toolbar to add new categories so you can add your own
            links to them
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Links;
