import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import categories from "./categories/reducer";
export default combineReducers({
  appState,
  user,
  categories,
});
