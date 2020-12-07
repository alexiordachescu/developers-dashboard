import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
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
        <LoginForm />
        <Navbar />
        <Switch></Switch>
      </div>
    </div>
  );
}

export default App;
