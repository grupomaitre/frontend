import { useSelector } from 'react-redux'
export const totalCart = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)
    const subServiciototal = cart.reduce((acc: any, el: any) => acc + ((el.cantidad * el.precio - el.descuento) * el.servicio / 100), 0)

    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    //    const tota_servicio = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.servicio)), 0)

    const subTotal = subFinal - totaldescuento
    //    const totalServicio = subTotal * tota_servicio / 100
    const totalIva = subTotal * 15 / 100

    return Math.round((subTotal + subServiciototal + totalIva) * 100) / 100
}
export const totalCartTwo = () => {
    const cart = useSelector((state: any) => state.cuentaSlice.cartNew)
    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)
    const subServiciototal = cart.reduce((acc: any, el: any) => acc + ((el.cantidad * el.precio - el.descuento) * el.servicio / 100), 0)

    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    //    const tota_servicio = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.servicio)), 0)

    const subTotal = subFinal - totaldescuento
    //    const totalServicio = subTotal * tota_servicio / 100
    const totalIva = subTotal * 15 / 100

    return Math.round((subTotal + subServiciototal + totalIva) * 100) / 100
}
export const subFinal = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)

    return subFinal
}

export const totalDescuento = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)

    return totaldescuento
}

export const totalSubtotal = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const subFinal = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio), 0)

    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)

    const subTotal = subFinal - totaldescuento

    return subTotal
}

export const totalServicio = () => {
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const tota_servicio = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.servicio)), 0)

    const totalServicio = totalSubtotal() * tota_servicio / 100

    return totalServicio

}

export const totalIva = () => {

    const totalIva = totalSubtotal() * 15 / 100

    return totalIva

}