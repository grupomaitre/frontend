import axios from "axios"
import { api } from "../../../config"
const apiexpress = api.API_URL_SOCKET

export const getListPrinters = async () => {
    try {
        const result = await fetch(apiexpress + '/api/v1/impresoras/list')
        const data = await result.json()
        console.log(data)
        if (result.status) {
            return data
        }
    } catch (e) {
        return e
    }

}
export const savePrinters = async (data: any) => {

    try {
        const result = await axios.post('/api/v1/add-printers', data)
        if (result.status) {
            return result
        }
    } catch (error) {
        return error

    }
}
export const saveImpresora = async (data: any) => {

    try {
        const result = await axios.post('api/add-printers', data)
        if (result.status) {
            return result
        }
    } catch (error) {
        return error

    }
}