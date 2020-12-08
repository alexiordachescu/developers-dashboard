import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSnippets } from "../store/snippets/actions";
import { selectAllSnippets } from "../store/snippets/selector";
import CodeSnippetCard from "../components/CodeSnippetCard";
import Grid from "@material-ui/core/Grid";
import Toolbar from "../components/Toolbar";

const Snippets = () => {
  const dispatch = useDispatch();
  const snippets = useSelector(selectAllSnippets);

  console.log("i am snippets", snippets);

  useEffect(() => {
    dispatch(getAllSnippets());
  }, [dispatch]);

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
            />
          );
        })}
      </Grid>
    </Grid>

    <div>
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
    </div>

  );
};

export default Snippets;
