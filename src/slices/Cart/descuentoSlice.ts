import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface cajaState {
    descuentoCart: boolean
    totalDescuentoCart: number
}
const initialState: cajaState = {
    descuentoCart: false,
    totalDescuentoCart: 0,
}
const descuentoSlice = createSlice({
    name: 'descuentoSlice',
    initialState,
    reducers: {
        setDescuentoCart(state, action: PayloadAction<boolean>) {
            state.descuentoCart = action.payload
        },
        setDecuentoTotal(state, action: PayloadAction<number>) {
            state.totalDescuentoCart = action.payload
        },
    }
})
export const { setDescuentoCart } = descuentoSlice.actions
export default descuentoSlice.reducer