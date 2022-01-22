import React from 'react';
import { useSelector } from 'react-redux'

const AppHeader = () => {

    const produits = useSelector(state => state.product)
    const isHomme = useSelector(state => state.hommeProducts.showHomme)
    const hommeProds = useSelector(state => state.hommeProducts.hommeProds)
    const valFilter = useSelector(state => state.hommeProducts.valForFilter)
    const isFemme = useSelector(state => state.femmeProducts.showFemme)
    const femmeProducts = useSelector(state => state.femmeProducts.femmeProds)

    let filtered = produits ?
        Array.from(produits).filter(prod => {
            if (prod) {
                return prod.nom_produit.toUpperCase()
                    .includes(valFilter ? valFilter.toUpperCase() : " ")
            } else {
                return;
            }
        }) : ""

    let filteredHom = hommeProds ?
        Array.from(hommeProds).filter(prod => {
            if (prod) {
                return prod.nom_produit.toUpperCase()
                    .includes(valFilter ? valFilter.toUpperCase() : " ")
            } else {
                return;
            }
        }) : ""

    let filteredFem = femmeProducts ?
        Array.from(femmeProducts).filter(prod => {
            if (prod) {
                return prod.nom_produit.toUpperCase()
                    .includes(valFilter ? valFilter.toUpperCase() : " ")
            } else {
                return;
            }
        }) : ""

    let filteredHomLength = Array.from(filteredHom).length
    let filteredFemLength = Array.from(filteredFem).length
    let filteredLength = Array.from(filtered).length

    let parenthese = (isHomme && !(filteredLength > 0)) ?
        filteredHomLength : isHomme && (filteredLength > 0) ?
            filteredHomLength : isFemme && !(filteredLength > 0) ?
                filteredFemLength : isFemme && (filteredLength > 0) ?
                    filteredFemLength : !isFemme && (filteredLength > 0) ?
                        filteredLength : !isFemme && !(filteredLength > 0) ?
                            filteredLength : 0

    return (
        <div className="content-header">
            <div className="header-left">
                {isHomme ? "Chaussures pour hommes " : isFemme ? "Chaussures pour femmes" : "Tous les produits"}
                ({parenthese})
            </div>
            <div className="header-right">
            </div>
        </div>
    )
}

export default AppHeader;