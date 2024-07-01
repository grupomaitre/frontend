import axios from "axios"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"
export const saveAnulacionItem = async (item: any, itemAnulacion: any, newQuantity: number, mesacart: string, vendedor: string): Promise<any> => {

    try {
        const result = await axios.post('api/v1/anulacion', {
            item: item,
            id_cart: item.id_cart,
            id_product: item.id_product,
            cantidad: newQuantity,
            text_anulacion: itemAnulacion,
            mesacart: mesacart,
            vendedor: vendedor
        })
        return result
    } catch (error) {
        toastError({ message: 'Error al anular item' })
    }
}