/** @format */

import {
    NEWS_REQUEST,
    NEWS_SUCCESS,
    NEWS_ERROR,
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEWS_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case NEWS_SUCCESS: {
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case NEWS_ERROR: {
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
  
  export default newsReducer;
  