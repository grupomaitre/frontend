import { createAsyncThunk } from "@reduxjs/toolkit";
import { SwalError, SwalSuccess } from '../../../Components/Common/Swals/SwalsApi'
import "react-toastify/dist/ReactToastify.css";
import {
    getCajasList as getCajasListApi,
    addNewCajas as addNewCajasApi,
    updateCajas as updateCajasApi,
    deleteCajas as deleteCajasApi,
} from "../../../helpers/fakebackend_helper";

export const getCajasList = createAsyncThunk("cajas/getCajasList", async () => {
    try {
        const response = await getCajasListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const updateUser = createAsyncThunk('users/update', async () => {
    try {
        return true
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        return false
    }
}
)
export const addNewCajas = createAsyncThunk("cajas/addNewCajas", async (caja) => {

    try {
        const response = await addNewCajasApi(caja);
        SwalSuccess({ title: 'Creado con exito' })
        return response;
    } catch (error) {
        SwalError({ title: error, text: 'Error al crear' })
    }
});




export const updateCajas = createAsyncThunk("cajas/updateCajas", async (caja) => {
    try {
        const response = updateCajasApi(caja);
        SwalSuccess({ title: 'Editado con extio' })
        return response;
    } catch (error) {
        SwalError({ title: error, text: 'Error al editar' })
        return error;
    }
});

export const deleteCajas = createAsyncThunk("cajas/deleteCajas", async (caja) => {
    try {
        const response = await deleteCajasApi(caja);
        SwalSuccess({ title: 'Caja Cerrada con exito"' })
        return { caja, ...response };
    } catch (error) {
        SwalError({ title: error, text: 'Error al cerrar caja' })
        return error;
    }
});
