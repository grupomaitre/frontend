import axios from "axios";
import { SwalError } from "../../../../../../Components/Common/Swals/SwalsApi";

export const getBancos = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-bancos')
        if (response.status) {
            return response
        }
    } catch (error) {
        SwalError({ title: 'Error al obtener Bancos', text: error })
    }
}
export const saveCheque = async (data: any): Promise<any> => {
    try {
        const response = await axios.post('api/add-factura-cheque', data)
        if (response.status) {
            return response
        }
    } catch (error) {
        SwalError({ title: 'Error al guardar cheque', text: error })
    }
}
export const saveTarjeta = async (data: any): Promise<any> => {
    try {
        const response = await axios.post('api/add-factura-tarjeta', data)
        if (response.status) {
            return response
        }
    } catch (error) {
        SwalError({ title: 'Error al guardar cheque', text: error })
    }
}

export const saveDeposito = async (data: any): Promise<any> => {
    try {
        const response = await axios.post('api/add-factura-deposito', data)
        if (response.status) {
            return response
        }
    } catch (error) {
        SwalError({ title: 'Error al guardar cheque', text: error })
    }
}
//add clientes
export const addCliente = async (data: any): Promise<any> => {
    try {
        const response = await axios.post('api/add-clientes', data)
        if (response) {
            return response
        }
    } catch (error) {
        SwalError({ title: error, text: error })
    }
}
