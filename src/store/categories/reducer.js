import { LOADING_CATEGORIES, CATEGORIES_ERROR, ADD_CATEGORY } from "./actions";

const initialState = {
  loading: false,
  message: "",
  rows: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_CATEGORIES:
      return { ...state, loading: true };

    case CATEGORIES_ERROR:
      return { ...state, loading: false, message: payload };

    case ADD_CATEGORY:
      return { ...state, loading: false, rows: [...state.rows, payload] };

    default:
      return state;
  }
};
