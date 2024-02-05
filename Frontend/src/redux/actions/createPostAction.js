/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
} from "../types/Types";
import { toast } from "react-toastify";

export const PostRequest = (login) => ({
  type: CREATE_POST_REQUEST,
  payload: login,
});
export const PostSuccess = (login) => ({
  type: CREATE_POST_SUCCESS,
  payload: login,
});
export const PostFailed = (error) => ({
  type: CREATE_POST_ERROR,
  payload: error,
});

export const CreatePostApi = (data) => (dispatch) => {
  console.log('data.... ', data);
  try {
    dispatch(PostRequest());
    JwtAuthService.createPostService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        // toast.success(`${response?.data?.message}`);
        dispatch(PostSuccess(response));
      } else {
        dispatch(PostFailed(response));
      }
    });
  } catch (error) {
    dispatch(PostFailed(error));
  }
};

