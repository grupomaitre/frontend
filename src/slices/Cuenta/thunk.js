import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {
    getCuentasList as getCuentasListApi,
    addNewCuentas as addNewCuentasApi,
    updateCuentas as updateCuentasApi,
    deleteCuentas as deleteCuentasApi,
} from "../../helpers/fakebackend_helper"
import { SwalError } from "../../Components/Common/Swals/SwalsApi"

export const getCuentasList = createAsyncThunk("Cuentas/getCuentasList", async (cuenta) => {
    try {
        const response = await getCuentasListApi(cuenta)
        return response
    } catch (error) {
        SwalError({ text: error, title: "Fallo al cargar" })
        throw error

    }
})
export const addNewCuentas = createAsyncThunk("Cuentas/addNewCuentas", async (personal) => {

    try {
        const response = await addNewCuentasApi(personal)
        toast.success("Guardado con éxito", { autoClose: 3000 })
        return response
    } catch (error) {
        toast.error("Fallo al Guardar", { autoClose: 3000 })
        throw error
    }
})




export const updateCuentas = createAsyncThunk("Cuentas/updateCuentas", async (personal) => {
    try {
        const response = await updateCuentasApi(personal)
        console.log("response correcto", response)
        toast.success("Editado con extio", { autoClose: 3000 })
        return response
    } catch (error) {
        console.log('errores', error)
        toast.error("Falllo al editar", { autoClose: 3000 })
        return error
    }
})

export const deleteCuentas = createAsyncThunk("Cuentas/deleteCuentas", async (personal) => {
    try {
        const response = deleteCuentasApi(personal)
        toast.success("Borrado con exito", { autoClose: 3000 })
        return { personal, ...response }
    } catch (error) {
        toast.error("Fallo al borrar", { autoClose: 3000 })
        return error
    }
})