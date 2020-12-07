import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import AddCategory from "./components/AddCategory"; /// REMOVE THIS
function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserWithStoredToken());
  // }, [dispatch]);

  return (
    <div className="App">
      <div>
        <h1>HELLO</h1>
        {/* REMOVE THIS ADDCATEGORY */}
        <AddCategory />
        <Switch></Switch>
      </div>
    </div>
  );
}

export default App;
