//import { createSelector } from "@reduxjs/toolkit"
import { createSelector } from 'reselect'

import { IGroups, IProducts } from "../Interfaces/InterfaceGroups"
import { IMesa } from "../Interfaces/InterfaceMesas"
//createSelector cart
const idCartSelector = (state: any) => state.cartSlice.idCart
const cartSelector = (state: any) => state.cartSlice.cart
const idMesaSelector = (state: any) => state.cartSlice.idMesa
const mesacartSelector = (state: any) => state.cartSlice.mesacart
const ordenSelector = (state: any) => state.cartSlice.orden
const paxSelector = (state: any) => state.cartSlice.pax
const mesasSelector = (state: any) => state.mesaSlice.mesa
const id_cajaSelector = (state: any) => state.cajaSlice.caja
const vendedorSelector = (state: any) => state.cartSlice.vendedor
const quantity2Selector = (state: any) => state.cartSlice.quantity2
const isCartSuccessSelector = (state: any) => state.cartSlice.isCartSuccess
const countSelector = (state: any) => state.tecladoSlice.count
const id_userSelector = (state: any) => state.cartSlice.id_user
const isAddCartSuccessSelector = (state: any) => state.cartSlice.isAddCartSuccess
const onCuentaSelector = (state: any) => state.tecladoSlice.onCuenta
const isErrorCartSelector = (state: any) => state.cartSlice.isErrorCart
const selectedProductSelector = (state: any) => state.productSlice.selectedProduct
const onCuentaSelectro = (state: any) => state.tecladoSlice.onCuenta
const onUsername = (state: any) => state.tecladoSlice.username
export const combinedSelector = createSelector(
    idCartSelector,
    cartSelector,
    idMesaSelector,
    mesacartSelector,
    ordenSelector,
    paxSelector,
    mesasSelector,
    id_cajaSelector,
    vendedorSelector,
    quantity2Selector,
    isCartSuccessSelector,
    countSelector,
    id_userSelector,
    isAddCartSuccessSelector,
    onCuentaSelector,
    isErrorCartSelector,
    selectedProductSelector,
    onCuentaSelectro,
    onUsername,

    (
        cart,
        id_mesa,
        mesacart,
        orden,
        pax,
        mesas,
        producto,
        id_caja,
        vendedor,
        quantity2,
        isCartSuccess,
        count,
        id_user,
        isAddCartSuccess,
        onCuenta,
        isErrorCart,
        selectedProduct) => ({
            cart,
            id_mesa,
            mesacart,
            orden,
            pax,
            mesas,
            producto,
            id_caja,
            vendedor,
            quantity2,
            isCartSuccess,
            count,
            id_user,
            isAddCartSuccess,
            onCuenta,
            isErrorCart,
            selectedProduct
        })
)


export const selectCartData = (state:
    {
        cartSlice: {
            cart: Array<IGroups[]>
            idMesa: number
            id_user: number
            mesacart: string
            orden: number
            pax: number
            producto: IProducts[]
            vendedor: string
            quantity2: number
            isCartSuccess: boolean
            isAddCartSuccess: boolean
            isErrorCart: boolean
        }
        mesaSlice: {
            mesa: Array<IMesa>
        }
        cajaSlice: {
            caja: number
        }
        tecladoSlice: {
            count: number,
            onCuenta: boolean
        }
        productSlice: {
            producto: any
            selectedProduct: any
        }


    }) => ({
        cart: state.cartSlice.cart,
        id_mesa: state.cartSlice.idMesa,
        mesacart: state.cartSlice.mesacart,
        orden: state.cartSlice.orden,
        pax: state.cartSlice.pax,
        mesas: state.mesaSlice.mesa,
        id_caja: state.cajaSlice.caja,
        vendedor: state.cartSlice.vendedor,
        quantity2: state.cartSlice.quantity2,
        isCartSuccess: state.cartSlice.isCartSuccess,
        count: state.tecladoSlice.count,
        id_user: state.cartSlice.id_user,
        isAddCartSuccess: state.cartSlice.isAddCartSuccess,
        onCuenta: state.tecladoSlice.onCuenta,
        isErrorCart: state.cartSlice.isErrorCart,
        selectedProduct: state.productSlice.selectedProduct

    })