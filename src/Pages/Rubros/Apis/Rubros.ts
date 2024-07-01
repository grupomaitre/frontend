import axios from "axios"
import { toastSuccess, toastError } from "../../../Components/Common/Swals/SwalsApi"
//listar tipos de rubros
export const getTipoRubros = async () => {
    try {
        const response = await axios.get('/api/list-tipo-rubros', {
            params: {
                status: 1
            }
        })
        return response.data
    } catch (e) {
        toastError({ message: e || 'Error al listar los tipos de rubros' })
    }
}
//add add-tipo-rubros
export const addTipoRubros = async (data: any) => {

    try {
        const response = await axios.post('/api/add-tipo-rubros', data)
        toastSuccess({ message: 'Guardado con exito' })
        return response
    } catch (e) {
        toastError({ message: e || 'Error al agregar el tipo de rubro' })
    }
}
export const editTypeRubro = async (id: number, data: Array<any>) => {
    try {
        const response = await axios.patch(`api/edit-tipo-rubros/${id}`, data)
        if (response.status) {
            toastSuccess({ message: 'Guardado con exito' })
            return response
        }

    } catch (e) {
        toastError({ message: e || 'Error al agregar el tipo de rubro' })
        return e
    }
}


export const fetchDeleteTypeRubro = async (id: number) => {
    try {
        const response = await axios.delete(`api/delete-tipo-rubros/${id}`)
        if (response.status) {
            toastSuccess({ message: 'Borrdo con exito' })
            return response
        }
    } catch (e) {
        toastError({ message: e || 'Error al borrar el tipo de rubro' })
        return e
    }
}

