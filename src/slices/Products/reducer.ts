import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { getProductsList, addNewProducts, updateProducts, deleteProducts } from './thunk';
interface IProducts {
    productsList: any[];
    error: any;
    isProductsCreated: boolean;
    isProductsSuccess: boolean;
    isProductsAdd: boolean;
    isProductsAddFail: boolean;
    isProductsUpdate: boolean;
    isProductsUpdateFail: boolean;
    isProductsDelete: boolean;
    isProductsDeleteFail: boolean;
}

const initialState: IProducts = {
    productsList: [],
    error: null,
    isProductsCreated: false,
    isProductsSuccess: false,
    isProductsAdd: false,
    isProductsAddFail: false,
    isProductsUpdate: false,
    isProductsUpdateFail: false,
    isProductsDelete: false,
    isProductsDeleteFail: false,

};

const ProductsSlice = createSlice({
    name: 'ProductsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsList.fulfilled, (state: any, action: any) => {
            state.productsList = action.payload.data;
            state.isProductsCreated = false;
            state.isProductsSuccess = true;
        });
        builder.addCase(getProductsList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isProductsCreated = false;
            state.isProductsSuccess = true;
        });
        builder.addCase(
            addNewProducts.fulfilled,
            (state, action: PayloadAction<AxiosResponse<any, any>>) => {
                state.productsList.push(action.payload.data);
                state.isProductsCreated = true;
                state.isProductsAdd = true;
                state.isProductsAddFail = false;
            }
        );
        /* 
                builder.addCase(addNewProducts.fulfilled, (state: any, action: any) => {
                    state.productsList.push(action.payload.data);
                    state.isProductsCreated = true;
                    state.isProductsAdd = true;
                    state.isProductsAddFail = false;
                }); */
        builder.addCase(addNewProducts.rejected, (state: any, action: any) => {
            state.error = action.error;
            state.isProductsAdd = false;
            state.isProductsAddFail = true;
        });
        builder.addCase(updateProducts.fulfilled, (state: any, action: any) => {
            state.productsList = state.productsList.map((products: any) =>
                products.id_sucursal.toString() === action.payload.id_sucursal
                    ? { ...products, ...action.payload.data }
                    : products
            );
            state.isProductsUpdate = true;
            state.isProductsUpdateFail = false;
        });
        builder.addCase(updateProducts.rejected, (state: any, action: any) => {
            state.error = action.error || null;
            state.isProductsUpdate = false;
            state.isProductsUpdateFail = true;
        });
        builder.addCase(deleteProducts.fulfilled, (state: any, action: any) => {
            state.productsList = state.productsList.filter((products: any) => products.id_sucursal.toString() !== action.payload.products.toString());
            state.isProductsDelete = true;
            state.isProductsDeleteFail = false;
        });
        builder.addCase(deleteProducts.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isProductsDelete = false;
            state.isProductsDeleteFail = true;
        });
    }
});

export default ProductsSlice.reducer;