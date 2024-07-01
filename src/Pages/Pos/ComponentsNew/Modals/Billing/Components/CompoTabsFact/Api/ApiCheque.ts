import axios from "axios"

export const getCheques = async (id_order: number) => {
    try {

        const res = await axios.get('/api/v1/list-factura-cheque', {
            params: {
                id_order: id_order || 0
            }
        })

        if (res.status) {
            return res || []
        }

    } catch (err) {
        return err
    }
}

export const createItemCheque = async (data: any) => {
    try {
        const result = await axios.post('/api/add-factura-cheque', { data: data })
        if (result.status) {
            return result
        } else {
            throw new Error("Error al crear el cheque");
        }

    } catch (e) {
        return e
    }
}


export const deleteItemCheque = async (id_order: number) => {

    try {
        const result = await axios.delete('api/v1/delete-factura-cheque', { params: { id: id_order } })
        if (result.status) {
            return result
        }
    } catch (error) {
        return error
    }
}

export const updateItemCheque = async (id_order: number, data: any) => {
    try {
        const result = await axios.patch(`api/v1/edit-factura-cheque/${id_order}`, data)
        if (result.status) {
            return result
        }
    } catch (error) {
        return error
    }
}

export const updateGroupCheque = async (data: any) => {
    // some id_factura_cheque
    const dataNew = data.filter((item: any) => !item.hasOwnProperty('id_factura_cheque'))
    try {
        const result = await axios.patch('api/v1/edit-factura-cheque-group', { data: dataNew })
        if (result.status) {
            return result
        }
    } catch (error) {
        return error
    }
}