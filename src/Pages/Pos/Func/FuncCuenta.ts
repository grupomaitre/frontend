import axios from "axios"
import { useDispatch } from "react-redux"
import { addMesa, addPax, setIDCart, setIDUser, setIdMesa, setIdOrder, setNewCart, setVendedorSlice } from "../../../slices/Cart/cartSlice"

const getAllCart = async (id_mesa: number) => {
    const dispatch = useDispatch()

    try {
        const result = await axios.get("api/list-cart-mesa", { params: { id_mesa: id_mesa, status: 1, status_mesa: 1 } })

        if (result) {
            const { data } = result

            dispatch(setIdOrder(result?.data.id_order))
            dispatch(setNewCart(data?.product))
            dispatch(addPax(data?.pax))
            dispatch(setIDCart(data?.id_cart))
            dispatch(setVendedorSlice(data?.resposable))
            dispatch(setIDUser(data?.id_user))
            dispatch(setIdMesa(result?.data.id_mesa))
            dispatch(addMesa(result?.data.nombre_mesa))

        }

    } catch (error) {
        return error
    }
}
export const getAllDataCuenta = async (id_mesa: number) => {
    const res: any = getAllCart(id_mesa)
    return res

}