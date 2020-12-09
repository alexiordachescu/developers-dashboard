import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllSnippets } from "../store/snippets/selectors";
import CodeSnippetCard from "../components/CodeSnippetCard";
import Grid from "@material-ui/core/Grid";
import Toolbar from "../components/Toolbar";
import { selectAllCategories } from "../store/categories/selectors";
import AddSnippet from "../components/AddSnippet";
import { makeStyles } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box/dist/esnext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 600,
    },
  },
  media: {
    height: 140,
  },
  gridStyle: {
    padding: "0 15px 0 15px",
  },
}));

const Snippets = () => {
  const classes = useStyles();
  const snippets = useSelector(selectAllSnippets);
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
      <Grid item xs={12} md={2} lg={2}>
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
        {snippets
          .filter((s) => {
            if (category.length === 0) {
              return true;
            } else if (category.includes(s.categoryId)) {
              return true;
            } else return false;
          })
          .map((s) => {
            return (
              <Grid key={s.id} item xs={12}>
                <CodeSnippetCard
                  name={s.name}
                  content={s.content}
                  comment={s.comment}
                  id={s.id}
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        {categories.length === 0 ? (
          <div>
            <p>Please add a new category before adding a code snippet</p>
          </div>
        ) : (
          <StickyBox offsetTop={90} offsetBottom={20}>
            <AddSnippet />
          </StickyBox>
        )}
      </Grid>
    </Grid>
  );
};

export default Snippets;
