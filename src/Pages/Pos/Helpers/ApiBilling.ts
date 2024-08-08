
import axios from "axios"
import { toastError } from "../../../Components/Common/Swals/SwalsApi"

export const CloseBilling = async (

    id_mesa: number,
    idCart: number,
    id_order: number,
    formaPago: string,
    total_efectivo: number,
    id_cheque: number,
    id_tarjeta: number,
    id_deposito: number,
    id_documento: number

): Promise<any> => {
    try {
        const response = await axios.post('api/v1/cerrar-cuenta', {
            id_cart: idCart,
            id_mesa: id_mesa,
            id_order: id_order,
            formaPago: formaPago,
            total_efectivo: total_efectivo || 0,
            id_cheque: id_cheque || null,
            id_tarjeta: id_tarjeta || null,
            id_deposito: id_deposito || null,
            id_documento: id_documento

        })

        return response
    } catch (error) {
        return toastError({ message: error || 'Error al cerrar cuenta' })
    }
}
export const saveOrder = async (
    id_user: number,
    orden: number,
    subFinal1: number,
    totaldescuento1: number,
    subTotal: number,
    servicio: number,
    iva: number,
    total: number,
    id_cart: number,
    id_cliente: number,
    id_caja: number,
    documento: string,
    id_documento: number
): Promise<any> => {
    try {
        const response = await axios.post('api/add-orders', {
            status: 1,
            user_id: id_user,
            num_order: orden,
            sub_total: subTotal,
            sub_final: subFinal1,
            total_descuento: totaldescuento1,
            s_iva: iva,
            servicio: servicio,
            total: total,
            documento: documento,
            id_cart: id_cart,
            id_cliente: id_cliente,
            id_caja: id_caja,
            estado: 'P',
            id_documento: id_documento

        })
        if (response.status) {
            return response.data
        }
    } catch (error) {
        return toastError({ message: error || 'Error al guardar cuenta' })
    }
}