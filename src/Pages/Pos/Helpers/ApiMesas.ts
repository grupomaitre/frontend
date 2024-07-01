import axios from "axios";
//import { toast } from 'react-toastify';
interface IResponse {
    status: boolean
    data: any
    message: string
    cart?: any[]
}
import { toastError } from "../../../Components/Common/Swals/SwalsApi";
import { verCarrro } from "./ApiGetAllCart";
export const BuscarMesa = async (mesa: string, /* idMesa: number */ id_cart: number): Promise<any> => {
    try {
        const response: IResponse = await axios.get('api/buscar-mesa', {
            params: {
                nombre_mesa: mesa,
                id_mesa: mesa,
            },
        });
        switch (response.message) {
            case "Mesa no encontrada":
                return { message: response.message, data: response.data }
            case "Cuenta sin items":

                return { message: response.message, data: response.data }
            case "Cuenta con items":
                const id_mesa = response.data.id_mesa;
                const data = await verCarrro(id_mesa, id_cart)
                return { message: response.message, data: data.data || data.product }
            default:
                // Acción por defecto si no coincide con ningún caso
                break;
        }
    }
    catch (error) {
        return toastError({ title: error })
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