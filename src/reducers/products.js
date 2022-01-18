const productReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_PRODUCT':
            return state = action.payload;
        default:
            return state;
    }
}

export default productReducer;



//case 'SHOW_FOR_HOMME':
  //  return state = true
//case 'STORE_HOMME_PRODUCT':
  //  return state = action.payload;