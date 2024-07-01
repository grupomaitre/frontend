import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getClientesList as getClientesListApi,
    addNewClientes as addNewClientesApi,
    updateClientes as updateClientesApi,
    deleteClientes as deleteClientesApi,
} from "../../../helpers/fakebackend_helper";
import { SwalError, SwalSuccess } from "../../../Components/Common/Swals/SwalsApi";
/* export const getClientesList = createAsyncThunk('clientes/getClientesList', async () => {
    /*     try {
            const response = getClientesListApi();
            return response;
        } catch (error) {
            return SwalError({ title: "fallo al obtener registros" })
    
        }
    })  */
export const getClientesList = createAsyncThunk<any>("clientes/getClientesList", async () => {
    try {
        const response = await getClientesListApi();
        return response;
    } catch (error) {
        return SwalError({ title: "fallo al obtener registros" })
    }
});









export const addNewClientes = createAsyncThunk("clientes/addNewClientes", async (company) => {

    try {
        const response = await addNewClientesApi(company);
        SwalSuccess({ title: "Guardado con exito" })
        return response;
    } catch (error) {
        SwalError({ title: "Fallo al guardar" })
        throw error;
    }
});




export const updateClientes = createAsyncThunk("clientes/updateClientes", async (company) => {
    try {
        const response = updateClientesApi(company);
        SwalSuccess({ title: "Editado con exito" })
        return response;
    } catch (error) {
        SwalError({ title: "Fallo al editar" })
        return error;
    }
});

export const deleteClientes = createAsyncThunk("clientes/deleteClientes", async (company) => {
    try {
        const response = deleteClientesApi(company);
        SwalSuccess({ title: "Borrado con exito" })
        return { company, ...response };
    } catch (error) {
        SwalError({ title: "Fallo al borrar" })
        return error;
    }
});