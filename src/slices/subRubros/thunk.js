import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {
    getSubRubrosList as getSubRubrosListApi,
    addNewSubRubros as addNewSubRubrosApi,
    updateSubRubros as updateSubRubrosApi,
    deleteSubRubros as deleteSubRubrosApi,
} from "../../helpers/fakebackend_helper"

export const getSubRubrosList = createAsyncThunk("subSubRubros/getSubRubrosList", async (SubRubros) => {
    try {
        const response = getSubRubrosListApi(SubRubros)
        return response
    } catch (error) {
        return error
    }
})
export const addNewSubRubros = createAsyncThunk("subSubRubros/addNewSubRubros", async (SubRubros) => {

    try {
        const response = await addNewSubRubrosApi(SubRubros)
        toast.success("Guardado con éxito", { autoClose: 2000 })
        return response
    } catch (error) {
        toast.error("Fallo al Guardar " + error, { autoClose: 5000 })
        throw error
    }
})

export const updateSubRubros = createAsyncThunk("subSubRubros/updateSubRubros", async (SubRubros) => {
    try {
        const response = updateSubRubrosApi(SubRubros)
        toast.success("Editado con extio", { autoClose: 3000 })
        return response
    } catch (error) {
        toast.error("Falllo al editar", { autoClose: 3000 })
        return error
    }
})

export const deleteSubRubros = createAsyncThunk("subSubRubros/deleteSubRubros", async (SubRubros) => {
    try {
        const response = deleteSubRubrosApi(SubRubros)
        toast.success("Borrado con exito", { autoClose: 3000 })
        return { SubRubros, ...response }
    } catch (error) {
        toast.error("Fallo al borrar", { autoClose: 3000 })
        return error
    }
})