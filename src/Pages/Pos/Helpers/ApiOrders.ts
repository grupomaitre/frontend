import axios from "axios"

export const getOrdens = async (): Promise<any> => {
    try {
        const response = await axios.get('api/buscarYSumarOrden')
        if (response) {
            return response
        }
    } catch (error) {
        return error
    }
}