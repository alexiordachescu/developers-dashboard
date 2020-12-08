const initialState = { all: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "ALL_LINKS_SUCCESS":
      return { ...state, all: action.payload };
    case "LINK_DELETE_SUCCESS":
      const linkId = action.payload.id;
      const newLinks = state.all.filter((l) => {
        return l.id !== linkId;
      });
      return { ...state, all: newLinks };

    default:
      return state;
  }
};
