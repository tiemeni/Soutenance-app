
const femmeProducts = (state = [], action) => {
    if(action.type === 'SHOW_FOR_FEMME'){
        return {...state, showFemme : action.payload}
    }else if(action.type === "STORE_FEMME_PRODUCTS"){
        return {...state, femmeProds: action.payload}
    }else{
        return state
    }
}


export default femmeProducts