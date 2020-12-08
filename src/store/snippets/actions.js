import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

const getAllSnippetsSuccess = (snippets) => {
  return {
    type: "ALL_SNIPPETS_SUCCESS",
    payload: snippets,
  };
};
const editSnippetSuccess = (snippet) => {
  return {
    type: "EDIT_SNIPPET_SUCCESS",
    payload: snippet,
  };
};
const editSnippetCommentSuccess = (comment) => {
  return {
    type: "EDIT_SNIPPET_COMMENT_SUCCESS",
    payload: comment,
  };
};

const addSnippetSuccess = (snippet) => {
  return {
    type: "ADD_SNIPPET_SUCCESS",
    payload: snippet,
  };
};

const snippetDeleteSuccess = (snippetId) => {
  return {
    type: "SNIPPET_DELETE_SUCCESS",
    payload: snippetId,
  };
};

export const getAllSnippets = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    try {
      const response = await axios.get(`${apiUrl}/snippets`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      //   console.log("i am response.data", response.data);
      // token is still valid
      dispatch(getAllSnippetsSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const editCodeSnippet = (content, id) => {
  console.log("i am content and id", content, id);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    try {
      console.log("i got here");
      const response = await axios.patch(
        `${apiUrl}/snippets`,

        { content, id },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      console.log("i am response.data", response.data);
      // token is still valid
      dispatch(editSnippetSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const editCommentSnippet = (comment, id) => {
  // console.log("i am content and id", comment, id);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    try {
      // console.log("i got here");

      const response = await axios.patch(
        `${apiUrl}/snippets/comments`,

        { comment, id },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      console.log("i am response.data", response.data);
      // token is still valid
      dispatch(editSnippetCommentSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// add a snippet as a user,
// form is an object that includes: category, name, content, comment
export const addSnippet = (form) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const categoryId = getState().categories.rows.find(
        (category) => category.name === form.category
      ).id;
      if (!categoryId) return;
      const response = await axios.post(
        `${apiUrl}/snippets`,
        {
          categoryId,
          name: form.name,
          content: form.content,
          comment: form.comment,
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      dispatch(addSnippetSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteSnippet = (id) => {
  console.log("i am id from single snippet", id);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const response = await axios.delete(
        `${apiUrl}/snippets`,
        {
          data: { id },
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );

      console.log("snippet deleted?", response.data);
      dispatch(snippetDeleteSuccess(id));
    } catch (e) {
      console.log(e);
    }
  };
};
