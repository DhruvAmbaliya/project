/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
  SIGN_UP_STUDENT_REQUEST,
  SIGN_UP_STUDENT_SUCCESS,
  SIGN_UP_STUDENT_ERROR,
} from "../types/Types";
import { toast } from "react-toastify";

export const SignupRequest = (signup) => ({
  type: SIGN_UP_STUDENT_REQUEST,
  payload: signup,
});
export const SignupSuccesss = (signup) => ({
  type: SIGN_UP_STUDENT_SUCCESS,
  payload: signup,
});
export const SignupFailed = (error) => ({
  type: SIGN_UP_STUDENT_ERROR,
  payload: error,
});

export const SignupStudentApi = (data) => (dispatch) => {
  console.log(' SignupApi data.... ', data);
  try {
    dispatch(SignupRequest());
    JwtAuthService.signupStudentApiService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        toast.success(`${response?.data?.message}`);
        dispatch(SignupSuccesss(response));
      } else {
        dispatch(SignupFailed(response));
      }
    });
  } catch (error) {
    dispatch(SignupFailed(error));
  }
};

