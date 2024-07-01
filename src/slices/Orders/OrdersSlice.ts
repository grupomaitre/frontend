import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface IOrderSlice {
    id_efectivo: number,
    id_cheque: number,
    id_tarjeta: number,
    id_deposito: number,
    valueEfectivo: number | string
    valueCheque: number
    valueTarjeta: number
    valueDeposito: number
    subFinal: number
    iva: number
    servicio: number
}

const initialState: IOrderSlice = {
    id_efectivo: 0,
    id_cheque: 0,
    id_tarjeta: 0,
    id_deposito: 0,
    valueEfectivo: 0,
    valueCheque: 0,
    valueTarjeta: 0,
    valueDeposito: 0,
    subFinal: 0,
    iva: 0,
    servicio: 0
}

const ordersSlice = createSlice({
    name: 'Orders',
    initialState,
    reducers: {

        setIDEfectivo(state: any, action: PayloadAction<number>) {
            state.id_efectivo = action.payload
        },

        setIDCheque(state: any, action: PayloadAction<number>) {
            state.id_cheque = action.payload
        },

        setIDTarjeta(state: any, action: PayloadAction<number>) {
            state.id_tarjeta = action.payload
        },

        setIDDeposito(state: any, action: PayloadAction<number>) {
            state.id_deposito = action.payload
        },

        setValueEfectivo(state: any, action: PayloadAction<number | string>) {
            state.valueEfectivo = action.payload
        },

        setValueCheque(state: any, action: PayloadAction<number>) {
            state.valueCheque = action.payload
        },

        setValueTarjeta(state: any, action: PayloadAction<number>) {
            state.valueTarjeta = action.payload
        },

        setValueDeposito(state: any, action: PayloadAction) {
            state.valueDeposito = action.payload
        },

        setSubfinal(state: any, action: PayloadAction<number>) {
            state.subFinal = action.payload
        },

        setIva(state: any, action: PayloadAction<number>) {
            state.iva = action.payload
        },
        setServicio(state: any, action: PayloadAction<number>) {
            state.servicio = action.payload
        }
    }
})

export const {
    setIDEfectivo,
    setIDCheque,
    setIDDeposito,
    setIDTarjeta,
    setSubfinal,
    setIva,
    setServicio,
    setValueEfectivo,
    setValueCheque,
    setValueTarjeta,
    setValueDeposito

} = ordersSlice.actions
export default ordersSlice.reducer