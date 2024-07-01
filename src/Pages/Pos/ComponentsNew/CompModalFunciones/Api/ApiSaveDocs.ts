import axios from "axios"
import { toastError } from "../../../../../Components/Common/Swals/SwalsApi"

export const saveOrderFormPay = async (id: number, data: any) => {
    try {
        const res: any = await axios.patch(`/api/v1/edit/orden/forma/pago/${id}`, data)
        if (res?.status === 'success') {
            return res
        }
    } catch (error) {
        toastError({ title: error })
    }
}