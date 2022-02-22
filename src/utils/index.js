export const calculate = (array_, allProds) => {
    for (var i = 0; i < array_.length; i++) {
        const spec = Array.from(allProds).filter(element => {
            if (element._id === array_[i].productId) {
                return element
            } else {
                return;
            }
        })
        array_[i].amount = spec[0].prix_unitaire
    }
}

export const processTotalPrice = (panel) => {
    //console.log(panel)
    var total = 0
    for (var j = 0; j < panel.length; j++) {
        total = total + panel[j].amount * panel[j].qte
    }
    return total
}