import axios from "axios";

export const fetchTipoCuenta = async () => {
    try {
        const res: any = await axios.get('/api/v2/list/tipo/cuenta')
        if (res.status === 'success') {
            return res.data
        }
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}
export const fetchImagenCuenta = async () => {
    try {
        const res: any = await axios.get('/api/v1/list/imagenes/mesas')
        if (res.status === 'success') {
            return res.data
        }
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}