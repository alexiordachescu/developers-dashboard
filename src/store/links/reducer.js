const initialState = { all: [] };

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_LINKS_SUCCESS":
      return { ...state, all: action.payload };

    case "ADD_LINK_SUCCESS":
      return { ...state, all: [...state.all, action.payload] };

    default:
      return state;
  }
};

export default linksReducer;
