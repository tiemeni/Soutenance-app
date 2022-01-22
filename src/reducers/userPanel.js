

var result = []
var result_ = []

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
        del(state, action.payload)
        return result_
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

const del = (tab, element) => {
    if(tab.length === 0){
        
    }else{
        for(var i = 0; i < tab.length ; i++){
            console.log(tab[i].productId)
            console.log(element.id)
            console.log(tab[i].taille)
            console.log(element.taille)
            if(tab[i].productId !== element.id && tab[i].taille !== element.taille){
                result_.push(tab[i])
            }else{
                
            }
        }
        
    }
}

export default userPanel