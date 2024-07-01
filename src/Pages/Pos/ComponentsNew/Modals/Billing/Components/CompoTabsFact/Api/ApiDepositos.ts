import axios from "axios"

export const getDesositos = async (id_order: number) => {
    try {
        const res = await axios.get('/api/v1/list-factura-deposito', {
            params: {
                id_order: id_order
            }
        })

        if (res.status) {
            return res || []
        }

    } catch (e) {
        return e
    }
}
export const deleteItemDepo = async (id: number) => {
    try {
        const res = await axios.delete('api/v1/delete-factura-deposito', { params: { id: id } })

        if (res.status) {
            return res || []
        }

    } catch (e) {
        return e
    }
}

export const updateItemDeposito = async (id_order: number, data: any) => {
    try {
        const res = await axios.patch(`api/v1/edit-factura-deposito/${id_order}`, data)

        if (res.status) {
            return res || []
        }

    } catch (e) {
        return e
    }
}