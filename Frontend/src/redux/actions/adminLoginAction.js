/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
} from "../types/Types";
import { toast } from "react-toastify";

export const LoginRequest = (login) => ({
  type: ADMIN_LOGIN_REQUEST,
  payload: login,
});
export const LoginSuccess = (login) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: login,
});
export const LoginFailed = (error) => ({
  type: ADMIN_LOGIN_ERROR,
  payload: error,
});

export const AdminLoginApi = (data) => (dispatch) => {
  console.log('data.... ', data);
  try {
    dispatch(LoginRequest());
    JwtAuthService.adminLoginApiService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        // toast.success(`${response?.data?.message}`);
        dispatch(LoginSuccess(response));
      } else {
        dispatch(LoginFailed(response));
      }
    });
  } catch (error) {
    dispatch(LoginFailed(error));
  }
};

