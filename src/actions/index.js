// Users
export const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    };
}
// Products
// Cart
export const storeCart = (cart) => {
    return {
        type: 'STORE_CART',
        payload: cart,
    };
}

export const addProduct = (cart) => {
    return {
        type: 'ADD_PRODUCT',
        payload: cart,
    }
}