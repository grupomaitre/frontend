import { createSlice } from '@reduxjs/toolkit'
interface layoutPosState {
    bgMenuPos: string,
    bgItemsMenuPos: string,
    bgCategorias: string,
    bgItemsCategorias: string,
    bgSubCategorias: string,
    bgItemsSubCategorias: string,
    bgCardOrden: string,
    bgItemsCardOrden: string,
    bgProductos: string,
    bgItemsProductos: string,
}

const initialState: layoutPosState = {
    bgMenuPos: 'bg-gray-800',
    bgItemsMenuPos: 'bg-gray-700',
    bgCategorias: 'bg-gray-800',
    bgItemsCategorias: 'bg-gray-700',
    bgSubCategorias: 'bg-gray-800',
    bgItemsSubCategorias: 'bg-gray-700',
    bgCardOrden: 'bg-gray-800',
    bgItemsCardOrden: 'bg-gray-700',
    bgProductos: 'bg-gray-800',
    bgItemsProductos: 'bg-gray-700',
}

const layoutPosSlice = createSlice({
    name: 'layoutPosSlice',
    initialState,
    reducers: {
        changeBgMenuPos(state: any, action: any) {
            const color = action.payload
            state.bgMenuPos = color
        },
        changeBgItemsMenuPos(state: any, action: any) {
            const color = action.payload
            state.bgItemsMenuPos = color
        },
        changeBgCategorias(state: any, action: any) {
            const color = action.payload
            state.bgCategorias = color
        },
        changeBgItemsCategorias(state: any, action: any) {
            const color = action.payload
            state.bgItemsCategorias = color
        },
        changeBgSubCategorias(state: any, action: any) {
            const color = action.payload
            state.bgSubCategorias = color
        },
        changeBgItemsSubCategorias(state: any, action: any) {
            const color = action.payload
            state.bgItemsSubCategorias = color
        },
        changeBgCardOrden(state: any, action: any) {
            const color = action.payload
            state.bgCardOrden = color
        },
        changeBgItemsCardOrden(state: any, action: any) {
            const color = action.payload
            state.bgItemsCardOrden = color
        },
        changeBgProductos(state: any, action: any) {
            const color = action.payload
            state.bgProductos = color
        },
        changeBgItemsProductos(state: any, action: any) {
            const color = action.payload
            state.bgItemsProductos = color
        },
    },
})
export const {
    changeBgMenuPos,
    changeBgItemsMenuPos,
    changeBgCategorias,
    changeBgItemsCategorias,
    changeBgSubCategorias,
    changeBgItemsSubCategorias,
    changeBgCardOrden,
    changeBgItemsCardOrden,
    changeBgProductos,
    changeBgItemsProductos,
} = layoutPosSlice.actions
export default layoutPosSlice.reducer


