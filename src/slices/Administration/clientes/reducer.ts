import { createSlice } from "@reduxjs/toolkit";
import { getClientesList, addNewClientes, updateClientes, deleteClientes } from './thunk';
export const initialState = {
    clientesList: [],
    clientesList2: 'hola001',
    error: null,
    isClientesCreated: false,
    isClientesSuccess: false,
    isClientesAdd: false,
    isClientesAddFail: false,
    isClientesUpdate: false,
    isClientesUpdateFail: false,
    isClientesDelete: false,
    isClientesDeleteFail: false,
};

const ClientesSlice = createSlice({
    name: 'ClientesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClientesList.fulfilled, (state: any, action: any) => {
            state.clientesList = action.payload.data;
            state.isClientesCreated = false;
            state.isClientesSuccess = true;
        });
        builder.addCase(getClientesList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isClientesCreated = false;
            state.isClientesSuccess = true;
        });

        builder.addCase(addNewClientes.fulfilled, (state: any, action: any) => {
            state.clientesList.push(action.payload.data);
            state.isClientesCreated = true;
            state.isClientesAdd = true;
            state.isClientesAddFail = false;
        });
        builder.addCase(addNewClientes.rejected, (state: any, action: any) => {
            state.error = action.error;
            state.isClientesAdd = false;
            state.isClientesAddFail = true;
        });
        builder.addCase(updateClientes.fulfilled, (state: any, action: any) => {
            state.clientesList = state.clientesList.map((clientes: any) =>
                clientes.id_clientes.toString() === action.payload.id_clientes
                    ? { ...clientes, ...action.payload.data }
                    : clientes
            );
            state.isClientesUpdate = true;
            state.isClientesUpdateFail = false;
        });
        builder.addCase(updateClientes.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isClientesUpdate = false;
            state.isClientesUpdateFail = true;
        });
        builder.addCase(deleteClientes.fulfilled, (state: any, action: any) => {
            state.clientesList = state.clientesList.filter((clientes: any) => clientes.id_clientes.toString() !== action.payload.clientes.toString());
            state.isClientesDelete = true;
            state.isClientesDeleteFail = false;
        });
        builder.addCase(deleteClientes.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isClientesDelete = false;
            state.isClientesDeleteFail = true;
        });
    }
});

export default ClientesSlice.reducer;