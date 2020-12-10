import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import {
  deleteCategoryLinks,
  linksDoneLoading,
  linksLoading,
} from "../links/actions";
import {
  deleteCategorySnippets,
  snippetsDoneLoading,
  snippetsLoading,
} from "../snippets/actions";

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
export const getAllCategoriesSuccess = (categories) => {
  return {
    type: "ALL_CATEGORIES_SUCCESS",
    payload: categories,
  };
};

const categoryDeleteSuccess = (categoryId) => {
  return {
    type: "CATEGORY_DELETE_SUCCESS",
    payload: categoryId,
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
      dispatch(setCategoriesMessage(error.response.data.message));
    } else {
      dispatch(setCategoriesMessage(error.message));
    }
    dispatch(categoriesDoneLoading());
  }
};

// delete a category with id
export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(categoriesLoading()); // can remove all this loading stuff too
    dispatch(linksLoading()); // here and elsewhere
    dispatch(snippetsLoading()); //  because it's not really used
    try {
      const response = await axios.delete(
        `${apiUrl}/categories/${id}`,
        {
          data: { id },
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      dispatch(categoryDeleteSuccess(response.data.categoryId));
      dispatch(deleteCategoryLinks(response.data.linkIds));
      dispatch(deleteCategorySnippets(response.data.snippetIds));
      dispatch(categoriesDoneLoading());
      dispatch(linksDoneLoading());
      dispatch(snippetsDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        dispatch(setCategoriesMessage(error.response.data.message));
      } else {
        dispatch(setCategoriesMessage(error.message));
      }
      dispatch(categoriesDoneLoading());
      dispatch(linksDoneLoading());
      dispatch(snippetsDoneLoading());
    }
  };
};
