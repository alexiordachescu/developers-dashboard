import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "../store/links/actions";
import { selectAllLinks } from "../store/links/selectors";
import LinkCard from "../components/LinkCard";

import { Grid, Paper } from "@material-ui/core";
import Toolbar from "../components/Toolbar";

import AddLink from "../components/AddLink";
import { selectCategories } from "../store/categories/selectors";
import { makeStyles } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box/dist/esnext";

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    padding: "0 15px 0 15px",
  },
}));

const Links = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const links = useSelector(selectAllLinks);
  const categories = useSelector(selectCategories);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  const selectCategory = (id) => {
    let selectedCategory = id;
    let newResults = [""];
    if (category.includes(selectedCategory)) {
      newResults = category.filter((cat) => cat !== selectedCategory);
      setCategory(newResults);
    } else setCategory([...category, selectedCategory]);
  };
  console.log(category);

  return (
    <Grid container>
      <Grid item xs={2}>
        <StickyBox offsetTop={90} offsetBottom={20}>
          <Toolbar selectCategory={selectCategory} />
        </StickyBox>
      </Grid>
      <Grid
        item
        container
        xs={7}
        direction="row"
        justify="center"
        alignItems="center"
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

      <Grid item xs={3}>
        {categories.length === 0 ? (
          <div>
            <p>Please use toolbar on the left to add new links</p>
          </div>
        ) : (
          <StickyBox offsetTop={90} offsetBottom={20}>
            <AddLink />
          </StickyBox>
        )}
      </Grid>
    </Grid>
  );
};

export default Links;
