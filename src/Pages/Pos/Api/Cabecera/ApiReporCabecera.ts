import axios from "axios"
import { toastError } from "../../../../Components/Common/Swals/SwalsApi"

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
