import axios from "axios"
import { toastError, toastSuccess } from "../../../Components/Common/Swals/SwalsApi"

export const editCart = async (id_cart: number, cart: any): Promise<any> => {
    try {
        const result = await axios.patch(`api/edit-cart/${id_cart}`,
            {
                cart: cart,
                status: 1
            }
        )
        if (result.status) {
            return result

        }
    } catch (error) {
        toastError({ message: error || 'Error al Guardar' });
    }
}
export const saveCart = async (
    cart: any,
    cantidad: number,
    orden: number,
    id_mesa: number,
    pax: number,
    id_caja: number,
    vendedor: any,
    id_user: number,
    total: number
): Promise<any> => {
    try {
        const result = await axios.post("api/add-cart", {
            cart: cart,
            cantidad: cantidad,
            orden: orden,
            id_mesa: id_mesa,
            pax: pax || 1,
            status: 1,
            id_caja_diaria: id_caja,
            vendedor: vendedor,
            id_user: id_user,
            total: total
        })
        return result

    } catch (error) {
        toastError({ message: error || 'Error al Guardar' });
    }
}



export const UpdatePersonCart = async (id_cart: number, vendedor: string, idUser: number): Promise<any> => {
    try {
        const result = await axios.post('api/v1/update-personal-cart', {
            id_cart: id_cart,
            responsable: vendedor,
            id_user: idUser
        })

        if (result) {
            toastSuccess({ message: 'Se guardo' })
            return result.status

        }
    } catch (error) {
        toastError({ message: error || 'Error al Guardar' });
    }
}
export const updateCartProduct = async (id_cart: number, cart: any): Promise<any> => {
    try {
        const result = await axios.post('api/v1/test-new-item-cart-products/',
            {
                item: cart,
                status: 1,
                id_cart: id_cart
            }
        )
        if (result.status) {
            toastSuccess('Se guardo correctamente')
            return result

        }
    } catch (error) {
        toastError({ message: error || 'Error al Guardar' });
    }
}