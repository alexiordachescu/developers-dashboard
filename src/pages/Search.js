import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllSnippets } from "../store/snippets/selectors";
import { selectAllLinks } from "../store/links/selectors";
import { getAllSnippets } from "../store/snippets/actions";
import { getAllLinks } from "../store/links/actions";
import LinkCard from "../components/LinkCard";
import CodeSnippetCard from "../components/CodeSnippetCard";
import { Grid, Paper, Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20rem",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textColor: { color: "#FFFFFF" },
  renderMargin: { marginTop: "1rem" },
}));

export default function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allSnippets = useSelector(selectAllSnippets);
  const allLinks = useSelector(selectAllLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    links: [],
    snippets: [],
  });

  useEffect(() => {
    if (allLinks.length === 0) {
      dispatch(getAllLinks());
    }
  }, [dispatch, allLinks.length]);

  useEffect(() => {
    const linkResults = allLinks.filter(
      (link) =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const snippetResults = allSnippets.filter(
      (snippet) =>
        snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults({ links: linkResults, snippets: snippetResults });
  }, [searchTerm, allLinks, allSnippets]);

  return (
    <Grid container>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" className={classes.textColor}>
            Search for some keywords in your archive
          </Typography>
        </Grid>{" "}
        <Grid item>
          <Paper elevation={2} className={classes.root}>
            <InputBase
              className={classes.input}
              value={searchTerm}
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </Paper>
        </Grid>{" "}
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        style={{ marginTop: "1.5rem" }}
      >
        <Grid item>
          {searchResults.links.length !== 0 && searchTerm && (
            <div>
              <Typography variant="h4" className={classes.textColor}>
                Link search results
              </Typography>
              <div>
                {searchResults.links.map((link) => (
                  <Grid item className={classes.renderMargin}>
                    <LinkCard
                      key={link.id}
                      id={link.id}
                      name={link.name}
                      content={link.content}
                    />
                  </Grid>
                ))}
              </div>
            </div>
          )}
        </Grid>
        <Grid item>
          {searchResults.snippets.length !== 0 && searchTerm && (
            <div>
              <Typography variant="h4" className={classes.textColor}>
                Snippet search results
              </Typography>
              <div>
                {searchResults.snippets.map((snippet) => (
                  <Grid item className={classes.renderMargin}>
                    <CodeSnippetCard
                      key={snippet.id}
                      name={snippet.name}
                      content={snippet.content}
                      comment={snippet.comment}
                      id={snippet.id}
                    />
                  </Grid>
                ))}
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
