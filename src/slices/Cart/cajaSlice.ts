import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface cajaState {
    caja: number
    cajaData: []
    cajaObj: {}
}
const initialState: cajaState = {
    caja: 0,
    cajaData: [],
    cajaObj: {}
}
const cajaSlice = createSlice({
    name: 'caja',
    initialState,
    reducers: {
        setCaja(state, action: PayloadAction<number>) {
            state.caja = action.payload
        },

        setDataCaja(state, actions: PayloadAction<any>) {
            state.cajaData = actions.payload
        },

        setCajaObj(state, actions: PayloadAction<any>) {
            state.cajaObj = actions.payload
        },
    }
})
export const { setCaja, setDataCaja, setCajaObj } = cajaSlice.actions
export default cajaSlice.reducer