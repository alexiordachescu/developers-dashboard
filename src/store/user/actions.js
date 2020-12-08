import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { getCategories } from "../categories/actions";
import { selectToken } from "./selectors";

export const loginSuccess = (response) => ({
  type: "LOGIN_SUCCESS",
  payload: response,
});

const tokenStillValid = (userWithoutToken) => ({
  type: "TOKEN_STILL_VALID",
  payload: userWithoutToken,
});

export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.post(`${apiUrl}/login`, { email, password });
      console.log(response.data);
      dispatch(loginSuccess(response.data));
      dispatch(getCategories);
    } catch (e) {
      console.log(e);
    }
  };
};

export const logOut = () => ({ type: "LOG_OUT" });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUserWithStoredToken = async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;

  try {
    const response = await Axios.get(`${apiUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getCategories);

    dispatch(tokenStillValid(response.data));
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
    dispatch(logOut());
  }
};
