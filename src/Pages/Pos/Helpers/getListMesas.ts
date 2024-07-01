import axios from 'axios'
import { SwalError } from '../../../Components/Common/Swals/SwalsApi';
export const getListMesas = async (id_mesa: number) => {
    try {
        const result = await axios.get("api/list-cart-mesa", { params: { id_mesa: id_mesa, status: 1, status_mesa: 1 } })
        return result.data
    } catch (error) {
        return SwalError({ title: 'Error', text: error || 'error' })
    }
}