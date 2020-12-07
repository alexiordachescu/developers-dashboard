import { combineReducers } from "redux";
import appState from "./appState/reducer";
import categories from "./categories/reducer";

export default combineReducers({
  appState,
  categories,
});
