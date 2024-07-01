import axios from "axios"
import { useQuery } from 'react-query';

import { SwalError } from "../../../Components/Common/Swals/SwalsApi"


export const getClientes = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-clientes')
        if (response.status) {
            return response
        }
    } catch (error) {
        SwalError({ title: 'Error al obtener Productos', text: error })
    }
}
//cache use query
export const useClientesData = () => {
    return useQuery('clientesData', getClientes, {
        cacheTime: 300000, // Tiempo de vida de la caché en milisegundos (5 minutos en este ejemplo)
    });
}