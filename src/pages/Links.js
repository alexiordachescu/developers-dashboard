import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "../store/links/actions";
import { selectAllLinks } from "../store/links/selector";
import LinkCard from "../components/LinkCard";

import { Grid } from "@material-ui/core";
import Toolbar from "../components/Toolbar";

import AddLink from "../components/AddLink";
import AddCategory from "../components/AddCategory";
import { selectCategories } from "../store/categories/selectors";
import { getCategories } from "../store/categories/actions";


const Links = () => {
  const dispatch = useDispatch();
  const links = useSelector(selectAllLinks);
  const categories = useSelector(selectCategories);

  // console.log("i am Link", links);

  useEffect(() => {
    dispatch(getAllLinks());
    dispatch(getCategories);
  }, [dispatch]);

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

      {links.map((l) => {
        return <LinkCard key={l.id} name={l.name} content={l.content} />;
      })}
      {categories.length === 0 ? (
        <div style={{ backgroundColor: "yellow" }}>
          <AddCategory />
          <p>
            Or should this be something like "please add a category in the
            toolbar on the left to be able to add links to it?"
          </p>
        </div>
      ) : (
        <AddLink />
      )}

    </div>
  );
};

export default Links;
