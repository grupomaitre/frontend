import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MesaState {
    mesa: any[];
}

const initialState: MesaState = {
    mesa: [],
};

const mesaSlice = createSlice({
    name: 'mesa',
    initialState,
    reducers: {
        setMesa(state, action: PayloadAction<any[]>) {
            state.mesa = action.payload;
        },
    },
});

export const { setMesa } = mesaSlice.actions;

export default mesaSlice.reducer;
