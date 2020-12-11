import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllSnippets } from "../store/snippets/selectors";
import { selectAllLinks } from "../store/links/selectors";
import LinkCard from "../components/LinkCard";
import CodeSnippetCard from "../components/CodeSnippetCard";
import { Grid, Paper, Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { selectToken } from "../store/user/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20rem",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textColor: { color: "#FFFFFF", marginTop: "1rem" },
  renderMargin: { marginTop: "1rem" },
}));

export default function Search() {
  const classes = useStyles();

  const allSnippets = useSelector(selectAllSnippets);
  const allLinks = useSelector(selectAllLinks);
  const userToken = useSelector(selectToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    links: [],
    snippets: [],
  });

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

  if (!userToken) return null;

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
              style={{ color: "white" }}
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
                  <Grid item key={link.id} className={classes.renderMargin}>
                    <LinkCard
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
                  <Grid item key={snippet.id} className={classes.renderMargin}>
                    <CodeSnippetCard
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
