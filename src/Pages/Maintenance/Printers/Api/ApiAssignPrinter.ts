import axios from "axios"

export const getAssignPrinter = async () => {
    try {
        const res = await axios.get('api/v1/list/asignacion-impresora')
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const addAssignPrinter = async (data: any) => {
    try {
        const res = await axios.post('api/v1/add/asignacion-impresora', data)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const editAssignPrinter = async (id: number, data: any) => {
    try {
        const res = await axios.patch(`api/v1/edit/asignacion-impresora/${id}`, data)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
export const deleteAssignPrinter = async (id: number) => {
    try {
        const res = await axios.delete(`api/v1/delete/asignacion-impresora/${id}`)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
