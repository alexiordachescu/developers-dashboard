const initialState = { all: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "ALL_SNIPPETS_SUCCESS":
      return { ...state, all: action.payload };

    case "ADD_SNIPPET_SUCCESS":
      return { ...state, all: [...state.all, action.payload] };

    default:
      return state;
  }
};
