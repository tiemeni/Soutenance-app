
export const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    };
}

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
        type: 'ACTUAL_USER',
        payload: user
    }
}

export const ajouterPanier = (user_produit) => {
    return {
        type: "STORE_USER_PANEL",
        payload: user_produit
    }
}

export const increasePanel = () => {
    return {
        type: 'INCREASE_PANEL'
    }
}

export const decreasePanel = () => {
    return {
        type: 'DECREASE_PANEL'
    }
}

export const deletFromPanel = (id, taille) => {
    return {
        type: "DELETE_USER",
        payload: { id, taille }
    }
}

export const setNotFound = (v) => {
    return {
        type: 'SET_NOT_FOUND',
        v
    }
}

export const setIsDeleted = (v) => {
    return {
        type: 'IS_DELETED',
        v
    }
}

export const setPanelForPay = (panel) => {
    return {
        type: "SET_PANEL_FOR_PAY",
        panel
    }
}

export const processAmount = (amount) => {
    return {
        type: 'PROCESS_AMOUNT',
        amount
    }
}