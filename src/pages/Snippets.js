import React, { useEffect } from "react";
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

  // console.log("i am snippets", snippets);

  useEffect(() => {
    dispatch(getAllSnippets());
  }, [dispatch, snippets.length]);

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch, categories.length]);

  return (
    <Grid container>
      <Grid item xs={2}>
        <Toolbar />
      </Grid>
      <Grid item xs={10}>
        {snippets.map((s) => {
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
