import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

export const linksLoading = () => ({ type: "LINKS_LOADING" });
export const linksDoneLoading = () => ({ type: "LINKS_DONE_LOADING" });
export const setLinksMessage = (text) => ({
  type: "SET_LINKS_MESSAGE",
  payload: { type: "error", text },
});
export const clearLinksMessage = () => ({ type: "CLEAR_LINKS_MESSAGE" });

const getAllLinksSuccess = (links) => {
  return {
    type: "ALL_LINKS_SUCCESS",
    payload: links,
  };
};

const linkDeleteSuccess = (link) => {
  return {
    type: "LINK_DELETE_SUCCESS",
    payload: link,
  };
};

const addLinkSuccess = (link) => {
  return {
    type: "ADD_LINK_SUCCESS",
    payload: link,
  };
};

export const getAllLinks = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(linksLoading());
    try {
      const response = await axios.get(`${apiUrl}/links`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      //   console.log("i am response.data", response.data);
      // token is still valid
      dispatch(getAllLinksSuccess(response.data));
      dispatch(linksDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        dispatch(setLinksMessage(error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setLinksMessage(error.message));
      }
      dispatch(linksDoneLoading());
    }
  };
};

export const onLinkDelete = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(linksLoading());
    try {
      const response = await axios.delete(
        `${apiUrl}/links/deleteLink`,
        {
          data: { id },
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      console.log(response.data);
      dispatch(linkDeleteSuccess(response.data));
      dispatch(linksDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        dispatch(setLinksMessage(error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setLinksMessage(error.message));
      }
      dispatch(linksDoneLoading());
    }
  };
};

// add a link as a user,
// form is an object that includes: category, name, content
export const addLink = (form) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(linksLoading());
    try {
      const categoryId = getState().categories.all.find(
        (category) => category.name === form.category
      ).id;
      if (!categoryId) return;
      const response = await axios.post(
        `${apiUrl}/links`,
        {
          categoryId,
          name: form.name,
          content: form.content,
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      dispatch(addLinkSuccess(response.data));
      dispatch(linksDoneLoading());
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        dispatch(setLinksMessage(error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setLinksMessage(error.message));
      }
      dispatch(linksDoneLoading());
    }
  };
};
