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
import { NavLink, useHistory } from "react-router-dom";
import { logOut } from "../store/user/actions";
import { selectToken, selectUser } from "../store/user/selectors";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333333",
    marginBottom: "1.5rem",
    overflow: "hidden",
    zIndex: 1 + "!important",
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
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                exact
                to="/"
              >
                <Typography variant="h6">
                  Welcome to Dev's dashboard{user.name && `, ${user.name}`}!
                </Typography>
              </NavLink>
            </Grid>
            {user.name && (
              <>
                <Grid item>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to="/developersSnippets"
                  >
                    <Typography variant="h6">Developers Snippets</Typography>
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to="/developersLinks"
                  >
                    <Typography variant="h6">Developers Links</Typography>
                  </NavLink>
                </Grid>

                <Grid item>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to="/search"
                  >
                    <SearchIcon />
                  </NavLink>
                </Grid>
              </>
            )}
            <Grid item>
              {!token ? (
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  <Typography variant="h6">Login</Typography>
                </NavLink>
              ) : (
                <Button
                  style={{ color: "white" }}
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
