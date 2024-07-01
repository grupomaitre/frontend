import axios from "axios";

export const deleteFacDocs = async (id_order: number) => {
    try {
        const result = await axios.delete('/api/v1/delete-factura-docs?id_order', { params: { id_order: id_order || 0 } })
        if (result.status) {
            return result || []
        }
    } catch (e) {
        return e
    }
}