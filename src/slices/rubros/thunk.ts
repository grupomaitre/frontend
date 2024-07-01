import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    getRubrosList as getRubrosListApi,
    addNewRubros as addNewRubrosApi,
    updateRubros as updateRubrosApi,
    deleteRubros as deleteRubrosApi,
} from "../../helpers/fakebackend_helper";

export const getRubrosList = createAsyncThunk("rubros/getRubrosList", async (Rubros) => {
    try {
        const response = getRubrosListApi(Rubros);
        return response;
    } catch (error) {
        return error;
    }
});
export const addNewRubros = createAsyncThunk("rubros/addNewRubros", async (Rubros) => {

    try {
        const response = await addNewRubrosApi(Rubros);
        toast.success("Guardado con éxito", { autoClose: 1000 });
        return response;
    } catch (error) {
        toast.error("Fallo al Guardar " + error, { autoClose: 5000 });
        throw error;
    }
});




export const updateRubros = createAsyncThunk("rubros/updateRubros", async (Rubros) => {
    try {
        const response = updateRubrosApi(Rubros);
        toast.success("Editado con extio", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Falllo al editar", { autoClose: 3000 });
        return error;
    }
});

export const deleteRubros = createAsyncThunk("rubros/deleteRubros", async (Rubros) => {
    try {
        const response = deleteRubrosApi(Rubros);
        toast.success("Borrado con exito", { autoClose: 3000 });
        return { Rubros, ...response };
    } catch (error) {
        toast.error("Fallo al borrar", { autoClose: 3000 });
        return error;
    }
});