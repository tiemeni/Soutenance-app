


const hommeProducts = (state = [], action) => {
    if (action.type === "SHOW_FOR_HOMME") {
        return { ...state, showHomme: action.payload }
    } else if (action.type === "STORE_HOMME_PRODUCT") {
        return { ...state, hommeProds: action.payload }
    } else if (action.type === "SET_FILTER_VALUE") {
        return { ...state, valForFilter: action.payload }
    } else {
        return state
    }
}

export default hommeProducts