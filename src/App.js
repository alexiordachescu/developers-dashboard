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
import MessageBox from "./components/MessageBox";
import Search from "./pages/Search";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken);
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <MessageBox />
      <Switch>
        <Route path="/search" component={Search} />
        <Route exact path="/developersLinks" component={Links} />
        <Route exact path="/developersSnippets" component={Snippets} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
