// Products
// Cart
export const storeCart = (cart) => {
    return {
        type: 'STORE_CART',
        payload: cart,
    };
};

export const getCart = () => {
    return {
        type: 'GET_ALL_ITEM'
    };
};