import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRubrosList, addNewRubros, updateRubros, deleteRubros } from './thunk';
export const initialState: any = {
    IDtipoRubro: 0,
    rubrosList: [],
    error: []
};

const rubrosSlice = createSlice({
    name: 'rubrosSlice',
    initialState,
    reducers: {
        setRubrosList: (state, action: any) => {
            state.rubrosList = action.payload;
        },
        setIDTipoRubro: (state: any, action: PayloadAction<number>) => {
            state.IDtipoRubro = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRubrosList.fulfilled, (state: any, action: any) => {
            state.rubrosList = action.payload.data;
            state.isrubrosCreated = false;
            state.isrubrosSuccess = true;
        });
        builder.addCase(getRubrosList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isrubrosCreated = false;
            state.isrubrosSuccess = true;
        });

        builder.addCase(addNewRubros.fulfilled, (state: any, action: any) => {
            state.rubrosList.push(action.payload.data);
            state.isrubrosCreated = true;
            state.isrubrosAdd = true;
            state.isrubrosAddFail = false;
        });
        builder.addCase(addNewRubros.rejected, (state: any, action: any) => {
            state.error = action.error;
            state.isrubrosAdd = false;
            state.isrubrosAddFail = true;
        });
        builder.addCase(updateRubros.fulfilled, (state: any, action: any) => {
            state.rubrosList = state.rubrosList.map((rubros: any) =>
                rubros.id_rubro === action.payload.data.id_rubro
                    ? { ...rubros, ...action.payload.data }
                    : rubros
            );
            state.isrubrosUpdate = true;
            state.isrubrosUpdateFail = false;
        });
        builder.addCase(updateRubros.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isrubrosUpdate = false;
            state.isrubrosUpdateFail = true;
        });
        builder.addCase(deleteRubros.fulfilled, (state: any, action: any) => {
            state.rubrosList = state.rubrosList.filter((rubros: any) => rubros.id_rubro !== action.payload.rubros);
            state.isrubrosDelete = true;
            state.isrubrosDeleteFail = false;
            state.isrubrosDeleteSuccess = true;
        });
        builder.addCase(deleteRubros.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isrubrosDelete = false;
            state.isrubrosDeleteFail = true;
            state.isrubrosDeleteSuccess = true;
        });
    }
});

export const { setRubrosList, setIDTipoRubro } = rubrosSlice.actions
export default rubrosSlice.reducer;
