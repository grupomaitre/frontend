import { createSlice } from '@reduxjs/toolkit'
interface cuentaState {
    cartNew: any[],
    statusCobrar: boolean
}
const initialState: cuentaState = {
    cartNew: [],
    statusCobrar: false

}
const cuentaSlice = createSlice({
    name: 'cuenta',
    initialState,
    reducers: {
        addCuenta(state: any, action: any) {
            const producto = action.payload;
            console.log(producto)
            // Verificar si el objeto producto está vacío o si no se ha proporcionado una carga útil
            if (!producto || Object.keys(producto).length === 0) {
                // No hacer nada si el objeto producto está vacío o no se proporciona ninguna carga útil
                return state;
            }

            const index = state.cartNew.findIndex((x: any) => x.nombre === producto.nombre);

            if (index !== -1) {
                state.cartNew[index].cantidad += 1;
            } else {
                state.cartNew = [...state.cartNew, { ...producto, cantidad: 1, status: false }];
            }
        },
        /*         addCuenta(state: any, action: any) {
                    const producto = action.payload
                    console.log(producto)
                    const index = state.cartNew.findIndex((x: any) => x.nombre === producto.nombre)
                    if (index !== -1) {
                        state.cartNew[index].cantidad += 1
                    } else {
                        state.cartNew = [...state.cartNew, { ...producto, cantidad: 1, status: false }]
                    }
                }, */
        setNewCartCuenta(state, action: any) {
            console.log(action.payload)
            state.cartNew = action.payload
        },
        removeCuenta(state: any, action: any) {
            const producto = action.payload
            const index = state.cartNew.findIndex((x: any) => x.nombre === producto.nombre)
            if (index !== -1) {
                if (state.cartNew[index].cantidad === 1) {
                    state.cartNew.splice(index, 1)
                } else {
                    state.cartNew[index].cantidad -= 1
                }
            }
        },
        updateQuantity(state: any, action: any) {
            const { index, quantity } = action.payload
            state.cartNew[index].cantidad = quantity
        },
        clearCuenta(state: any) {
            state.cartNew = []
        },
        setStatusCobrar(state: any, action: any) {
            console.log(action.payload)
            state.statusCobrar = action.payload
        }

    },

})
export const {
    addCuenta,
    removeCuenta,
    updateQuantity,
    clearCuenta,
    setStatusCobrar,
    setNewCartCuenta

} = cuentaSlice.actions
export default cuentaSlice.reducer

