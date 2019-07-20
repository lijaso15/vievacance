const position = (state = [], action) => {
  switch (action.type) {
    case "NEW_SLIDE":
      return [...state, 0];
    case "PREV_SLIDE":
      if (state[action.id] <= 0) {
        return state.map((v, i) => {
          return i === action.id ? 0 : v;
        });
      } else {
        return state.map((v, i) => {
          return i === action.id ? v - 1 : v;
        });
      }
    case "NEXT_SLIDE":
      return state.map((v, i) => {
        return i === action.id ? v + 1 : v;
      });
    case "SKIP_TO":
      return state.map((v, i) => {
        return i === action.id ? action.index : v;
      });
    default:
      return state;
  }
};

export default position;
