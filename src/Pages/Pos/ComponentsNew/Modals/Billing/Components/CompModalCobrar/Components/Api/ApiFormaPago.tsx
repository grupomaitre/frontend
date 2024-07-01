import axios from "axios"

export const getFormaPago = async () => {
    try {

        const res = await axios.get('/api/list-forma-pago', {
            params: {
                status: 1,
                estado: "pos"
            }
        })
        if (res.status) {
            return res.data
        }

    } catch (error) {
        return error
    }
}