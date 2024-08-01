import axios from 'axios'
import { SwalError, toastError, toastSuccess } from '../../../Components/Common/Swals/SwalsApi'
import { useQuery } from 'react-query'
export const getMarcas = async () => {
    try {
        const response = await axios.get('/api/list-marca', {
            params: {
                status: 1
            }
        })
        return response || []


    } catch (error) {
        return alert('Error en el servidor')
    }
}
export const addMarca = async (data: any) => {
    try {
        const response = await axios.post('/api/add-marca', data)
        if (response) {
            toastSuccess({ message: 'Marca agregada correctamente' })
            return response
        }
    } catch (error) {
        toastError({ message: error || 'Error al agregar la marca' })
    }
}
//edit
export const editMarca = async (data: any, sendData: any) => {
    try {
        const response = await axios.patch(`/api/edit-marca/${data.id_marca}`, sendData)
        if (response) {
            toastSuccess({ message: 'Marca editada correctamente' })
            return response
        }
    } catch (error) {
        toastError({ message: error || 'Error al editar la marca' })
    }
}
//delete
export const deleteMarcaById = async (data: any) => {
    try {
        const response = await axios.delete(`/api/delete-marca/${data.id_marca}`)
        if (response) {
            toastSuccess({ message: 'Marca eliminada correctamente' })
            return response
        }
    } catch (error) {
        toastError({ message: error || 'Error al eliminar la marca' })
    }
}

//get products
const getProductsInv = async (id: number) => {
    try {
        const response = await axios.get('/api/v1/list-product', {
            params: {
                status: 1,
                id_tipo_rubro: id
            }
        })
        if (response.status) {
            return response.data
        }
    }
    catch (error) {
        return toastError({ message: 'Error al obtener productos' })
    }
}

export const useAllProducts = (id_tipo_rubro: number) => {
    const query = useQuery(['allProducts'], () => getProductsInv(id_tipo_rubro), {
        refetchOnWindowFocus: false,

    });
    return query
}
export const addProduct = async (data: any) => {
    try {
        const response = await axios.post('/api/v1/save-product', data)
        if (response) {
            return response || []
        }
    } catch (error) {
        return SwalError({ title: error })
    }
}
//class function to edit product

export const editProduct = async (id_product: any, sendData: any) => {
    try {
        const response = await axios.patch(`/api/v1/edit-product/${id_product}`, sendData)
        if (response) {
            return response
        }
    } catch (error) {
        return error
    }
}


//clas getMarca
class MarcaAPI {
    async getMarcaByID(id: any) {
        try {
            const response = await axios.get(`/api/list-marca/${id}`, {
                params: {
                    status: 1
                }
            })
            return response.data // Devolver los datos de la respuesta, no la respuesta completa
        } catch (error) {
            console.error(error)
            throw error // Relanzar el error para manejarlo en el código que utiliza esta clase
        }
    }

    async getMarcaByNombre() {
        try {
            const response = await axios.get('/api/list-rubros', {
                params: {
                    status: 1
                }
            })
            return response.data // Devolver los datos de la respuesta, no la respuesta completa
        } catch (error) {
            console.error(error)
            throw error // Relanzar el error para manejarlo en el código que utiliza esta clase
        }
    }


}

export const marcaAPI = new MarcaAPI()