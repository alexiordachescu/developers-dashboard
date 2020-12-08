import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

const getAllLinksSuccess = (links) => {
  return {
    type: "ALL_LINKS_SUCCESS",
    payload: links,
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

    try {
      const response = await axios.get(`${apiUrl}/links`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      //   console.log("i am response.data", response.data);
      // token is still valid
      dispatch(getAllLinksSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// add a link as a user,
// form is an object that includes: category, name, content
export const addLink = (form) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const categoryId = getState().categories.rows.find(
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
    } catch (error) {
      console.log(error.message);
    }
  };
};
