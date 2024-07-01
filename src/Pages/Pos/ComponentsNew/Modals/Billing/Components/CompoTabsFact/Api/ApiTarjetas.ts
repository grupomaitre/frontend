import axios from "axios";


export const getTarjetas = async (idOrder: number) => {
    try {
        const result = await axios.get('api/v1/list-factura-tarjeta', { params: { id_order: idOrder } })
        if (result.status) {
            return result
        }
    } catch (error) {
        return error
    }
}

export const createItemTarjeta = async (data: any) => {
    
    const dataNew = data.filter((item: any) => !item.hasOwnProperty('id_factura_tarjeta'))
    try {
        const result = await axios.post('api/add-factura-tarjeta', { items: dataNew })

        if (result.status) {

        }
    } catch (error) { return error }
}




export const deleteItemTarjeta = async (id: number) => {
    try {
        const result = await axios.delete('api/v1/delete-factura-tarjeta', { params: { id: id } })
        if (result.status) {
            return result.data
        }
    } catch (error) {
        return error
    }
}

export const updateItemTarjeta = async (id: number, data: any) => {
    try {
        const result = await axios.patch(`api/v1/edit-factura-tarjeta/${id}`, data)
        if (result.status) {
            return result.data
        }
    } catch (error) {
        return error
    }
}