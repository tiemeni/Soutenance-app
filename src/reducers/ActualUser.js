const ActualUser = (state = {}, action) => {
  if (action.type === "ACTUAL_USER") {
    console.log('acctual user: ', action.payload)
    return { ...state, actualuser: action.payload };
  } else {
    return state;
  }
};

export default ActualUser;
