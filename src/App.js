import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";


// import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Snippets from "./pages/Snippets";



import LoginForm from "./components/LoginForm";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserWithStoredToken());
  // }, [dispatch]);

  return (
    <div className="App">
      <div>
        <h1>HELLO</h1>

        <Navbar />
        <Switch>

          <Route exact path="/developersSnippets" component={Snippets} />

          <Route path="/login" component={LoginForm} />

        </Switch>
      </div>
    </div>
  );
}

export default App;
