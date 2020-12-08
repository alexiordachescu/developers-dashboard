import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "../store/links/actions";
import { selectAllLinks } from "../store/links/selector";
import LinkCard from "../components/LinkCard";

import { Grid } from "@material-ui/core";
import Toolbar from "../components/Toolbar";

import AddLink from "../components/AddLink";
import { selectCategories } from "../store/categories/selectors";
import { getCategories } from "../store/categories/actions";

const Links = () => {
  const dispatch = useDispatch();
  const links = useSelector(selectAllLinks);
  const categories = useSelector(selectCategories);

  // console.log("i am Link", links);

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch, links.length]);

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch, categories.length]);

  return (
    <div>
      {" "}
      <Grid container>
        <Grid item xs={2}>
          <Toolbar />
        </Grid>
        <Grid item xs={10}>
          {links.map((l) => {
            return (
              <LinkCard
                key={l.id}
                id={l.id}
                name={l.name}
                content={l.content}
              />
            );
          })}
        </Grid>
      </Grid>
      {categories.length === 0 ? (
        <div>
          <p>Please use toolbar on the left to add new links</p>
        </div>
      ) : (
        <AddLink />
      )}
    </div>
  );
};

export default Links;
