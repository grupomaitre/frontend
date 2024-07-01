import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SwalSuccess, SwalError } from "../../Components/Common/Swals/SwalsApi";
import {
    getUsersList as getUsersListApi,
    addNewUsers as addNewUsersApi,
    updateUsers as updateUsersApi,
    deleteUsers as deleteUsersApi,
} from "../../helpers/fakebackend_helper";

export const getUsersList = createAsyncThunk("users/getUsersList", async (user) => {
    try {
        const response = await getUsersListApi(user);
        return response;
    } catch (error) {
        return error;
    }
});
export const addNewUsers = createAsyncThunk("users/addNewUsers", async (user) => {

    try {
        const response = await addNewUsersApi(user);
        SwalSuccess({ title: "Usuario creado con exito" })
        return response;
    } catch (error) {
        SwalError({ title: error, text: 'Error al crear usuario' })
        throw error;
    }
});




export const updateUsers = createAsyncThunk("users/updateUsers", async (user) => {
    try {
        const response = updateUsersApi(user);
        toast.success("Editado con extio", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Falllo al editar", { autoClose: 3000 });
        return error;
    }
});

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (user) => {
    try {
        const response = deleteUsersApi(user);
        toast.success("Borrado con exito", { autoClose: 3000 });
        return { user, ...response };
    } catch (error) {
        toast.error("Fallo al borrar", { autoClose: 3000 });
        return error;
    }
});