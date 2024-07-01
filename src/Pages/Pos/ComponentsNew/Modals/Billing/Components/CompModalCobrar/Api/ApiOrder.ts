import axios from "axios"

export const getOrderByCart = async (id: number) => {
    try {

        const res: any = await axios.get('/api/buscar/Orden/cart', {
            params: {
                id_cart: id
            }
        })
        if (res.status === "success") {
            return res
        }
    } catch (error) {
        return error
    }


}