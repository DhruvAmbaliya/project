import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../src/redux/actions/loginAction";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SignupSuccess } from "../redux/actions/signupTeacherAction";
import { SignupSuccesss } from "../redux/actions/signupStudentAction";
import { AdminLoginApi } from "../redux/actions/adminLoginAction";



const Login = ()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const AdminLoginRes = useSelector((state) => state.adminLoginReducer.token.data);
  console.log('AdminLoginRes... ', AdminLoginRes);

  useEffect(()=>{
    if(AdminLoginRes && AdminLoginRes.status){
      toast.success(AdminLoginRes.message);
      setTimeout(() => {
        navigate("/AdminHome");

      }, 2000);
    }
    if(AdminLoginRes && AdminLoginRes.status === false){
      toast.error(AdminLoginRes.message);

    }
  },[AdminLoginRes])

  const loginApiCall = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if(email === '' && password === ''){
      toast.error("Please enter Email id and password");
    }else if(email === ''){
      toast.error("Please enter Email id");
    }else if(password === ""){
      toast.error("Please enter Password");
    }else{
      const sendData = {
        email: email,
        password: password
      }
      console.log('sendData... ', sendData);
      dispatch(AdminLoginApi(sendData));
    }
  }
  return (
    <>
            <ToastContainer autoClose={2000} />
      <div className="login-container">
        <div className="screen">
          <div className="screen__content">
            <h1 style={{ fontWeight: "600" }}>Login</h1>
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="login-btn"
                onClick={
                  loginApiCall
                  // navigate("/Home");
                }
              >
                {/* <span className="button__text"> */}
                Admin Login
                {/* </span> */}
                {/* <i className="button__icon fas fa-chevron-right"></i> */}
              </button>
            </form>
            {/* <div className="social-login">
              <h5
                className="signup"
                onClick={() => {
                  navigate("/signup");
                }}
                style={{ textDecoration: "underline", fontSize: "17px" }}
              >
                Signup as a teacher
              </h5>
              <h5
                className="signup"
                onClick={() => {
                  navigate("/signupstudent");
                }}
                style={{ textDecoration: "underline", fontSize: "17px" }}
              >
                Signup as a student
              </h5>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div> */}
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape1">
              KNOWLEDGE LAND VIRTUAL LEARNING PLATFORM
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
