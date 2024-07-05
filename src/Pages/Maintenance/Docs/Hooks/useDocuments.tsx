import { useMutation, useQuery, useQueryClient } from "react-query"
import { toastError, toastSuccess } from "../../../../Components/Common/Swals/SwalsApi"
import axios from "axios"
const getDocumentosType = async () => {

    try {
        const url = '/api/v1/list/documentos/tipos'
        const response: any = await axios.get(url)
        if (response.status) {
            return response.data
        }

    } catch (e) {
        toastError({ message: e })
        throw new Error("Error fetching groups")

    }
}
export const createDocumento = async (newDocumento: any) => {
    try {
        const url = '/api/v1/add/documentos'
        const response = await axios.post(url, newDocumento)
        if (response.status) {
            toastSuccess({ message: 'Guardado con exito' })
            return response
        }
    } catch (e) {
        toastError({ message: e })
        throw new Error("Error creating document")
    }
}
export const updateDocumento = async (id: any, data: any) => {
    try {
        const url = `/api/v1/edit/documentos/${id}`
        const response = await axios.patch(url, data)
        if (response.status) {
            toastSuccess({ message: 'Guardado con exito' })
            return response
        }
    } catch (e) {
        toastError({ message: e })
        throw new Error("Error creating document")
    }
}

//use crud
//list
export const useDocs = () => {
    const query = useQuery(['documentosType'], getDocumentosType, {
        refetchOnWindowFocus: false,

    })
    return query
}
//create
export const useCreateDoc: any = () => {
    const queryClient = useQueryClient()
    const create = useMutation({
        mutationFn: createDocumento,
        onSuccess: () => {
            queryClient.invalidateQueries('documentosType')
        },
    })
    return create
}
