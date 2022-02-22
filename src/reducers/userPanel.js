


var result = []
var result_delete = []

const userPanel = (state = [], action) => {
    if (action.type === 'STORE_USER_PANEL') {
        isIn(state, action.payload.productId, action.payload.taille)
        if (result[0]) {
            state[result[1]].qte += action.payload.qte
            return state
        } else {
            state.push(action.payload)
            return state
        }
    } else if (action.type === "DELETE_USER") {
        del(state, action.payload.id, action.payload.taille)
        return result_delete
    } else {
        return state;
    }
}

const isIn = (tab, element, size) => {
    if (tab.length === 0) {
        result = [false, -1]
    } else {
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].productId === element && tab[i].taille === size) {
                result = [true, i]
                break
            } else {
                result = [false, -1]
            }
        }
    }
}
const del = (tab, id, taille) => {
    result_delete = []
    if (tab.length === 0) {

    } else {
        for (var i = 0; i < tab.length; i++) {
            if (tab[i].productId === id && tab[i].taille === taille) {
                continue
            } else {
                result_delete.push(tab[i])
            }
        }
    }
}

export default userPanel