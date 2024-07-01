import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const TotalWidgets = () => {
    const [totalCart, settotalCart] = useState(0)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)
    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    const subTotal = subFinal - totaldescuento
    const totalServicio = subTotal * 10 / 100
    const totalIva = subTotal * 15 / 100


    useEffect(() => {
        settotalCart(subTotal + totalServicio + totalIva)
    }, [cart])

    return totalCart
}


export const SubFinal = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)

    return subFinal


}
export default { TotalWidgets, SubFinal }