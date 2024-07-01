import axios from "axios"
import { SwalError } from "../../../Components/Common/Swals/SwalsApi"
const userData = JSON.parse(sessionStorage.getItem('authUser') || '{}')
export const addCuenta = async (item: any, orden: string, pax: number, id_mesa: number) => {
    console.log(item)
    try {
        const res = await axios.post('/api/v1/cuenta', {
            status: 1,
            cantidad: 1,
            orden: orden,
            pax: pax,
            responsable: userData.user_name,
            id_mesa: id_mesa,
            item: item
        })
        console.log(res)
    } catch (error) {
        SwalError({ title: 'Error', text: error })
    }
}