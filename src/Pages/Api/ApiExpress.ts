import { api } from "../../config";
const apiexpress = api.API_URL_SOCKET

export const FetchTestDataBase = async () => {
    try {
        const result = await fetch(`${apiexpress}v1/test/conexion/database`)
        const data = await result.json()
        return data
    } catch (e) {
        return e
    }
}
export const FetchSaveDataBase = async (config: any) => {
    try {
        const result: any = await fetch(`${apiexpress}v1/guardar/conexion/database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        })
        const data = await result.json()
        return data
    } catch (e) {
        return e
    }
}