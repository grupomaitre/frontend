import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
interface cartState {
    cart: any[]
    mesa: any[]
    selectMesa: boolean
    mesacart: string
    idMesa: number
    idCart: number
    id_user: number
    idOrder: number
    isCartSuccess: boolean
    pax: number
    orden: any
    producto: any
    quantity2: string | number
    tempProduct: any
    cartPrueba: any[]
    vendedor: string
    isErrorCart: boolean
    isAddCartSuccess: boolean
    totalTest: string
    onDescuento: boolean
    loading: false,
    error: null,
    isPreference: boolean
    valorDescuento: number

}
/* interface Imesa {
    id_mesa: number
} */
const initialState: cartState = {
    cart: [],
    mesa: [],
    selectMesa: false,
    mesacart: '',
    idMesa: 0,
    idCart: 0,
    id_user: 0,
    idOrder: 0,
    isCartSuccess: false,
    pax: 0,
    orden: null,
    producto: {},
    quantity2: '1',
    tempProduct: {},
    cartPrueba: [],
    vendedor: '',
    isErrorCart: false,
    isAddCartSuccess: false,
    totalTest: '0',
    loading: false,
    error: null,
    onDescuento: false,
    isPreference: false,
    valorDescuento: 1000

}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setVendedorSlice(state, action: PayloadAction<string>) {
            state.vendedor = action.payload
        },

        setProduct(state, action: PayloadAction<any>) {
            state.producto = action.payload
        },

        setIsCartSuccess(state, action: PayloadAction<boolean>) {
            state.isCartSuccess = action.payload
        },
        //set isPreference
        setIsPreference(state, action: PayloadAction<boolean>) {
            state.isPreference = action.payload || true
        },
        setIDCart(state, action: PayloadAction<number>) {
            state.idCart = action.payload
        },

        setIDUser(state, action: PayloadAction<number>) {
            state.id_user = action.payload
        },

        clearIDUser(state) {
            state.id_user = 0
        },

        clearIdCart(state) {
            state.idCart = 0
        },
        setNewCart(state, action: PayloadAction<any>) {
            state.cart = action.payload
        },
        addOrden(state, action: PayloadAction<any>) {
            state.orden = action.payload
        },
        setIdOrder(state, action: PayloadAction<number>) {
            state.idOrder = action.payload
        },
        addMesa(state, action: PayloadAction<any>) {
            state.mesacart = action.payload
        },
        setIdMesa(state, action: PayloadAction<any>) {
            state.idMesa = action.payload
        },

        addPax(state, action: PayloadAction<number>) {
            state.pax = action.payload
        },
        setQuantity2(state, action: PayloadAction<any>) {
            state.quantity2 = action.payload
        },
        setDescuento(state, action: PayloadAction<number>) {
            console.log(action.payload)
            state.valorDescuento = action.payload
        },

        setTempProduct(state, action: PayloadAction<any>) {
            state.tempProduct = action.payload
        },
        /*         addCartPrueba(state, action: PayloadAction<any>) {
                    const producto = action.payload
                    const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle)
                    if (index !== -1) {
                        state.cart[index].cantidad += 1;
                    } else {
                        state.cart = [...state.cart, { ...producto, cantidad: 1 }];
                    }
                }, */
        addCartPrueba(state, action: PayloadAction<any>) {
            const producto = action.payload;
            console.log(producto)
            // Verificar si el objeto producto está vacío o si no se ha proporcionado una carga útil
            if (!producto || Object.keys(producto).length === 0) {
                // No hacer nada si el objeto producto está vacío o no se proporciona ninguna carga útil
                return state;
            }

            const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle);

            if (index !== -1) {
                state.cart[index].cantidad += 1;
            } else {
                state.cart = [...state.cart, { ...producto, cantidad: 1 }];
            }
        },
        onErrorCart(state, action: PayloadAction<boolean>) {
            state.isErrorCart = action.payload
        },
        addCart(state: any, action: PayloadAction<any>) {
            const producto = action.payload;
            if (producto && Object.keys(producto).length > 0) {
                state.cart.push({
                    ...producto,
                    isCartSuccess: state.isCartSuccess = false,
                    cantidad: parseInt(state.quantity2) || 1,
                    preference: false,
                    descuento: 0,
                    uuid_detalle: uuidv4()
                })
                state.quantity2 = ''
                state.tempProduct = {}
                state.isAddCartSuccess = true

            } else {
                state.isErrorCart = true
                state.isAddCartSuccess = false
            }

        },
        //add preference cart
        addPreferences(state: any, action: PayloadAction<any>) {
            const { item, preferences } = action.payload;
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === item.uuid_detalle);
            if (index !== -1) {
                state.cart[index] = { ...state.cart[index], preferences: preferences, preference: true };
            } else {
                state.cart = [...state.cart, { ...item, preferences: preferences }];
            }
        },
        //set column descuento
        addNewDescuento(state, action: PayloadAction<any>) {

            const { item, descuento } = action.payload
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === item.uuid_detalle);
            if (index !== -1) {
                state.cart[index].descuento = descuento;
            } else {
                state.cart = [...state.cart, { ...item, descuento: descuento }];
            }


        },
        //all descuento cart
        addCartDescAll(state, action: PayloadAction<any>) {
            const { items, descuento } = action.payload; // Cambié item por items para que sea más claro que es un array de elementos
            console.log('items cartslic??', items)
            items.forEach((itemToUpdate: any) => {
                const index = state.cart.findIndex((x: any) => x.uuid_detalle === itemToUpdate.uuid_detalle);
                if (index !== -1) {
                    // Si el ítem ya está en el carrito, se actualiza el descuento
                    state.cart[index].descuento = descuento;
                } else {
                    // Si el ítem no está en el carrito, se añade con el descuento
                    state.cart.push({ ...itemToUpdate, descuento });
                }
            });
        },
        addCartDescAll2(state, action: PayloadAction<any>) {

            const { items, descuento, tipodescuento } = action.payload
            console.log(tipodescuento)
            items.map((indexItem: any) => {
                const uiID = state.cart.find((x: any) => x.uuid_detalle === indexItem.uuid_detalle);
                const totalDesc = (uiID?.cantidad * uiID?.precio)

                const index = state.cart.findIndex((x: any) => x.uuid_detalle === indexItem.uuid_detalle)
                if (index !== -1) {

                    //     state.cart[index].descuento = Math.round((totalDesc * descuento / 100) * 100) / 100

                    state.cart[index].descuento = totalDesc * descuento / 100
                } else {
                    state.cart = [...state.cart, { ...items, descuento: descuento }];
                }
            }
            )


        },
        setisAddCartSuccess(state: any, action: PayloadAction<boolean>) {
            state.isAddCartSuccess = action.payload
        },

        removeCart(state: any, action: PayloadAction<any>) {
            const producto = action.payload;
            // const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre);
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle);

            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },

        removeCartItem(state: any, action: PayloadAction<any>) {
            const { producto, cantidad } = action.payload;
            // Encuentra el índice del elemento que cumple con las condiciones.
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle && x.isCartSuccess === false);
            if (index !== -1) {
                // Si se encuentra el elemento, actualiza la cantidad o elimina el elemento si la cantidad es menor o igual a 1.
                if (state.cart[index].cantidad > cantidad) {
                    state.cart[index].cantidad -= cantidad;
                } else {
                    state.cart.splice(index, 1);
                }
            }
        },

        minusCart(state: any, action: PayloadAction<any>) {
            const producto = action.payload;
            const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre);
            //     const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle);
            if (index !== -1) {
                if (state.cart[index].cantidad === 1) {
                    state.cart.splice(index, 1); // Remover el item del carrito si la cantidad llega a 0
                } else {
                    state.cart[index].cantidad -= 1;
                }
            }
        },


        remove(state: any, action: PayloadAction<any>) {
            const producto = action.payload
            //   const index = state.cart.findIndex((x: any) => x.nombre === producto.nombre)
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === producto.uuid_detalle);

            if (index !== -1) {
                state.cart.splice(index, 1)
            } else {
                state.cart = [...state.cart, { ...producto, cantidad: 1 }];

            }
        },
        clearCart(state: any) {
            state.cart = []
        },
        clearPax(state: any) {
            state.pax = 0
        },
        clearMesa(state: string | any) {
            state.mesacart = ''
        },
        clearIDMesa(state: any, action: PayloadAction<any>) {
            state.idMesa = action.payload
        },
        updateQuantity(state: any, action: PayloadAction<any>) {
            const { item, quantity } = action.payload
            /*   state.cart = [...state.cart, { ...item, cantidad: quantity }];
              return */
            const index = state.cart.findIndex((x: any) => {
                x.uuid_detalle === item.uuid_detalle && x.isCartSuccess === true
            })
            if (index !== -1) {
                state.cart[index].cantidad = quantity
            }

        },
        updateQuantityItem(state: any, action: PayloadAction<any>) {
            const { item, quantity } = action.payload;
            const index = state.cart.findIndex((x: any) => x.uuid_detalle === item.uuid_detalle);

            if (index !== -1) {
                const currentItem = state.cart[index];
                state.cart[index].cantidad = currentItem.cantidad >= quantity ? currentItem.cantidad - quantity : quantity;
            } else {
                state.cart = [...state.cart, { ...item, cantidad: quantity }];
            }
        },
        //set total test
        setTotalTest(state, action: PayloadAction<string>) {
            state.totalTest = action.payload
        },
        isDescuento(state, action: PayloadAction<boolean>) {
            state.onDescuento = action.payload
        }

    },
})
export const {
    addCart,
    setQuantity2,
    setTotalTest,
    addCartPrueba,
    setTempProduct,
    minusCart,
    remove, removeCartItem,
    setIDUser, clearIDUser,
    clearCart,
    clearIdCart,
    updateQuantity,
    updateQuantityItem,
    addMesa,
    addPax,
    clearPax,
    clearMesa,
    clearIDMesa,
    setIdMesa,
    addOrden,
    setNewCart,
    setIDCart,
    setIdOrder,
    setIsCartSuccess,
    setProduct,
    removeCart,
    setVendedorSlice,
    onErrorCart,
    isDescuento,
    setisAddCartSuccess,
    addPreferences,
    setIsPreference,
    setDescuento,
    addNewDescuento,
    addCartDescAll,
    addCartDescAll2
} = cartSlice.actions

export const calculateCartTotal = (cart: any) => {
    return cart.reduce((acc: any, item: any) => acc + parseFloat(item.total), 0)
}

export default cartSlice.reducer



