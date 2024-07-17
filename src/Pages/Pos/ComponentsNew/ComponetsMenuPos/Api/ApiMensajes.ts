import axios from "axios"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"
import { useQuery } from "react-query"

export const getMensaje = async () => {
    try {

        const res = await axios.get('/api/v1/list/sitio/impresora/direccion')
        if (res.status) {
            return res.data
        }

    } catch (error) {
        toastError({ title: error })
    }
}

export const useSitioImpresion = () => {
    const query: any = useQuery(['sitios_impresion'], getMensaje, {
        refetchOnWindowFocus: false,

    });
    return query
}