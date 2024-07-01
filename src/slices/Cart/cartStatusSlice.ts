import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface cartStatusState {
    tableNotfound: boolean
    cuentaSinItems: boolean
    openNewTable: boolean
    inputMesa: boolean
    inputVendedor: boolean
}

const initialState: cartStatusState = {
    tableNotfound: false,
    cuentaSinItems: false,
    openNewTable: false,
    inputMesa: false,
    inputVendedor: true


}
const cartStatusSlice = createSlice({
    name: "cuentaEstados",
    initialState,
    reducers: {
        setTableNotfound(state, action: PayloadAction<boolean>) {
            state.tableNotfound = action.payload
        },
        setCuentaSinItems(state, action: PayloadAction<boolean>) {
            state.cuentaSinItems = action.payload
        },
        setOpenNewTable(state, action: PayloadAction<boolean>) {
            state.openNewTable = action.payload
        },
        setInputMesa(state, action: PayloadAction<boolean>) {
            state.inputMesa = action.payload
        },
        setInputVendedor(state, action: PayloadAction<boolean>) {
            state.inputVendedor = action.payload
        }
    }
})
export const { setTableNotfound, setCuentaSinItems, setOpenNewTable, setInputMesa, setInputVendedor } = cartStatusSlice.actions
export default cartStatusSlice.reducer