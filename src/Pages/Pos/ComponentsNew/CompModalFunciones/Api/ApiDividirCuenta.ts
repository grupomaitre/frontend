import axios from "axios"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"


export const updateDividirCuenta = async (valor: number, id_mesa: number, id_cart: number) => {
    try {
        const res: any = await axios.post("/api/v1/dividir/cuenta", {
            valor: valor,
            id_mesa: id_mesa,
            id_cart: id_cart

        })
        if (res?.status === 'success') {
            return res
        }
    } catch (error) {
        toastError({ title: error })
    }
}

