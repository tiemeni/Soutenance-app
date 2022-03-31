const Favorite = (state = [], action) => {
  if (action.type === "STORE_USER_FAVORITE") {
    if (state.length < 1) {
      return [...state, action.payload];
    } else {
      const newState = state.filter(
        (prod) => prod.productId === action.payload.productId
      );
      if (newState.length > 0) {
        return [...state];
      } else {
        return [...state, action.payload];
      }
    }
  } else if (action.type === "REMOVE_USER_FAVORITE") {
    const newTab = state.filter((prod) => prod.productId !== action.payload);
    return newTab;
  } else {
    return state;
  }
};

export default Favorite;
