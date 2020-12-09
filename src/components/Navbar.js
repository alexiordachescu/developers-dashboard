import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../store/user/actions";
import { selectToken, selectUser } from "../store/user/selectors";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333333",
    marginBottom: "1.5rem",
    overflow: "hidden",
    zIndex: 500,
    opacity: 1,
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const classes = useStyles();

  const history = useHistory();

  return (
    <nav>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-around" alignItems="center">
            <Grid item>
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                {user.name ? (
                  <Typography variant="h6">
                    Welcome to Dev's dashboard, {user.name}!
                  </Typography>
                ) : (
                  <Typography variant="h6">
                    Welcome to Dev's dashboard!
                  </Typography>
                )}
              </Link>
            </Grid>
            <Grid item>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/developersSnippets"
              >
                <Typography variant="h6">Developers Snippets</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/developersLinks"
              >
                <Typography variant="h6">Developers Links</Typography>
              </Link>
            </Grid>

            <Grid item>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/search"
              >
                <SearchIcon />
              </Link>
            </Grid>
            <Grid item>
              {!token ? (
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  <Typography variant="h6">Login</Typography>
                </Link>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/login");
                    dispatch(logOut());
                  }}
                >
                  Logout
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
