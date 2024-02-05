/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
    STUDENT_HOME_GET_REQUEST,
    STUDENT_HOME_GET_SUCCESS,
    STUDENT_HOME_GET_ERROR,
} from "../types/Types";
import { toast } from "react-toastify";

export const studentGetRequest = (news) => ({
  type: STUDENT_HOME_GET_REQUEST,
  payload: news,
});
export const studentGetSuccess = (news) => ({
  type: STUDENT_HOME_GET_SUCCESS,
  payload: news,
});
export const studentGetFailed = (error) => ({
  type: STUDENT_HOME_GET_ERROR,
  payload: error,
});

export const getStudentApi = (data) => (dispatch) => {
  console.log('data.... ', data);
  try {
    dispatch(studentGetRequest());
    JwtAuthService.studentGetApiService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        // toast.success(`${response?.data?.message}`);
        dispatch(studentGetSuccess(response));
      } else {
        dispatch(studentGetFailed(response));
      }
    });
  } catch (error) {
    dispatch(studentGetFailed(error));
  }
};

