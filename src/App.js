import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

// import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Snippets from "./pages/Snippets";
function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserWithStoredToken());
  // }, [dispatch]);

  return (
    <div className="App">
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/developersSnippets" component={Snippets} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
