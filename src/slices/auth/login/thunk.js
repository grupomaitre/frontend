import { getFirebaseBackend } from "../../../helpers/firebase_helper";
//import { useNavigate } from "react-router-dom";
import {
  postFakeLogin
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

const fireBaseBackend = getFirebaseBackend();
export const loginUser = (user) => async (dispatch) => {
 // const navigate = useNavigate();
  try {
    const response = await postFakeLogin({
      user_name: user.userName,
      password: user.password,
    });

    if (response.status === "success") {
      const data = response.data;
      sessionStorage.setItem("authUser", JSON.stringify(data));
      document.cookie = `authUser=${JSON.stringify(data)}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;

      console.log(response.data)
      dispatch(loginSuccess(data));
    //  navigate('/dashboard')
    } else {
      dispatch(apiError(response));
    }
  } catch (error) {
    console.error(error);
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");

  } catch (error) {
    dispatch(apiError(error));
  }
};



export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};