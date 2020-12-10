import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { getAllCategoriesSuccess } from "../categories/actions";
import { getAllLinksSuccess } from "../links/actions";
import { getAllSnippetsSuccess } from "../snippets/actions";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setAppMessage,
} from "../appState/actions";

export const loginSuccess = (response) => ({
  type: "LOGIN_SUCCESS",
  payload: response,
});

const tokenStillValid = (userWithoutToken) => ({
  type: "TOKEN_STILL_VALID",
  payload: userWithoutToken,
});

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await Axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        dispatch(setAppMessage("error", error.response.data.message));
      } else {
        dispatch(setAppMessage("error", error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

// get user after manual login, including their categories, snippets and links
export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await Axios.post(`${apiUrl}/login`, { email, password });
      dispatch(loginSuccess(response.data.user));
      dispatch(getAllCategoriesSuccess(response.data.categories));
      dispatch(getAllLinksSuccess(response.data.links));
      dispatch(getAllSnippetsSuccess(response.data.snippets));
      dispatch(showMessageWithTimeout("success", "welcome back!"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        dispatch(setAppMessage("error", error.response.data.message));
      } else {
        dispatch(setAppMessage("error", error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const logOut = () => ({ type: "LOG_OUT" });

// get user with token, including their categories, snippets and links
export const getUserWithStoredToken = async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;

  dispatch(appLoading());
  try {
    const response = await Axios.get(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(tokenStillValid(response.data.user));
    dispatch(getAllCategoriesSuccess(response.data.categories));
    dispatch(getAllLinksSuccess(response.data.links));
    dispatch(getAllSnippetsSuccess(response.data.snippets));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
    dispatch(logOut());
    dispatch(appDoneLoading());
  }
};
