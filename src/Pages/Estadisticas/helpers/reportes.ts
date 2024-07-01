import axios from "axios"
import { SwalError } from "../../../Components/Common/Swals/SwalsApi"

export const getReportes = async (url: string, dateStart: Date, dateEnd: Date) => {

    try {

        const result = await axios.get(`api/${url}`, {
            params: {
                fechadesde: dateStart || null,
                fechahasta: dateEnd || null
            }
        })
        if (result) { return result }

    } catch (e) {
        SwalError({ title: 'Error', text: 'No se encontraron datos', icon: 'error' })
    }

}