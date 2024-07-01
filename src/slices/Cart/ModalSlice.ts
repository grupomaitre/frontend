import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface modalState {
    showMesaMap: boolean
}

const initialState: modalState = {
    showMesaMap: false
}
const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        setModalMesaMap(state, action: PayloadAction<any>) {
            state.showMesaMap = action.payload
        },

    }
})

export const { setModalMesaMap } = modalSlice.actions
export default modalSlice.reducer