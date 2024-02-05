/** @format */

import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
  } from "../types/Types";
  
  const initialState = {
    loading: false,
    error: "",
    token: "",
  };
  
  const CreatePostReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_POST_REQUEST: {
        return {
          ...state,
          loading: true,
          error: "",
        };
      }
      case CREATE_POST_SUCCESS: {
        console.log(action);
        return {
          ...state,
          token: action?.payload,
          loading: false,
        };
      }
      case CREATE_POST_ERROR: {
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
  
  export default CreatePostReducer;
  