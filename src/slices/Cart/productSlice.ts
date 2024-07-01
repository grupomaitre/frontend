import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProducts } from '../../Pages/Pos/Interfaces/InterfaceGroups'

interface productoState {
    productSliceList: Array<IProducts>,
    selectedProduct: any
}

const initialState: productoState = {
    productSliceList: [],
    selectedProduct: {}
}
const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProductList(state, action: PayloadAction<any>) {
            state.productSliceList = action.payload
        },
        setSelectedProduct(state, action: PayloadAction<any>) {
            state.selectedProduct = action.payload
        }
    }
})

export const { setProductList, setSelectedProduct } = productSlice.actions
export default productSlice.reducer