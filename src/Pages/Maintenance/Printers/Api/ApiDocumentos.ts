import axios from "axios"

export const getDocument = async () => {
    try {
        const res = await axios.get('api/list-documentos', {
            params: {
                status: 1
            }
        })
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
export const getDocumentWithSitio = async () => {
    try {
        const res = await axios.get('/api/v1/list/documentos/sitio/impresora')
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const addDocument = async (data: any) => {
    try {
        const res = await axios.post('api/v1/add/asignacion-impresora', data)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const editDocument = async (id: number) => {
    try {
        const res = await axios.patch(`api/v1/edit/asignacion-impresora/${id}`)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
export const deleteDocument = async (id: number) => {
    try {
        const res = await axios.delete(`api/v1/delete/asignacion-impresora/${id}`)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
