import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSnippets } from "../store/snippets/actions";
import { selectAllSnippets } from "../store/snippets/selector";
import CodeSnippetCard from "../components/CodeSnippetCard";
import Grid from "@material-ui/core/Grid";
import Toolbar from "../components/Toolbar";
import { getCategories } from "../store/categories/actions";
import { selectCategories } from "../store/categories/selectors";
import AddSnippet from "../components/AddSnippet";

const Snippets = () => {
  const dispatch = useDispatch();
  const snippets = useSelector(selectAllSnippets);
  const categories = useSelector(selectCategories);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    dispatch(getAllSnippets());
    dispatch(getCategories);
  }, [dispatch]);

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
      <Grid item xs={2}>
        <Toolbar selectCategory={selectCategory} />
      </Grid>
      <Grid item xs={10}>
        {snippets
          .filter((s) => {
            if (category.length === 0) {
              return true;
            } else if (category.includes(s.id)) {
              return true;
            } else return false;
          })
          .map((s) => {
            return (
              <CodeSnippetCard
                key={s.id}
                name={s.name}
                content={s.content}
                comment={s.comment}
                id={s.id}
              />
            );
          })}
      </Grid>
      {categories.length === 0 ? (
        <div>
          <p>Please add a new category before adding a code snippet</p>
        </div>
      ) : (
        <AddSnippet />
      )}
    </Grid>
  );
};

export default Snippets;
