const initialState = { loading: false, message: null, all: [] };

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LINKS_LOADING":
      return { ...state, loading: true };

    case "LINKS_DONE_LOADING":
      return { ...state, loading: false };

    case "SET_LINKS_MESSAGE":
      return { ...state, message: action.payload };

    case "CLEAR_LINKS_MESSAGE":
      return { ...state, message: null };

    case "ALL_LINKS_SUCCESS":
      return { ...state, all: action.payload };

    case "LINK_DELETE_SUCCESS":
      const linkId = action.payload.id;
      const newLinks = state.all.filter((l) => {
        return l.id !== linkId;
      });
      return { ...state, all: newLinks };

    case "DELETE_CATEGORY_LINKS":
      return {
        ...state,
        all: state.all.filter((link) => !action.payload.includes(link.id)),
      };

    case "ADD_LINK_SUCCESS":
      return { ...state, all: [...state.all, action.payload] };

    case "LOG_OUT":
      return initialState;

    default:
      return state;
  }
};

export default linksReducer;
