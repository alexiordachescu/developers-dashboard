import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

const getAllLinksSuccess = (links) => {
  return {
    type: "ALL_LINKS_SUCCESS",
    payload: links,
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

export const onLinkDelete = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
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
    } catch (e) {
      console.log(e);
    }
  };
};

const linkDeleteSuccess = (link) => {
  return {
    type: "LINK_DELETE_SUCCESS",
    payload: link,
  };
};
