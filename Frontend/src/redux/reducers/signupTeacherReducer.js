/** @format */

import {
    SIGN_UP_TEACHER_REQUEST,
    SIGN_UP_TEACHER_SUCCESS,
    SIGN_UP_TEACHER_ERROR
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const signupTeacherReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_UP_TEACHER_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case SIGN_UP_TEACHER_SUCCESS: {
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case SIGN_UP_TEACHER_ERROR: {
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
  
  export default signupTeacherReducer;
  