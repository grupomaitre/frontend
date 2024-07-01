import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    getProductsList as getProductsListApi,
    addNewProducts as addNewProductsApi,
    updateProducts as updateProductsApi,
    deleteProducts as deleteProductsApi,
} from "../../helpers/fakebackend_helper";
import { SwalError, SwalSuccess } from "../../Components/Common/Swals/SwalsApi";

export const getProductsList = createAsyncThunk("Products/getProductsList", async () => {
    try {
        const response = getProductsListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addNewProducts = createAsyncThunk<any>("Products/addNewProducts", async (products) => {

    try {
        const response = await addNewProductsApi(products);
        SwalSuccess({ title: "Guardado con exito" })
        return response;
    } catch (error) {
        SwalError({ title: error || "Fallo al guardar" })
        throw error;
    }
});


export const updateProducts = createAsyncThunk("Products/updateProducts", async (products) => {
    try {
        const response = await updateProductsApi(products);
        console.log("response correcto", response)
        toast.success("Editado con extio", { autoClose: 3000 });
        return response;
    } catch (error) {
        console.log('errores', error)
        toast.error("Falllo al editar", { autoClose: 3000 });
        return error;
    }
});

export const deleteProducts = createAsyncThunk("Products/deleteProducts", async (products) => {
    try {
        const response = deleteProductsApi(products);
        toast.success("Borrado con exito", { autoClose: 3000 });
        return { products, ...response };
    } catch (error) {
        toast.error("Fallo al borrar", { autoClose: 3000 });
        return error;
    }
});