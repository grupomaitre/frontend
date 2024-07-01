import { createSlice } from "@reduxjs/toolkit";
import { getSubRubrosList, addNewSubRubros, updateSubRubros, deleteSubRubros } from './thunk';
export const initialState = {
    subRubrosList: [],
    error: null
};

const subRubrosSlice = createSlice({
    name: 'subRubrosSlice',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getSubRubrosList.fulfilled, (state, action) => {
            state.subRubrosList = action.payload.data;
            state.issubRubrosCreated = false;
            state.issubRubrosSuccess = true;
        });
        builder.addCase(getSubRubrosList.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.issubRubrosCreated = false;
            state.issubRubrosSuccess = true;
        });

        builder.addCase(addNewSubRubros.fulfilled, (state, action) => {
            state.subRubrosList.push(action.payload.data);
            state.issubRubrosCreated = true;
            state.issubRubrosAdd = true;
            state.issubRubrosAddFail = false;
        });
        builder.addCase(addNewSubRubros.rejected, (state, action) => {
            state.error = action.error || null;
            state.issubRubrosAdd = false;
            state.issubRubrosAddFail = true;
        });
        builder.addCase(updateSubRubros.fulfilled, (state, action) => {
            state.subRubrosList = state.subRubrosList.map(subRubros =>
                subRubros._id.toString() === action.payload.data._id.toString()
                    ? { ...subRubros, ...action.payload.data }
                    : subRubros
            );
            state.issubRubrosUpdate = true;
            state.issubRubrosUpdateFail = false;
        });
        builder.addCase(updateSubRubros.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.issubRubrosUpdate = false;
            state.issubRubrosUpdateFail = true;
        });
        builder.addCase(deleteSubRubros.fulfilled, (state, action) => {
            // state.subRubrosList = state.subRubrosList.filter(subRubros => subRubros._id.toString() !== action.payload.subRubros.toString());
            state.issubRubrosDelete = true;
            state.issubRubrosDeleteFail = false;
        });
        builder.addCase(deleteSubRubros.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.issubRubrosDelete = false;
            state.issubRubrosDeleteFail = true;
        });
    }
});

export default subRubrosSlice.reducer;