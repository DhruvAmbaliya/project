/** @format */

import {
    ADMIN_LOGIN_ERROR,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const adminLoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_LOGIN_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case ADMIN_LOGIN_SUCCESS: {
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case ADMIN_LOGIN_ERROR: {
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
  
  export default adminLoginReducer;
  