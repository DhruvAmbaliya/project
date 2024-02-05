/** @format */

import {
    SIGN_UP_STUDENT_REQUEST,
    SIGN_UP_STUDENT_SUCCESS,
    SIGN_UP_STUDENT_ERROR,
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const signupStudentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_UP_STUDENT_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case SIGN_UP_STUDENT_SUCCESS: {
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case SIGN_UP_STUDENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default signupStudentReducer;
  