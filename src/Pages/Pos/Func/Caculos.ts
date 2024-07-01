export const totalCartFunc = (cart: any) => {

    const subFinal = cart.reduce((acc: number, el: any) => acc + ((el.cantidad * el.precio)), 0)
    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    const subServiciototal = cart.reduce((acc: any, el: any) => acc + ((el.cantidad * el.precio - el.descuento) * el.servicio / 100), 0)
    const subTotal = (subFinal - totaldescuento) || 0
    const totalIva = subTotal * 15 / 100

    return subTotal + subServiciototal + totalIva

}