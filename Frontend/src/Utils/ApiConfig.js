import axios from "axios";
import { BASE_URL } from "./BaseUrl";

const JwtAuthService = {};

JwtAuthService.PostApiService = async function (data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(data?.url, data?.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

JwtAuthService.ImageApiService = async function (data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(data?.url, data?.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error, "errorAppi");
    return error;
  }
};

JwtAuthService.GetApiService = async function (data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(data.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // toast.error(`${error?.response?.data?.message}`);
    console.error(error);
    return error;
  }
};

JwtAuthService.PutApiService = async function (data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(data.url, data.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

JwtAuthService.DeleteApiService = async function (data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(data.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // toast.error(`${error?.response?.response?.data?.message}`);
    console.error(error);
    return error;
  }
};

JwtAuthService.loginApiService = async function (data) {
  try {
    const response = await axios({
      method: 'post',  
      url:BASE_URL + `users/login`,
      data:JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
        },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

JwtAuthService.adminLoginApiService = async function (data) {
  try {
    const response = await axios({
      method: 'post',  
      url:BASE_URL + `admin/login`,
      data:JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
        },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

JwtAuthService.createPostService = async function (data) {
  try {
    const response = await axios({
      method: 'post',  
      url:BASE_URL + `admin/createPost`,
      data:JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
        },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

JwtAuthService.newsApiService = async function (data) {
  try {
    const response = await axios.get(`${BASE_URL}common/newsList`);
    return response;
  } catch (error) {
    // toast.error(`${error?.response?.data?.message}`);
    console.error(error);
    return error;
  }
};

JwtAuthService.studentGetApiService = async function (data) {
  try {
    const response = await axios.get(`${BASE_URL}users/studentGet?id=${data}`);
    return response;
  } catch (error) {
    // toast.error(`${error?.response?.data?.message}`);
    console.error(error);
    return error;
  }
};

JwtAuthService.signupStudentApiService = async function (data) {
  try {
    const response = await axios({
      method: 'post',  
      url:BASE_URL + `users/signup`,
      data:JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
        },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

JwtAuthService.signupTeacherApiService = async function (data) {
  try {
    const response = await axios({
      method: 'post',  
      url:BASE_URL + `users/sign_up`,
      data:JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
        },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};


export default JwtAuthService;



