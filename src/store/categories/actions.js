import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
export const LOADING_CATEGORIES = "LOADING_CATEGORIES";
export const CATEGORIES_ERROR = "CATEGORIES_ERROR";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_FETCHED_CATEGORIES = "SET_FETCHED_CATEGORIES";

export const loadingCategories = () => ({ type: LOADING_CATEGORIES });
export const setCategoriesError = (error) => ({
  type: CATEGORIES_ERROR,
  payload: error,
});
export const addNewCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: category,
  };
};
export const setFetchedCategories = (categories) => {
  return {
    type: SET_FETCHED_CATEGORIES,
    payload: categories,
  };
};

// add a category with user token
export const addCategory = (category) => async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;
  try {
    dispatch(loadingCategories());
    const response = await axios.post(
      `${apiUrl}/categories`,
      { category },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(addNewCategory(response.data));
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
      dispatch(setCategoriesError(error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setCategoriesError(error.message));
    }
  }
};

// select all categories with user token
export const getCategories = async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;
  try {
    dispatch(loadingCategories());
    const response = await axios.get(`${apiUrl}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFetchedCategories(response.data));
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
      dispatch(setCategoriesError(error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setCategoriesError(error.message));
    }
  }
};
