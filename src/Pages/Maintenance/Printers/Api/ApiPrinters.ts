import { api } from "../../../../config"
const apiexpress = api.API_URL_SOCKET
import axios from "axios"
export const fetchGetPrinter = async () => {
    try {
        const result = await fetch(apiexpress + '/api/v1/impresoras/list')
        const data = await result.json()
        if (result.status) {
            return data
        }
    } catch (e) {
        return e
    }
}


export const getPrinterList = async () => {
    try {
        const result = await axios.get('/api/v1/list-printers')
        if (result.status) {
            return result.data
        }
    } catch (e) {
        return e
    }
}

export const getTypePrinters = async () => {
    try {

        const result = await axios.get('/api/v1/list-tipo-impresora')
        if (result.status) {
            return result.data
        }

    } catch (error) {
        return error
    }
}