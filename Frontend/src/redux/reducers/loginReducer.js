/** @format */

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../types/Types";

const initialState = {
  loading: false,
  error: "",
  token: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: "",
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: action?.payload,
        loading: false,
      };
    }
    case LOGIN_ERROR: {
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

export default loginReducer;
