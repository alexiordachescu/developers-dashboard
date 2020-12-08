import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

// import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Snippets from "./pages/Snippets";

import LoginForm from "./components/LoginForm";
import Links from "./pages/Links";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserWithStoredToken());
  // }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/developersLinks" component={Links} />
        <Route exact path="/developersSnippets" component={Snippets} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </div>
  );
}

export default App;
