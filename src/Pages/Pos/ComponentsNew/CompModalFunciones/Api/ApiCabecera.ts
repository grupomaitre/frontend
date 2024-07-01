import axios from "axios"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"

export const listCabeceraOrder = async (id: number) => {
    try {
        const res: any = await axios.get("/api/v1/ordenes/desc", {
            params: {
                id_caja_diaria: id
            }
        })
        if (res?.status === 'success') {
            return res
        }
    } catch (error) {
        toastError({ title: error })
    }
}
export const updateStatusCabecera = async (id: number, estado: string, id_caja: number) => {
    try {
        const res: any = await axios.post("/api/v1/anular/recuperar", {
            id_cart: id,
            estado: estado,
            id_caja: id_caja,

        })
        if (res?.status === 'success') {
            return res
        }
    } catch (error) {
        toastError({ title: error })
    }
}

