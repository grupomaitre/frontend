import axios from "axios"
import { GET_ORDENES_LIST } from "../../../../helpers/url_helper"


export const getOrdenes = async () => {
    try {

        const res = await axios.get(GET_ORDENES_LIST)
        if (res.status) {
            return res.data
        }

    } catch (error) {
        return error
    }
}