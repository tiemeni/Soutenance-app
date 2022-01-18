const ActualUser = (state = [], action) => {
    if(action.type === 'ACTUAL_USER'){
        return {...state, actualuser : action.payload}
    }else{
        return state
    }
}


export default ActualUser