import axios from "axios"

export const getSitePrinter = async () => {
    try {
        const res = await axios.get('api/v1/list/sitio/impresora')
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const addSitePrinter = async (data: any) => {
    try {
        const res = await axios.post('api/v1/add/sitio/impresora', data)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}

export const editSitePrinter = async (id: number, data: any) => {
    try {
        const res = await axios.patch(`api/v1/edit/sitio/impresora/${id}`, data)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
export const deleteSitePrinter = async (id: number) => {
    try {
        const res = await axios.delete(`api/v1/delete/sitio/impresora/${id}`)
        if (res.status) {
            return res
        }

    } catch (e) {
        return e
    }
}
