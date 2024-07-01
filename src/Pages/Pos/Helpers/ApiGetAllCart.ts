import axios from 'axios'
import { SwalError } from '../../../Components/Common/Swals/SwalsApi'

/* interface IGetAllCart {
    id_mesa: number
} */
export const verCarrro = async (id_mesa: number | string, id_cart: number) => {
    try {
        const result: any = await axios.get("api/list-cart-mesa", { params: { id_mesa: id_mesa, status: 1, status_mesa: 1, id_cart: id_cart } })
        if (result?.status === 'success') {
            return result
        }
    } catch (error) {
        SwalError({ icon: 'error', title: 'Oops...', text: error || 'Error al obtener las mesas' })
    }
}