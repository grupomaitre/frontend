import axios from 'axios'
import Swal from 'sweetalert2'
import { IMesa } from '../Interfaces/InterfaceMesas'
/* export const GetMesas = async (status) => {
    try {
        const response = await axios.get('api/list-mesa-position')
        return response.data
    } catch (error) {
        console.error(error)
    }
} */
export const GetMesas = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-mesa-position')
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const GetMesasPosition = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-mesa-position')
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const UpdateMesaPosition = async (id_Mesa: any, data: any): Promise<any> => {
    try {
        const response = await axios.post('api/update-mesa-position',
            {
                id_mesa: id_Mesa,
                x: data.x,
                y: data.y
            }
        )
        if (!response.data) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error al actualizar la posición de la mesa',
            })
        }
        return response.data
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al actualizar la posición de la mesa',
        })
    }
}
export const getAllMesas = async (): Promise<IMesa[]> => {
    try {
        const response = await axios.get('api/list-mesa')
        if (!response) throw new Error("Error fetching groups");
        return response.data
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}

export const getMesasDetails = async (): Promise<any[]> => {
    try {
        const response = await axios.get('/api/v1/mesa/detalle')
        if (!response) throw new Error("Error fetching groups");
        return response.data
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}
