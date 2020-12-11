import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Snippets from "./pages/Snippets";

import Links from "./pages/Links";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getUserWithStoredToken } from "./store/user/actions";

import StickyBox from "react-sticky-box/dist/esnext";

import MessageBox from "./components/MessageBox";
import Search from "./pages/Search";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken);
  }, [dispatch]);

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Chilanka"].join(","),
    },
    palette: {
      primary: {
        main: "#58A6FF",
      },
      secondary: {
        main: "#b80000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 99 }}>
          <Navbar />
        </StickyBox>

        <MessageBox />

        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/developersLinks" component={Links} />
          <Route path="/developersSnippets" component={Snippets} />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={Signup} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>{" "}
    </ThemeProvider>
  );
}

export default App;
