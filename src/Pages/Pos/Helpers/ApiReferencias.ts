import axios from "axios"
import { SwalError, toastError, toastSuccess } from "../../../Components/Common/Swals/SwalsApi"
export const getRefencias = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-preferencias')
        if (response.status) {
            return response.data
        }
    } catch (error) {
        SwalError({ title: 'Error al obtener refencias', text: error })
    }
}
export const saveRefencia = async (data: any): Promise<any> => {

    try {
        const response = await axios.post('api/add-preferencias', { name: data })
        if (response.status) {
            toastSuccess({ message: 'Referencia agregada' })
            return response.data
        }
    } catch (error) {
        toastError({ message: 'Error al guardar preferencia' })
    }
}
interface item {
    idCart: number,
    id_product: number,
}
interface listReferencias {
    id_referencia_product: number,
}

export const SaveProductPreferencia = async (item: item, listReferencias: Array<listReferencias>): Promise<any> => {
    try {
        const result = await axios.post('api/add-preferencia-product', {
            idCart: item.idCart,
            id_product: item.id_product,
            listReferencias: listReferencias

        })
        return result
    } catch (e) {
        SwalError({ title: e, text: 'Error al guardar las referencias' })
    }
}
export const getRefenciasProduct = async (item: item): Promise<any> => {
    try {
        const result = await axios.get('api/list-refencias-product', {
            params: {
                id_cart: item.idCart,
                id_product: item.id_product
            }
        })

        if (result.status) {
            return result.data
        }
    } catch (e) {
        SwalError({ title: e, text: 'Error al obtener las referencias' })
    }
}
export const updatePrefenciasId = async (idCartProduct: number): Promise<any> => {
    try {
        const result = await axios.post('api/v1/edit-preferencia', {
            idCartProduct: idCartProduct
        })
        return result
    } catch (e) {
        return e
    }
}

export const statutPreferencia = async (id_cart: number, id_product: number): Promise<any> => {
    try {
        const result = await axios.post('api/v1/status-cart-preferencia', {
            id_cart: id_cart,
            id_product: id_product
        })
        return result
    } catch (e) {
        SwalError({ title: e, text: 'Error al actualizar las preferencias' })
    }
}