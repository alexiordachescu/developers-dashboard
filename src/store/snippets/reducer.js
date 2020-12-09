const initialState = { loading: false, message: null, all: [] };

const snippetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SNIPPETS_LOADING":
      return { ...state, loading: true };

    case "SNIPPETS_DONE_LOADING":
      return { ...state, loading: false };

    case "SET_SNIPPETS_MESSAGE":
      return { ...state, message: action.payload };

    case "CLEAR_SNIPPETS_MESSAGE":
      return { ...state, message: null };

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
    case "EDIT_SNIPPET_COMMENT_SUCCESS":
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

    case "SNIPPET_DELETE_SUCCESS":
      // console.log("payload", action.payload);
      // console.log("i am state before,", state.details);
      const snippetId = action.payload;
      const newSnippets = state.all.filter((s) => {
        return s.id !== snippetId;
      });

      return {
        ...state,
        all: newSnippets,
      };
    default:
      return state;
  }
};

export default snippetsReducer;
