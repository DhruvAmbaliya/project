/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
  SIGN_UP_TEACHER_REQUEST,
  SIGN_UP_TEACHER_SUCCESS,
  SIGN_UP_TEACHER_ERROR,
} from "../types/Types";
import { toast } from "react-toastify";

export const SignupRequest = (signup) => ({
  type: SIGN_UP_TEACHER_REQUEST,
  payload: signup,
});
export const SignupSuccess = (signup) => ({
  type: SIGN_UP_TEACHER_SUCCESS,
  payload: signup,
});
export const SignupFailed = (error) => ({
  type: SIGN_UP_TEACHER_ERROR,
  payload: error,
});

export const SignupTeacherApi = (data) => (dispatch) => {
  console.log(' SignupApi data.... ', data);
  try {
    dispatch(SignupRequest());
    JwtAuthService.signupTeacherApiService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        // toast.success(`${response?.data?.message}`);
        dispatch(SignupSuccess(response));
      } else {
        dispatch(SignupFailed(response));
      }
    });
  } catch (error) {
    dispatch(SignupFailed(error));
  }
};

