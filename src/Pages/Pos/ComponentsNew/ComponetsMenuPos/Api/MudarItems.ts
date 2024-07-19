import axios from "axios"
import { ICart } from "../Interface/InterMudarItem"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"
export const opMudarItems = async (
    cart: Array<ICart>,
    id_mesa: number,
    cantidad: number,
    orden: number | string,
    pax: number | string,
    id_caja: number,
    vendedor: string,
    id_user: number,
    mesacart: string
) => {

    try {
        const result = await axios.post("api/v1/abrir-cuenta/mudar-item", {
            cart: cart,
            id_mesa: id_mesa,
            cantidad: cantidad,
            orden: orden,
            pax: pax || 0,
            id_caja_diaria: id_caja,
            resposable: vendedor,
            id_user: id_user,
            mesacart: mesacart
        })
        return result
    } catch (error) {
        return error
    }


}

export const openCuenta = async (
    orden: number | string,
    pax: number,
    responsable: string,
    id_user: number,
    id_caja_diaria: number,
    id_mesa: number,
    cuenta: string,
    id_cart: number
) => {
    try {

        const result = await axios.post('/api/v1/open/temp-cuenta', {
            status: true,
            id_mesa: id_mesa,
            nombre: cuenta,
            id_cart: id_cart,
            orden: orden,
            responsable: responsable,
            id_user: id_user,
            id_caja_diaria: id_caja_diaria,
            pax: pax,
        })

        if (result.status) {
            return result.data
        }

    } catch (error) {
        return toastError({ message: error })
    }
}
export const deleteTempCuenta = async (id: number, idCart: number) => {
    try {
        const res = await axios.post('/api/v1/delete/temp-cuenta',
            {
                id_cart_2: id,
                id_cart: idCart
            }
        )
        if (res.status) {
            return res
        }
    }
    catch (error) {
        return error
    }
}
export const statusMudarItem = async (
    id_mesa: number,
    cartNew: any,
    cantidad: any,
    orden: any,
    pax: any,
    id_caja: any,
    vendedor: any,
    id_user: any,
    id_cart_2: number,
    total: number
) => {

    const data = {
        status: true,
        id_mesa: id_mesa,
        cartNew: cartNew,
        cantidad: cantidad,
        orden: orden,
        pax: pax,
        id_caja_diaria: id_caja,
        vendedor: vendedor,
        id_user: id_user,
        id_cart_2: id_cart_2,
        total: total
    }

    try {
        const res = await axios.post('/api/v1/update-mesas/status/mudar-item', data)
        if (res.status) { return res }
    } catch (error) { return error }
}
//join acount
export const joinAccount = async (id_cart: number, id_mesa: number, total: number) => {
    try {
        const res: any = await axios.post('/api/v1/unir/cuentas', {
            id_cart: id_cart,
            id_mesa: id_mesa,
            total: total,
        })

        if (res?.status === 'success') {
            return res
        }
    } catch (error) {
        return toastError({ message: error })
    }
}
