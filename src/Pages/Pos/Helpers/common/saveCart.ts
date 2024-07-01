
import { totalCart } from "../../Func/FuncCart";
import { saveCart } from "../ApiCart";

/* interface ICart {
    cart: any,
    cantidad: number,
    orden: number,
    id_mesa: number,
    pax: number,
    id_caja: number,
    vendedor: string,
    id_user: number
} */
const total = totalCart()

export const handleSaveCart = async (cart: any, cantidad: number, orden: number, id_mesa: number, pax: number, id_caja: number, vendedor: any, id_user: number): Promise<any> => {
    saveCart(cart, cantidad, orden, id_mesa, pax, id_caja, vendedor, id_user, total).then(res => {
        return res
    })
}
