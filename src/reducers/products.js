const productReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_PRODUCT':
            return state = action.payload;
        default:
            return state;
    }
}

export default productReducer;