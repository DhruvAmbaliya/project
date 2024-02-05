/** @format */

import {
    STUDENT_HOME_GET_REQUEST,
    STUDENT_HOME_GET_SUCCESS,
    STUDENT_HOME_GET_ERROR,
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const getStudentReducer = (state = initialState, action) => {
    switch (action.type) {
      case STUDENT_HOME_GET_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case STUDENT_HOME_GET_SUCCESS: {
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case STUDENT_HOME_GET_ERROR: {
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
  
  export default getStudentReducer;
  