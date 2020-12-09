import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { getCategories } from "../categories/actions";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
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
        console.log(error.response.data.message);
        dispatch(setMessage("error", error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("error", error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await Axios.post(`${apiUrl}/login`, { email, password });
      console.log(response.data);
      dispatch(loginSuccess(response.data));
      dispatch(getCategories);
      dispatch(showMessageWithTimeout("success", "welcome back!"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        dispatch(setMessage("error", error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("error", error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const logOut = () => ({ type: "LOG_OUT" });

export const getUserWithStoredToken = async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;

  dispatch(appLoading());
  try {
    const response = await Axios.get(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(tokenStillValid(response.data));
    dispatch(getCategories);
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
