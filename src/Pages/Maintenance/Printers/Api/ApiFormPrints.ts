import axios from "axios"

export const getFormtPrinter = async () => {
    try {
        const res: any = await axios.get('/api/v1/list/impresoras/formatos')
        if (res?.status === 'success') {
            return res
        }

    } catch (e) {
        return e
    }
}
