import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data: any) => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data: any) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data: any) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data: any) => api.create(url.POST_EDIT_JWT_PROFILE, data);
export const postFakeProfile = (data: any) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// Register Method
export const postJwtRegister = (url: any, data: any) => {
  return api.create(url, data)
    .catch((err: any) => {
      //message
      let message = "Something went wrong";
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
export const postJwtLogin = (data: any) => api.create(url.POST_FAKE_JWT_LOGIN, data);
export const postJwtForgetPwd = (data: any) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);
export const getAPIKey = () => api.get(url.GET_API_KEY, null);
export const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);
//user mothods
export const getUsersList = (params: any) => api.get(url.GET_USERS_LIST, params)
export const addNewUsers = (data: any) => api.create(url.ADD_NEW_USERS, data);
export const updateUsers = (data: any) => api.update(url.UPDATE_USERS + '/' + data.id_data_personal, data);
export const deleteUsers = (data: any) => api.delete(url.DELETE_USERS + '/' + data, null);
//addNewpersonal
export const getPersonalList = () => api.get(url.GET_PERSONAL_LIST, null);
export const addNewPersonal = (data: any) => api.create(url.ADD_NEW_PERSONAL, data);
export const updatePersonal = (data: any) => api.update(url.UPDATE_PERSONAL + '/' + data.id_data_personal, data);
export const deletePersonal = (data: any) => api.delete(url.DELETE_PERSONAL + '/' + data, null);

//rubros
export const getRubrosList = (params: any) => api.get(url.GET_RUBROS_LIST, params);
export const addNewRubros = (data: any) => api.create(url.ADD_NEW_RUBROS, data);
export const updateRubros = (rubros: any) => api.update(url.UPDATE_RUBROS + '/' + rubros.id_rubro, rubros);
export const deleteRubros = (rubros: any) => api.delete(url.DELETE_RUBROS + '/' + rubros, null);
//sub rubros
export const getSubRubrosList = (params: any) => api.get(url.GET_SUBRUBROS_LIST, params);
export const addNewSubRubros = (data: any) => api.create(url.ADD_NEW_SUBRUBROS, data);
export const updateSubRubros = (subrubros: any) => api.update(url.UPDATE_SUBRUBROS + '/' + subrubros.id_sub_rubro, subrubros);
export const deleteSubRubros = (subrubros: any) => api.delete(url.DELETE_SUBRUBROS + '/' + subrubros, null);
//companys 

export const getCompanyList = () => api.get(url.GET_COMPANYS_LIST, null);
export const addNewCompany = (data: any) => api.create(url.ADD_NEW_COMPANY, data);
export const updateCompany = (data: any) => api.update(url.UPDATE_COMPANY + '/' + data.id_company, data);
export const deleteCompany = (data: any) => api.delete(url.DELETE_COMPANY + '/' + data, null);
//sucursales

export const getSucursalesList = () => api.get(url.GET_SUCURSALES_LIST, null);
export const addNewSucursales = (data: any) => api.create(url.ADD_NEW_SUCURSALES, data);
export const updateSucursales = (data: any) => api.update(url.UPDATE_SUCURSALES + '/' + data.id_sucursal, data);
export const deleteSucursales = (data: any) => api.delete(url.DELETE_SUCURSALES + '/' + data, null);
//bodega
export const getBodegasList = () => api.get(url.GET_BODEGAS_LIST, null);
export const addNewBodegas = (data: any) => api.create(url.ADD_NEW_BODEGAS, data);
export const updateBodegas = (data: any) => api.update(url.UPDATE_BODEGAS + '/' + data.id_bodega, data);
export const deleteBodegas = (data: any) => api.delete(url.DELETE_BODEGAS + '/' + data, null);
//bodega
export const getProductsList = () => api.get(url.GET_PRODUCTS_LIST, null);
export const addNewProducts = (data: any) => api.create(url.ADD_NEW_PRODUCTS, data);
export const updateProducts = (data: any) => api.update(url.UPDATE_PRODUCTS + '/' + data.id_bodega, data);
export const deleteProducts = (data: any) => api.delete(url.DELETE_PRODUCTS + '/' + data, null);
//FACTURACION
export const getCajasList = () => api.get(url.GET_CAJAS_LIST);
export const addNewCajas = (data: any) => api.create(url.ADD_NEW_CAJAS, data);
export const updateCajas = (data: any) => api.update(url.UPDATE_CAJAS + '/' + data.id_caja_diaria, data);
export const deleteCajas = (data: any) => api.delete(url.DELETE_CAJAS + '/' + data, null);
//FACTURACION CUENTAS
export const getCuentasList = (params: any) => api.get(url.GET_CUENTAS_LIST, params);
export const addNewCuentas = (data: any) => api.create(url.ADD_NEW_CUENTAS, data);
export const updateCuentas = (data: any) => api.update(url.UPDATE_CUENTAS + '/' + data.id_cuenta, data);
export const deleteCuentas = (data: any) => api.delete(url.DELETE_CUENTAS + '/' + data, null);
//clientes
export const getClientesList = () => api.get(url.GET_CLIENTES_LIST, null);
export const addNewClientes = (data: any) => api.create(url.ADD_NEW_CLIENTES, data);
export const updateClientes = (data: any) => api.update(url.UPDATE_CLIENTES + '/' + data.id_cliente, data);
export const deleteClientes = (data: any) => api.delete(url.DELETE_CLIENTES + '/' + data, null);
//tipo rubros
export const getTipoRubro = (params: any) => api.get(url.GET_TIPO_RUBRO, params);
