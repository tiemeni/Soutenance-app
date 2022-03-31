const panier = (state = 0, action) => {
  if (action.type === "INCREASE_PANEL") {
    state++;
    return state;
  } else if (action.type === "DECREASE_PANEL") {
    if (state === 0) {
      state = 0;
      return state;
    } else {
      state--;
      return state;
    }
  } else {
    return state;
  }
};

export default panier;
