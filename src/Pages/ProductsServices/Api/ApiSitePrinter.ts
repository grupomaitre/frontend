import axios from "axios"

export const getSitePrinter = async () => {
    try {
        const res = await axios.get('api/v1/list/sitio/impresora')
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}