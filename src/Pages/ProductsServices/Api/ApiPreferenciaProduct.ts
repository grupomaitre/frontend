import axios from "axios";

export const listPrefProduct = async (id_product: number) => {

    try {
        const result = await axios.get("/api/v1/list/preferencias/productos",
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

export const savePrefProduct = async (id_product: number, id_preferencia: number) => {

    try {
        const result = await axios.post("/api/v1/add/preferencias/productos", {
            id_product: id_product,
            id_preferencia: id_preferencia,

        })

        if (result) {
            return result;
        }

    } catch (error) {
        return error
    }

}

export const deletePrefProduct = async (id_preferencia: number) => {
    try {
        const result = await axios.delete(`/api/v1/delete-refencias/${id_preferencia}`)

        if (result) {
            return result;
        }

    } catch (error) {
        return error
    }

}