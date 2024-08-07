import axios from "axios"
import { toastError } from "../../../../Components/Common/Swals/SwalsApi"
import { useQuery } from "react-query"

export const countCabecera = async (estado: string) => {
    try {

        const res = await axios.get('/api/report/cartera', {
            params: {
                estado: estado,
            }
        })
        if (res.status) {
            return res
        }

    } catch (error) {
        toastError({ title: error })
    }
}

export const useCountCabecera = (estado: string) => {
    const query = useQuery(['countCabecera'], () => countCabecera(estado), {
        refetchOnWindowFocus: false,

    });
    return query
}