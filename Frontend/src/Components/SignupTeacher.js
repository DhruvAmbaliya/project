import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  SignupTeacherApi } from "../redux/actions/signupTeacherAction";
import { toast } from "react-toastify";

const SignupTeacher = ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [experince, setExperince] = useState('');

  const SignupTeacherRes = useSelector((state) => state.signupTeacher.token.data);
  console.log('SignupTeacherRes... ', SignupTeacherRes);


  useEffect(()=>{
    if(SignupTeacherRes && SignupTeacherRes.status){
      toast.success(SignupTeacherRes.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if(SignupTeacherRes && SignupTeacherRes.status === false){
      toast.error(SignupTeacherRes.message);
    }
  },[SignupTeacherRes])

  const signUpTeacherApiCall = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const sendData = {
      name: fullName,
      email: email,
      password: password,
      experience: experince,
      area_of_teaching: qualifications,
      specialization: specialization,
    }
    console.log('sendData... ', sendData);
    dispatch(SignupTeacherApi(sendData));
  }


  return (
    <>
      <div className="login-container">
        <div className="screen2">
          <div className="screen__content2">
            <h3 className="singupheading" style={{ fontWeight: "600" }}>
              Signup as a teacher
            </h3>
            <form className="login2">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input2"
                  placeholder="Full Name"
                  onChange={(e)=>setFullName(e.target.value)}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input2"
                  placeholder="Email Address"
                  onChange={(e)=>setEmail(e.target.value)}

                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="password"
                  className="login__input2"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="login__field">
                <select name="pets" id="pet-select" className="login__input2" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                  <option value="">Specialization</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Reactjs">Reactjs</option>
                  <option value="Nodejs">Nodejs</option>
                  <option value="SQL">MsSQL</option>
                  <option value="Mongo">MongoDB</option>
                  <option value="Mongo">Machine Learning, AI</option>
                  <option value="Mongo">DevOps</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="C, C++">C, C++</option>
                  <option value=".NET">.NET</option>
                </select>
              </div>

              <div className="login__field">
                <select name="pets" id="pet-select" className="login__input2" value={qualifications} onChange={(e) => setQualifications(e.target.value)}>
                  <option value="">Qualifications</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD or Doctorate">PhD or Doctorate</option>
                  <option value="Teaching Certification">Teaching Certification</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="login__field">
                <select name="pets" id="pet-select" className="login__input2" value={experince} onChange={(e) => setExperince(e.target.value)}>
                  <option value="">Expertise</option>
                  <option value="one">1-3 years</option>
                  <option value="two">3-5 years</option>
                  <option value="three">5-10 years</option>
                  <option value="four">More Than 10 years</option>
                </select>
              </div>
              <h5
                className="signup"
                onClick={() => {
                  navigate("/");
                }}
                style={{ textDecoration: "underline", fontSize: "17px" }}
              >
                Don't have account login
              </h5>
            </form>
            <button
              className="signupbtn"
              onClick={
                signUpTeacherApiCall
                // navigate("/Home");
              }
            >
              Signup
            </button>
            <div className="social-login">
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
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

export default SignupTeacher;
