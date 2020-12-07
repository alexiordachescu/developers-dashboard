import { combineReducers } from "redux";
import appState from "./appState/reducer";
import snippets from "./snippets/reducer";

export default combineReducers({
  appState,
  snippets,
});
