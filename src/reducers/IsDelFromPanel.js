
const IsDelFromPanel = (state = [], action) => {
    if (action.type === 'IS_DELETED') {
        return action.v
    } else {
        return state
    }
}


export default IsDelFromPanel