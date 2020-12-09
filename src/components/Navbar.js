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
          <Grid container>
            <Grid item xs={4}>
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                <Typography variant="h6">
                  Welcome to Dev's dashboard!
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/developersSnippets"
              >
                <Typography variant="h6">Developers Snippets</Typography>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/developersLinks"
              >
                <Typography variant="h6">Developers Links</Typography>
              </Link>
            </Grid>
          </Grid>

          {!token ? (
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/login"
            >
              <Typography variant="h6">Login</Typography>
            </Link>
          ) : (
            <>
              <span>Hello, {user.name}</span>
              <Button
                color="inherit"
                onClick={() => {
                  history.push("/login");
                  dispatch(logOut());
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
