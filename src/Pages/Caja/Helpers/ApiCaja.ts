import axios from "axios"
import { SwalError } from "../../../Components/Common/Swals/SwalsApi"
export const getCajaActive = async () => {
    try {
        const result = await axios.get('/api/caja-activa')
        if (result.data) {
            return result.data || null
        }

    } catch (e) {
        SwalError({ text: e })
        return e
    }
}

export const getReportCajaAll = async (id_caja: number) => {
    try {

        const result: any = axios.get('/api/v1/reporte-cajas-documento', {
            params: {
                id_caja_diaria: id_caja
            }
        })

        if (result) {
            return result
        }
    } catch (error) {
        SwalError
        return error
    }
}



export const getReportCajaCuenta = async (id_caja: number) => {
    try {
        const result = await axios.get('api/v1/reporte-cajas-cuenta', {
            params: {
                id_caja_diaria: id_caja
            }
        })
        return result.data
    } catch (e) {
        return console.log(e)
    }
}
export const getReportCajaIngreso = async (id_caja: number) => {
    try {
        const result = await axios.get('api/v1/reporte-cajas-ingresos', {
            params: {
                id_caja_diaria: id_caja
            }
        })
        return result.data
    } catch (e) {
        console.log(e)
    }
}
export const getReportCajaEgreso = async (id_caja: number) => {
    try {
        const result = await axios.get('api/v1/reporte-cajas-egresos', {
            params: {
                id_caja_diaria: id_caja
            }
        })
        return result.data
    } catch (e) {
        console.log(e)
    }
}
export const getCuentasCount = async () => {
    try {
        const result = await axios.get('api/list-mesa-active', { params: { status: 1 } })
        if (result.status) {
            return result.data
        }

    } catch (e) {
        console.log(e)
    }
}
