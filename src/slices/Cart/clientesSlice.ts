import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface clientesState {
    idcliente: number,
    client: Object,
    methodPayment: string,
    typeDocuemnt: string,
    total: number,
}
const initialState: clientesState = {
    idcliente: 11,
    client: {},
    methodPayment: '',
    typeDocuemnt: '',
    total: 0,
}
const clientesSlice = createSlice({
    name: 'clientes',
    initialState,
    reducers: {
        setClientes(state, action: PayloadAction<number>) {
            console.log('slices clientes', action.payload)
            state.idcliente = action.payload
        },
        setObjClientes(state, action: PayloadAction<Object>) {
            console.log('second', action.payload)
            state.client = action.payload
        },
        setTypeDocument(state, action: PayloadAction<string>) {
            console.log('third', action.payload)
            state.typeDocuemnt = action.payload
        },
        setTotalBillings(state, action: PayloadAction<number>) {
            console.log('four', action.payload)
            state.total = action.payload
        },
        setIDCliente(state, action: PayloadAction<number>) {
            console.log('cliente slice', action.payload)
            state.idcliente = action.payload
        }
    }
})
export const { setClientes, setObjClientes, setTypeDocument, setTotalBillings, setIDCliente } = clientesSlice.actions
export default clientesSlice.reducer