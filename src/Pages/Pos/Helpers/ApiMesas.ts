import axios from "axios";
/* interface IResponse {
    status: boolean
    data: any
    message: string
    cart?: any[]
} */
import { toastError } from "../../../Components/Common/Swals/SwalsApi";
import { verCarrro } from "./ApiGetAllCart";
export const BuscarMesa = async (mesa: string, id_cart: number): Promise<any> => {
    try {
        const response = await axios.get('api/buscar-mesa', {
            params: {
                nombre_mesa: mesa,
                id_mesa: mesa,
            },
        });

        const id_mesa = response.data.id_mesa;

        if (response.data.status) {
            try {
                const data = await verCarrro(id_mesa, id_cart)
                return data;
            } catch (error) {
                console.error(error)
            }
        } else {
            return response
        }
    }
    catch (error) {
        return true
    }
}
export const updateMesaStatus = async (idMesa: number): Promise<any> => {
    try {
        const response = await axios.post('api/update-mesas-status', {
            idMesa: idMesa,
            status: 0,
            status_cobrar: 1
        })
        if (response.status) {
            return response
        }
    }
    catch (error) {
        toastError({ message: error || 'Error al actualizar mesa' });
    }
}