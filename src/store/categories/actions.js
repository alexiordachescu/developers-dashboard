import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

export const categoriesLoading = () => ({ type: "CATEGORIES_LOADING" });
export const categoriesDoneLoading = () => ({
  type: "CATEGORIES_DONE_LOADING",
});
export const setCategoriesMessage = (text) => ({
  type: "SET_CATEGORIES_MESSAGE",
  payload: { type: "error", text },
});
export const clearCategoriesMessage = () => ({
  type: "CLEAR_CATEGORIES_MESSAGE",
});

export const addNewCategory = (category) => {
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
};
export const setFetchedCategories = (categories) => {
  return {
    type: "SET_FETCHED_CATEGORIES",
    payload: categories,
  };
};

// add a category with user token
export const addCategory = (category) => async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;
  try {
    dispatch(categoriesLoading());
    const response = await axios.post(
      `${apiUrl}/categories`,
      { category },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(addNewCategory(response.data));
    dispatch(categoriesDoneLoading());
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
      dispatch(setCategoriesMessage(error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setCategoriesMessage(error.message));
    }
    dispatch(categoriesDoneLoading());
  }
};

// select all categories with user token
export const getCategories = async (dispatch, getState) => {
  const token = selectToken(getState());
  if (token === null) return;
  try {
    dispatch(categoriesLoading());
    const response = await axios.get(`${apiUrl}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFetchedCategories(response.data));
    dispatch(categoriesDoneLoading());
  } catch (error) {
    if (error.response?.data?.message) {
      console.log(error.response.data.message);
      dispatch(setCategoriesMessage(error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setCategoriesMessage(error.message));
    }
    dispatch(categoriesDoneLoading());
  }
};
