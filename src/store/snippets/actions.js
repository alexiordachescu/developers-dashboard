import { apiUrl } from "../../config/constants";
import axios from "axios";

const getAllSnippetsSuccess = (snippets) => {
  return {
    type: "ALL_SNIPPETS_SUCCESS",
    payload: snippets,
  };
};

export const getAllSnippets = () => {
  return async (dispatch, getState) => {
    // const userId = selectUser(getState());
    const token = selectToken(getState());
    if (token === null) return;

    try {
      const response = await axios.get(`${apiUrl}/snippets`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      console.log("i am response.data", response.data);
      // token is still valid
      //   dispatch(getAllSnippetsSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
