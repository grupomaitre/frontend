import { createSlice } from "@reduxjs/toolkit";
import { getCajasList, addNewCajas, updateCajas, deleteCajas } from './thunk';
interface Icajas {
    cajasList: any[]
    cajaActive: any
    nameCajaActive: any
    error: any[]
    isCajasCreated?: boolean
    isCajasSuccess?: boolean
    isCajasAdd?: boolean
    isCajasAddFail?: boolean
    isCajasUpdate?: boolean
    isCajasUpdateFail?: boolean
    isCajasDelete?: boolean
    isCajasDeleteFail?: boolean

}

export const initialState: Icajas = {
    cajasList: [],
    error: [],
    cajaActive: null,
    nameCajaActive: null,
    isCajasCreated: false,
    isCajasSuccess: false,
    isCajasAdd: false,
    isCajasAddFail: false,
    isCajasUpdate: false,
    isCajasUpdateFail: false,
    isCajasDelete: false,
    isCajasDeleteFail: false,
};

const CajasSlice = createSlice({
    name: 'CajasSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCajasList.fulfilled, (state: any, action: any) => {
            state.cajasList = action.payload.data;
            state.isCajasSuccess = true;
            state.isCajasCreated = true;
        });
        builder.addCase(getCajasList.rejected, (state: any, action: any) => {
            state.error = action.error;
            state.isCajasSuccess = false;
            state.isCajasCreated = false;
        });

        builder.addCase(addNewCajas.fulfilled, (state: any, action: any) => {
            state.cajasList.push(action.payload.data);
            state.isCajasCreated = true;
            state.isCajasAdd = true;
            state.isCajasAddFail = false;
        });
        builder.addCase(addNewCajas.rejected, (state: any, action: any) => {
            state.error = action.error;
            state.isCajasAdd = false;
            state.isCajasAddFail = true;
        });
        builder.addCase(updateCajas.fulfilled, (state: any, action: any) => {
            state.cajasList = state.cajasList.map((cajas: any) =>
                cajas.id_cajas.toString() === action.payload.id_cajas
                    ? { ...cajas, ...action.payload.data }
                    : cajas
            );
            state.isCajasUpdate = true;
            state.isCajasUpdateFail = false;
        });
        builder.addCase(updateCajas.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isCajasUpdate = false;
            state.isCajasUpdateFail = true;
        });
        builder.addCase(deleteCajas.fulfilled, (state: any, action: any) => {
            state.cajasList = state.cajasList.filter((cajas: any) => cajas.id_caja_diaria !== action.payload.cajas);
            state.isCajasDelete = true;
            state.isCajasDeleteFail = false;
        });
        builder.addCase(deleteCajas.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isCajasDelete = false;
            state.isCajasDeleteFail = true;
        });
    }
});
export default CajasSlice.reducer;