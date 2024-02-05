import React, { useEffect, useState } from "react";
import { NewsApi } from "../redux/actions/newsAction";
import { useDispatch, useSelector } from "react-redux";
import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import icon from "../../src/images/insta.png"; // add images, please make sure they can be set as src
import { CreatePostApi, PostSuccess } from "../redux/actions/createPostAction";
import { ToastContainer, toast } from "react-toastify";
import { SignupSuccess, SignupTeacherApi } from "../redux/actions/signupTeacherAction";
import { SignupStudentApi, SignupSuccesss } from "../redux/actions/signupStudentAction";

const AdminAdd = () => {
    const dispatch = useDispatch();
    const postRes = useSelector((state) => state.CreatePostReducer.token.data);
    const SignupStudentRes = useSelector((state) => state.signupStudent.token);
    const SignupTeacherRes = useSelector((state) => state.signupTeacher.token.data);
    const [heading, setHeading] = useState("News & Announcement");
    const [newsState, setNewsState] = useState({
        heading: '',
        description: '',
        startTime: '',
        endTime: ""
    });
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [experince, setExperince] = useState('');
    const [fullName1, setFullName1] = useState("");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const [gradLevel, setGradLevel] = useState("");
    const [areaOfStudy, setAreaOfStudy] = useState("");
    const [skills, setSkills] = useState("");
    const [objective, setobjective] = useState("");


    useEffect(()=>{
        if(SignupTeacherRes && SignupTeacherRes.status){
          toast.success(SignupTeacherRes.message);
          dispatch(SignupSuccess(""));
        }
        if(SignupTeacherRes && SignupTeacherRes.status === false){
          toast.error(SignupTeacherRes.message);
        }
      },[SignupTeacherRes])

      useEffect(() => {
        if (SignupStudentRes && SignupStudentRes.status) {
          toast.success(SignupStudentRes.message);
          dispatch(SignupSuccesss(""));
        }
        
        if (SignupStudentRes && SignupStudentRes.status === false) {
          toast.error(SignupStudentRes.message);
        }
      }, [SignupStudentRes]);

    useEffect(() => {
        if (postRes && postRes.status) {
            toast.success(postRes.message);
            dispatch(PostSuccess(""))
        }
        if (postRes && postRes.status === false) {
            toast.error(postRes.message);

        }
    }, [postRes])

    const handleInputChange = (field, value) => {
        setNewsState({ ...newsState, [field]: value })
    }

    const createPostApiCall = () => {
        const data = newsState;
        dispatch(CreatePostApi(data));
        let blankObj = {
            heading: '',
            description: '',
            startTime: '',
            endTime: ""
        }
        setNewsState(blankObj)
    }

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

    const signUpStudentApiCall = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        if (fullName1 === "") {
      toast.error("Please provide a valid Fullname");
      return;
    }
    else if (email1 === "") {
      toast.error("Please provide a valid email");
      return;
    }
     else if(password1 ==""){
      
      toast.error("Please provide any Password")
      return;
     }
        const sendData = {
          name: fullName1,
          email: email1,
          password: password1,
          grade_level: gradLevel,
          area_of_study: areaOfStudy,
          skills: skills,
          objective: objective,
        };
        console.log("sendData... ", sendData);
        dispatch(SignupStudentApi(sendData));
      };
    return (
        <>        <ToastContainer autoClose={2000} />
            <div className="center2">
                <div className="row_div">
                    <div className="dropdown">
                        <div className="Functionality-div">
                            <h4 for="cars">Functionality</h4>
                            <select className="login__input2" onChange={(e) => setHeading(e.target.value)} style={{ marginTop: '10px' }} name="cars" id="cars">
                                <option value="News & Announcement">News & Announcement</option>
                                <option value="Course">Course</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                    </div>
                    <div className="dropdown_func">
                        <h1>{heading}</h1>
                        {heading === 'News & Announcement' &&
                            <>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        className="login__input2"
                                        placeholder="Heading"
                                        value={newsState.heading} type="text" onChange={(e) => handleInputChange('heading', e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Description"
                                        value={newsState.description} onChange={(e) => handleInputChange('description', e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Start Time"
                                        value={newsState.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="End Time"
                                        value={newsState.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)}
                                    />
                                </div>
                                <button onClick={() => createPostApiCall()} className="post_btn">Post</button>
                            </>
                        }
                        {heading === 'Course' &&
                            <>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        className="login__input2"
                                        placeholder="Course Name"
                                        value={newsState.heading} type="text" onChange={(e) => handleInputChange('CcourseName', e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        className="login__input2"
                                        placeholder="Teacher Name"
                                        value={newsState.heading} type="text" onChange={(e) => handleInputChange('CcourseName', e.target.value)}
                                    />
                                </div>
                                <button onClick={() => createPostApiCall()} className="post_btn">Post</button>
                            </>
                        }
                        {heading === 'Student' &&
                            <form className="login2">
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Full Name"
                                        onChange={(e) => setFullName1(e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Email Address"
                                        onChange={(e) => setEmail1(e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="password"
                                        className="login__input2"
                                        placeholder="Password"
                                        onChange={(e) => setPassword1(e.target.value)}
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
                                    <select name="Skills" id="pet-select" className="login__input2" value={skills} onChange={(e) => setSkills(e.target.value)}>
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
                                <div className="login__field">
                                    <button onClick={signUpStudentApiCall} className="post_btn">Submit</button>
                                </div>
                            </form>
                        }
                        {heading === 'Teacher' &&
                            <form className="login2">
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Full Name"
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text"
                                        className="login__input2"
                                        placeholder="Email Address"
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="password"
                                        className="login__input2"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <button onClick={
                                    signUpTeacherApiCall
                                } className="post_btn">Post</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>

    );
};

export default AdminAdd;
