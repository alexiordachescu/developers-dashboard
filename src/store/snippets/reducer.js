const initialState = { all: [] };

export default (state = initialState, action) => {
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
