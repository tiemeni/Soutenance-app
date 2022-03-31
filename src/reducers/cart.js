const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "STORE_CART":
      state = [];
      return (state = action.payload);
    default:
      return state;
  }
};

export default cartReducer;
