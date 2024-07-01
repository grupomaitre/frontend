import axios from "axios"
import { SwalError } from "../../../Components/Common/Swals/SwalsApi"

export const getCajasDiarias = async (): Promise<any> => {
    try {
        const response = await axios.get('/api/list-active-cajas')
        if (response.status) {
            return response || {}
        }
    } catch (error) {
        SwalError({ icon: 'error', title: 'Oops...', text: error || 'Error al cerrar cuenta' })
        return error
    }
}
