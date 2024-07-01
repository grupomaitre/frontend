import axios from "axios"

export const savePrecios = async (id_product: number, data: any) => {
    try {
        const response = await axios.patch(`/api/v1/edit-product/${id_product}`, data)
        if (response) {
            return response
        }
    } catch (error) { return error }
}

export const editPreciosProduct = async (id_product: number, data: any) => {
    try {
        const response: any  = await axios.patch(`/api/v1/edit/precios/product/${id_product}`, data)
        if (response.status === 'success') {
            return response
        }
    } catch (error) { return error }
}

