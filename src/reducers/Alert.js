const Alert = (state = [{ state: "no-state" }], action) => {
  if (action.type === "SET_TOAST") {
    return [{ state: action.payload.state, content: action.payload.content }];
  } else if (action.type === "OFF_TOAST") {
    return [action.payload];
  } else {
    return state;
  }
};

export default Alert;
