import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupStudentApi, SignupSuccesss } from "../redux/actions/signupStudentAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


function SignupStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gradLevel, setGradLevel] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [skills, setSkills] = useState("");
  const [objective, setobjective] = useState("");

  const SignupStudentRes = useSelector((state) => state.signupStudent.token);
  console.log("SignupStudentRes... ", SignupStudentRes);

  useEffect(()=>{
dispatch(SignupSuccesss(""))
},[] )
  useEffect(() => {
    if (SignupStudentRes && SignupStudentRes.status) {
      toast.success(SignupStudentRes.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    
    if (SignupStudentRes && SignupStudentRes.status === false) {
      toast.error(SignupStudentRes.message);
    }
  }, [SignupStudentRes]);

  const signUpStudentApiCall = (e) => {
    e.preventDefault(); // Prevent default form submission behavior


  // Validations
if (fullName === "" || !isNaN(fullName)) {
  toast.error("Please provide a valid Fullname");
  return;
}
else if (email === "" || !email.includes("@gmail.com")) {
  toast.error("Please provide a valid email");
  return;
}
 else if(password=="" || !isNaN(password)){
  
  toast.error("Please provide any Password")
  return;
 }

 // // Email validation
    // if (!email.includes("@gmail.com")) {
    //   toast.error("Email must contain @gmail.com");
    //   return;
    // }

    // // Validation checks
    // if (
    //   /^\d+$/.test(fullName) ||
    //   /^\d+$/.test(password) ||
    //   /^\d+$/.test(gradLevel) ||
    //   /^\d+$/.test(areaOfStudy) ||
    //   /^\d+$/.test(skills) ||
    //   /^\d+$/.test(objective)
    // ) {
    //   toast.error("Numeric values are not allowed.");
    //   return;
    // }

    const sendData = {
      name: fullName,
      email: email,
      password: password,
      grade_level: gradLevel,
      area_of_study: areaOfStudy,
      skills: skills,
      objective: objective,
    };
    console.log("sendData... ", sendData);
    dispatch(SignupStudentApi(sendData));
  };

  return (
    <>
     <ToastContainer autoClose={4000} />
      <div className="login-container">
        <div className="screen2">
          <div className="screen__content2">
            <h3 className="singupheading" style={{ fontWeight: "600" }}>
              Signup as a Student
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
                <select name="Level" className="login__input2" value={gradLevel} onChange={(e) => setGradLevel(e.target.value)}>
                  <option value="">Knowledge Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div className="login__field">
                <select
                  name="Area of study"
                  id="pet-select"
                  className="login__input2"
                  value={areaOfStudy} onChange={(e) => setAreaOfStudy(e.target.value)}
                >
                  <option value="">Area of study</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD or Doctorate">PhD or Doctorate</option>
                  <option value="Teaching Certification">Teaching Certification</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="login__field">
                <select name="Skills" id="pet-select" className="login__input2"  value={skills} onChange={(e) => setSkills(e.target.value)}>
                  <option value="">Skills</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Reactjs">Reactjs</option>
                  <option value="Nodejs">Nodejs</option>
                  <option value="SQL">SQL</option>
                  <option value="Mongo">Mongo</option>
                </select>
              </div>
              
              <div className="login__field">
                <select
                  name="Learning Objective"
                  id="pet-select"
                  className="login__input2"
                >
                  <option value="">Learning Objective</option>
                  <option value="one">Become a Web Developer</option>
                  <option value="two">To obtain Data Analytics and Problem-Solving abilities</option>
                  <option value="three">Gain Logic Development skills</option>
                  <option value="four">Become Dev-Ops Engineer</option>
                  <option value="five">Become a Software Developer</option>
                  <option value="five">Develop Artificial Intelligence professional</option>
                  <option value="five">Acquire knowledge of Quality Assurance</option>
                </select>
              </div>
              {/* <div className="login__field">
                <select
                  name="Preferred objective"
                  id="pet-select"
                  className="login__input2"
                  value={objective} onChange={(e) => setobjective(e.target.value)}
                >
                  <option value="English(US)">English(US)</option>
                  <option value="Englist(UK)">Englist(UK)</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div> */}
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

            {/* <Link to="/Home"  > */}
              <button className="signupbtn"   onClick={
                  signUpStudentApiCall
                  // navigate("/Home");
                }>Signup</button>
            {/* </Link> */}
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

export default SignupStudent;
