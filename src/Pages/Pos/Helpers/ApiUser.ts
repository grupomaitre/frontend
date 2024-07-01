import axios from "axios";
export const BuscarUser = async (user: string): Promise<any> => {
    try {
        const response = await axios.get('api/buscar-usuario', { params: { user_name: user } })
        if (response.status) {
            return response.data
        }
    }
    catch (error) {
        return error
    }
}
export const searchUser = async (user: string): Promise<any> => {
    try {
        const response = await axios.get('api/buscar-usuario', { params: { user_name: user } })
        if (response.status) {
            return response
        }
    }
    catch (error) {
        return false
    }
}
