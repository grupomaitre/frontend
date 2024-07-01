import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface tecladoState {
    onCuenta: boolean
    onUserName: boolean
    onCantidad: boolean
    onProducto: boolean
    onPax: boolean
    onModal: boolean

    inputCuenta: any
    inputUserName: any
    inputCanitdad: any
    inputProducto: any
    inputPax: any
    //test mesa cambio contador
    count: number
}
const initialState: tecladoState = {
    inputCuenta: 'bar1',
    inputUserName: '',
    inputCanitdad: '',
    inputProducto: '',
    inputPax: '',
    onCuenta: false,
    onUserName: true,
    onCantidad: false,
    onProducto: false,
    onPax: false,
    //test mesa cambio contador
    count: 0,
    onModal: true
}
const tecladoSlice = createSlice({
    name: 'teclado',
    initialState,
    reducers: {
        setInputCuenta(state, action: PayloadAction<any>) {
            state.inputCuenta = action.payload

        },
        setInputUserName(state, action: PayloadAction<any>) {
            state.inputUserName = action.payload

        },
        setInputCanitdad(state, action: PayloadAction<any>) {
            state.inputCanitdad = action.payload

        },
        clearCuenta(state) {
            state.inputCuenta = ''
        },
        setPaxTeclado(state, action: PayloadAction<any>) {
            state.onPax = action.payload
        },
        setOncantidad(state, action: PayloadAction<any>) {
            console.log(action.payload)
            state.onCantidad = action.payload
        },
        //cambio de mesa test borrar
        setCount(state, action: PayloadAction<any>) {
            state.count = action.payload
        },
        setCuentaKey(state, action: PayloadAction<any>) {
            state.onCuenta = action.payload
        },
        setOnUserName(state, action: PayloadAction<any>) {
            state.onUserName = action.payload
        },
        setOnCantidad(state, action: PayloadAction<any>) {
            state.onCantidad = action.payload
        },
        setOnProducto(state, action: PayloadAction<any>) {
            state.onProducto = action.payload
        },
        setOnModal(state, action: PayloadAction<any>) {
            state.onModal = action.payload
        }

    }

})

export const {
    setInputCanitdad, setInputCuenta, setInputUserName,
    clearCuenta,
    setPaxTeclado,
    setOncantidad,
    setCount,
    setCuentaKey,
    setOnUserName,
    setOnModal,
} = tecladoSlice.actions
export default tecladoSlice.reducer