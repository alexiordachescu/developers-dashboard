import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "../store/links/actions";
import { selectAllLinks } from "../store/links/selector";
import LinkCard from "../components/LinkCard";
import { Grid } from "@material-ui/core";
import Toolbar from "../components/Toolbar";

const Links = () => {
  const dispatch = useDispatch();
  const links = useSelector(selectAllLinks);

  console.log("i am Link", links);

  useEffect(() => {
    dispatch(getAllLinks());
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
    </div>
  );
};

export default Links;
