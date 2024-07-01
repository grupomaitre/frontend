import axios from "axios"
import { toastError } from "../../../Components/Common/Swals/SwalsApi"

export const newPreferenciaCart = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-preferencias')
        if (response.status) {
            return response.data
        }
    } catch (error) {
        toastError({ message: 'Error al obtener refencias' })
    }
}