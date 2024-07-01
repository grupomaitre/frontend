import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

interface cartState {
    cart: any[]
    quantity: number
    clientePos: {}

}

const initialState: cartState = {
    cart: [],
    quantity: 1,
    clientePos: {}

}

const pointSaleSlice = createSlice({
    name: 'pointSaleSlice',
    initialState,
    reducers: {
        addCartPos(state: any, action: PayloadAction<any>) {
            const producto = action.payload;
            const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre);
            if (index !== -1) {
                state.cart[index].cantidad += state.quantity || 1;
            } else {
                state.cart = [...state.cart, {
                    ...producto,
                    cantidad: parseInt(state.quantity) || 1,
                    uuid_detalle: uuidv4(),
                }];
            }
        },
        setQuantityPos(state, action: PayloadAction<number>) {
            state.quantity = action.payload
        },
        clearCartPos(state: any) {
            state.cart = []
        },
        removeCartPos(state: any, action: PayloadAction<any>) {
            const producto = action.payload;
            // const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre);
            const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre);

            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        removeCartItemPos(state: any, action: PayloadAction<any>) {
            const { producto, cantidad } = action.payload;
            // Encuentra el índice del elemento que cumple con las condiciones.
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle);
            if (index !== -1) {
                // Si se encuentra el elemento, actualiza la cantidad o elimina el elemento si la cantidad es menor o igual a 1.
                if (state.cart[index].cantidad > cantidad) {
                    state.cart[index].cantidad -= cantidad;
                } else {
                    state.cart.splice(index, 1);
                }
            }
        },
        //set cliente
        setClientePos(state: any, action: any) {
            const cliente = action.payload
            state.clientePos = cliente
        },
        addNewDescPos(state, action: PayloadAction<any>) {

            const { item, descuento } = action.payload
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === item.uuid_detalle);
            if (index !== -1) {
                state.cart[index].descuento = descuento;
            } else {
                state.cart = [...state.cart, { ...item, descuento: descuento }];
            }


        },
    }

})


export const {
    addCartPos,
    setQuantityPos,
    clearCartPos,
    removeCartPos,
    removeCartItemPos,
    setClientePos,
    addNewDescPos

} = pointSaleSlice.actions

export default pointSaleSlice.reducer