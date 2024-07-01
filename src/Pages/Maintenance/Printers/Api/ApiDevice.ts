import { api } from "../../../../config"
const apiexpress = api.API_URL_SOCKET

export const fetchGetNameHost = async () => {
    try {
        const result = await fetch(`${apiexpress}/api/v1/device/info/device`)
        const data = await result.json()
        if (result.status) {
            return data
        }

    } catch (e) {
        return e
    }
}
