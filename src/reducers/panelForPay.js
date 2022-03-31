const amount = [];

const panelForPay = (state = [], action) => {
  if (action.type === "SET_PANEL_FOR_PAY") {
    return { ...state, forPay: action.panel };
  } else if (action.type === "PROCESS_AMOUNT") {
    amount.push(action.amount);
    return {
      ...state,
      amount:
        amount.length > 1
          ? amount.reduce((x, y) => x + y)
          : amount[0]
          ? amount[0]
          : 0,
    };
  } else {
    return state;
  }
};

export default panelForPay;
