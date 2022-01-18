// Users
export const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    };
}
// Products
export const storeProduct = (products) => {
    return {
        type: 'STORE_PRODUCT',
        payload: products
    };
}

export const storeHommeProducts = (hommeData) => {
    return {
        type: 'STORE_HOMME_PRODUCT',
        payload: hommeData
    }
}

export const storeFemmeProducts = (femmeData) => {
    return {
        type: "STORE_FEMME_PRODUCTS",
        payload: femmeData
    }
}
export const showForHomme = (val) => {
    return {
        type: "SHOW_FOR_HOMME",
        payload: val
    }
}

export const showForFemme = (val) => {
    return {
        type: 'SHOW_FOR_FEMME',
        payload: val
    }
}

export const setFilter = (value) => {
    return {
        type: "SET_FILTER_VALUE",
        payload: value
    }
}
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

export const setActualUser = (user) => {
    return {
        type : 'ACTUAL_USER',
        payload : user
    }
}