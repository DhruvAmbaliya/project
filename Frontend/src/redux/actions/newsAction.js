/** @format */

import JwtAuthService from "../../Utils/ApiConfig";

import {
    NEWS_REQUEST,
    NEWS_SUCCESS,
    NEWS_ERROR,
} from "../types/Types";
import { toast } from "react-toastify";

export const newsRequest = (news) => ({
  type: NEWS_REQUEST,
  payload: news,
});
export const newsSuccess = (news) => ({
  type: NEWS_SUCCESS,
  payload: news,
});
export const newsFailed = (error) => ({
  type: NEWS_ERROR,
  payload: error,
});

export const NewsApi = (data) => (dispatch) => {
  console.log('data.... ', data);
  try {
    dispatch(newsRequest());
    JwtAuthService.newsApiService(data).then((response) => {
      console.log('data......response.... ',  response)
      if (response?.status) {
        // toast.success(`${response?.data?.message}`);
        dispatch(newsSuccess(response));
      } else {
        dispatch(newsFailed(response));
      }
    });
  } catch (error) {
    dispatch(newsFailed(error));
  }
};

