import axios from "axios";
import { api } from "../../../config";
import { SwalError } from "../../../Components/Common/Swals/SwalsApi";
const apiexpress = api.API_URL_SOCKET
export const loginAuth = async (datForm: any) => {
    try {
        const result = await axios.post('/api/login',
            {
                user_name: datForm.user,
                password: datForm.password,
                maquina: datForm.maquina

            }
        )
        if (result.status) {
            return result
        }
    } catch (e) {
        return SwalError({ title: 'Datos Incorrectos', text: 'Vuelva a intentar' })
    }
}
export const getInfoTerminal = async () => {
    try {
        const result = await fetch(`${apiexpress}/api/v1/device/info/device`)
        const data = await result.json()
        return data
    } catch (e) {
        return e
    }
}
export const saveTerminal = async (terminal: any) => {

    try {
        const result = await axios.post(`${apiexpress}/api/v1/add-terminal`, terminal)
        if (result.status) {
            return result
        }

    } catch (e) {
        return e
    }

}