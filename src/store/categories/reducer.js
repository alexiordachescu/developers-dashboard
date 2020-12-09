const initialState = { loading: false, message: null, all: [] };

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORIES_LOADING":
      return { ...state, loading: true };

    case "CATEGORIES_DONE_LOADING":
      return { ...state, loading: false };

    case "SET_CATEGORIES_MESSAGE":
      return { ...state, message: action.payload };

    case "CLEAR_CATEGORIES_MESSAGE":
      return { ...state, message: null };

    case "ADD_CATEGORY":
      return { ...state, all: [...state.all, action.payload] };

    case "ALL_CATEGORIES_SUCCESS":
      return { ...state, all: action.payload };

    default:
      return state;
  }
};

export default categoriesReducer;
