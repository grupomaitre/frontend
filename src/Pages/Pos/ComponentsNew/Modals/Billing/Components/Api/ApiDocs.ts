import axios from "axios"

export const getDocs = async () => {

    try {
        const res = await axios.get('/api/list-documentos', { params: { status: 1 } })
        if (res.status) {
            return res.data || []
        }
    } catch (error) {
        return error
    }

}

export const handleAbrirCajon = async () => {
    try {
        const res: any = await axios.get('/api/abrir/cajo')
        if (res) {
            return res
        }
    } catch (error) {
        return error
    }
}