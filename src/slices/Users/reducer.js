import { createSlice } from "@reduxjs/toolkit";
import { getUsersList, addNewUsers, updateUsers, deleteUsers } from './thunks';
/* export const initialState = {
    usersList: [],
    error: null,
};
 */
const UsersSlice = createSlice({
    name: 'UsersSlice',
    initialState: {
        usersList: [],
        error: null,
        isUsersCreated: false,
        isUsersSuccess: false,
        isUsersAdd: false,
        isUsersAddFail: false,
        isUsersUpdate: false,
        isUsersUpdateFail: false,
        isUsersDelete: false,
        isUsersDeleteFail: false,
        
    },
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersList.fulfilled, (state, action) => {
            state.usersList = action.payload.data;
            state.isUsersCreated = false;
            state.isUsersSuccess = true;
        });
        builder.addCase(getUsersList.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isUsersCreated = false;
            state.isUsersSuccess = true;
        });

        builder.addCase(addNewUsers.fulfilled, (state, action) => {
            state.usersList.push(action.payload.data);
            state.isUsersCreated = true;
            state.isUsersAdd = true;
            state.isUsersAddFail = false;
        });
        builder.addCase(addNewUsers.rejected, (state, action) => {
            /*     state.error = action.error || null;
                   state.isUsersAdd = false;
                   state.isUsersAddFail = true; */
            state.error = action.error;
        });
        builder.addCase(updateUsers.fulfilled, (state, action) => {
            state.usersList = state.usersList.map(users =>
                users.id_user.toString() === action.payload.id_user
                    ? { ...users, ...action.payload.data }
                    : users
            );
            state.isUsersUpdate = true;
            state.isUsersUpdateFail = false;
        });
        builder.addCase(updateUsers.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isUsersUpdate = false;
            state.isUsersUpdateFail = true;
        });
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            state.usersList = state.usersList.filter(users => users.id_user.toString() !== action.payload.users.toString());
            state.isUsersDelete = true;
            state.isUsersDeleteFail = false;
        });
        builder.addCase(deleteUsers.rejected, (state, action) => {
            state.error = action.payload.error || null;
            state.isUsersDelete = false;
            state.isUsersDeleteFail = true;
        });
    }
});

export default UsersSlice.reducer;