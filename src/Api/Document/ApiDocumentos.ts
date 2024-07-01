import axios from "axios"
import { toastError } from "../../Components/Common/Swals/SwalsApi"

export const getDocumentosType = async () => {

    try {
        const url = '/api/v1/list/documentos/tipos'

        const response: any = await axios.get(url)
        if (response.status === "success") {
            return response.data
        }

    } catch (e) {
        toastError({ message: 'Error al generar el comprobante' })
    }
}