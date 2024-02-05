import React, { useEffect, useState } from "react";
import Vecotr from "./images/Vector.png";
import Cap from "./images/cap.png";
import Setting from "./images/setting.png";
import exit from "./images//exit.png";
import search from "./images/search.png";
import bellicon from "./images/bellicon.svg";
import profile from "./images/profile.png";
import insta from "./images/insta.png";
import { Link } from "react-router-dom";
import Course from "./Components/Course";
import SettingScreen from "./Components/SettingScreen";
import imageuser from "./images/Illustration.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import ViewDetails from "./Components/ViewDetails";
import { useDispatch, useSelector } from "react-redux";
import AdminAdd from "./Components/AdminAdd";

const AdminHome = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [allTeachers, setAllTeachers] = useState([]);
  const [assignTeacher, setAssignTeacher] = useState([]);
  const [setting, setsetting] = useState(false);
  const [openModal, setsetOpenModal] = useState(false);
  const [view, setview] = useState(false);
  const handleClose = () => setsetOpenModal(false);
  const handleShow = () => setsetOpenModal(true);
  const [course, setcourse] = useState(true);
  const [viewDetail, setViewDetail] = useState(false);

  const AdminLoginRes = useSelector((state) => state.adminLoginReducer.token.data);

  useEffect(() => {
    if (AdminLoginRes && AdminLoginRes.data && AdminLoginRes.data.name) {
      setRole(AdminLoginRes.data.role)
      setName(AdminLoginRes.data.name);
    //   dispatch(getStudentApi(AdminLoginRes.data._id))
    }
  }, [AdminLoginRes])

  return (
    <>
      <div style={{ margin: "10px", display: "flex" }}>
        <div className="sidescreen">
          <h1 className="side-heading">KL</h1>

          <Link
            onClick={() => (
              setshow(false),
              setsetting(false),
              setview(false),
              setcourse(true),
              setViewDetail(false)
            )}
          >
            <img className="icons" src={Vecotr} />
          </Link>
          <Link
            onClick={() => (
              setshow(true),
              setsetting(false),
              setview(false),
              setcourse(false),
              setViewDetail(false)
            )}
          >
            <img className="icons" src={Cap} />
          </Link>
          <Link
            onClick={() => (
              setshow(false),
              setsetting(true),
              setview(false),
              setcourse(false),
              setViewDetail(false)
            )}
          >
            <img className="icons" src={Setting} />
          </Link>
          <Link>
            <img id="lasticon" className="icons" src={exit} />
          </Link>
        </div>
        <div className="mainscreen">
          <div className="header">
            <div className="leftsection">
              <div style={{ marginLeft: "30px" }}>
                <h1 className="header-head">
                  Hello! {name}
                </h1>
                <p style={{ fontWeight: "600" }} className="header-text">
                  its good to see you again
                </p>
              </div>
              <img src={imageuser} className="head-img" />
            </div>
            <div className="rightsection">
              <div
                className="searchbar inpt"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img className="search" src={search} />
                <input placeholder="serachcourse" className="searchbar inpt" />
              </div>
              <div className="notification">
                <img
                  className="bellicon"
                  onClick={handleShow}
                  src={bellicon}
                  alt=""
                />
                <Link>
                  <img className="profileimg" src={profile} alt="" />
                </Link>
              </div>
            </div>
          </div>
          {show && (
            <div className="center">
              <div className="student">
                <h4 className="title ">All Students</h4>
                {allTeachers && allTeachers.map(val => {
                  return (
                    <div className="list">
                      <div className="iconname">
                        <div className="iconimg">
                          {" "}
                          <Link>
                            <img className="instaimg" src={insta} alt="" />
                          </Link>
                        </div>
                        <h4 className="data-name">{val.name}</h4>
                      </div>
                      <button
                        className="btn"
                        onClick={() => {
                          setViewDetail(true);
                          setshow(false);
                        }}
                      >
                        View Info
                      </button>
                    </div>
                  )
                })
                }
              </div>

              <div className="student">
                <h4 className="title">All Teachers</h4>
               {assignTeacher && assignTeacher.map(val => {
                return (
                  <div className="list">
                  <div className="iconname">
                    <div className="iconimg">
                      {" "}
                      <Link>
                        <img className="instaimg" src={insta} alt="" />
                      </Link>
                    </div>
                    <h4 className="data-name">{val.name}</h4>
                  </div>
                  <button className="btn"
                   onClick={() => {
                    setViewDetail(true);
                    setshow(false);
                  }}>View Info</button>
                </div>
                )
               }) }
              </div>
            </div>
          )}
          {setting && <SettingScreen />}
          {course && <AdminAdd />}
          {viewDetail && <ViewDetails />}
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={handleClose}
        className="notification-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 style={{ fontWeight: "600" }}>Notificatons</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className="modal-div">
              <div className="list" style={{ marginTop: "0px" }}>
                <div className="iconname-modal">
                  <div className="iconimg-modal">
                    {" "}
                    <Link>
                      <img className="instaimg" src={insta} alt="" />
                    </Link>
                  </div>
                  <h4 className="data-name" style={{ fontSize: "15px" }}>
                    Krishna Joshi
                  </h4>
                  <h4 className="data-name" style={{ fontSize: "15px" }}>
                    requested for virtual individual class
                  </h4>
                </div>
              </div>
              <button className="modal-btn" style={{ marginLeft: "10px" }}>
                Approve
              </button>
              <button className="modal-btn" style={{ marginLeft: "10px" }}>
                Reject
              </button>
            </div>
            <div className="modal-div">
              <div className="list" style={{ marginTop: "0px" }}>
                <div className="iconname-modal">
                  <div className="iconimg-modal">
                    {" "}
                    <Link>
                      <img className="instaimg" src={insta} alt="" />
                    </Link>
                  </div>
                  <h4 className="data-name" style={{ fontSize: "15px" }}>
                    Yash Malawant
                  </h4>
                  <h4 className="data-name" style={{ fontSize: "15px" }}>
                    requested for group in-person class
                  </h4>
                </div>
              </div>
              <button className="modal-btn" style={{ marginLeft: "10px" }}>
                Approve
              </button>
              <button className="modal-btn" style={{ marginLeft: "10px" }}>
                Reject
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminHome;
