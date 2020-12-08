const initialState = { all: [] };

const snippetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_SNIPPETS_SUCCESS":
      return { ...state, all: action.payload };
    case "EDIT_SNIPPET_SUCCESS":
      return {
        ...state,
        all: state.all.map((s) => {
          if (s.id === action.payload.snippet.id) {
            return action.payload.snippet;
          } else {
            return s;
          }
        }),
      };

    case "ADD_SNIPPET_SUCCESS":
      return { ...state, all: [...state.all, action.payload] };

    default:
      return state;
  }
};

export default snippetsReducer;
