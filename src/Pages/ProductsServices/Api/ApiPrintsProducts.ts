import axios from "axios";

export const listPrintsfProduct = async (id_product: number) => {

    try {
        const result = await axios.get("/api/v1/list/impresoras/productos",
            {
                params: {
                    id_product: id_product,
                }
            }
        )

        if (result) {
            return result;
        }

    } catch (error) {
        return error
    }

}

export const saveImpresoraProduct = async (id_product: number, id_impresora: number) => {

    try {
        const result = await axios.post("/api/v1/add/sitio/impresora/item", {
            id_product: id_product,
            id_impresora: id_impresora,

        })

        if (result) {
            return result;
        }

    } catch (error) {
        return error
    }

}

export const deleteImpresorasProduct = async (id_impresora: number) => {
    try {
        const result = await axios.delete(`/api/v1/delete/sitio/impresora/item/${id_impresora}`)

        if (result) {
            return result;
        }

    } catch (error) {
        return error
    }

}