import { createSlice } from "@reduxjs/toolkit";
import { getCuentasList, addNewCuentas, updateCuentas, deleteCuentas } from './thunk';
export const initialState = {
    cuentasList: [],
    error: {},
    isCuentasCreated: false,
    isCuentasSuccess: false,
    isCuentasAdd: false,
    isCuentasAddFail: false,
    isCuentasUpdate: false,
    isCuentasUpdateFail: false,
    isCuentasDelete: false,
    isCuentasDeleteFail: false,
    
};

const CuentasSlice = createSlice({
    name: 'CuentasSlice',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getCuentasList.fulfilled, (state, action) => {
            state.cuentasList = action.payload.data;
            state.isCuentasCreated = false;
            state.isCuentasSuccess = true;
        });
        builder.addCase(getCuentasList.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isCuentasCreated = false;
            state.isCuentasSuccess = true;
        });

        builder.addCase(addNewCuentas.fulfilled, (state, action) => {
            state.cuentasList.push(action.payload.data);
            state.isCuentasCreated = true;
            state.isCuentasAdd = true;
            state.isCuentasAddFail = false;
        });
        builder.addCase(addNewCuentas.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isCuentasAdd = false;
            state.isCuentasAddFail = true;
        });
        builder.addCase(updateCuentas.fulfilled, (state, action) => {
            state.cuentasList = state.cuentasList.map(cuentas =>
                cuentas.id_bodega.toString() === action.payload.id_bodega
                    ? { ...cuentas, ...action.payload.data }
                    : cuentas
            );
            state.isCuentasUpdate = true;
            state.isCuentasUpdateFail = false;
        });
        builder.addCase(updateCuentas.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isCuentasUpdate = false;
            state.isCuentasUpdateFail = true;
        });
        builder.addCase(deleteCuentas.fulfilled, (state, action) => {
            state.cuentasList = state.cuentasList.filter(cuentas => cuentas.id_bodega.toString() !== action.payload.cuentas.toString());
            state.isCuentasDelete = true;
            state.isCuentasDeleteFail = false;
        });
        builder.addCase(deleteCuentas.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isCuentasDelete = false;
            state.isCuentasDeleteFail = true;
        });
    }
});

export default CuentasSlice.reducer;