var express = require("express");
var router = express.Router();
const admin = require("../src/model/admin");
const { issueJWT } = require("../src/utils/token");
const bcrypt = require("bcryptjs");
const user = require("../src/model/user");
const post = require("../src/model/post");

/* GET learners. */
router.get("/", function (req, res, next) {
  res.json({
    status: true,
    statusCode: 200,
    message: "Got the message",
    data: { name: "krishna" },
  });
});

/* POST learners. */
router.post("/signup", async function (req, res, next) {
  try {
    let { name, email, password } = req.body;

    let checkUser = await admin.findOne({
      email,
    });
    if (checkUser == null) {
      let userObject = new admin({
        name,
        email,
        password,
        role:"Admin"
      });
      let saveUser = await userObject.save();
      if (saveUser) {
        res.json({
          status: true,
          statusCode: 201,
          message: "Admin Created Successfully",
          data: saveUser,
        });
      } else {
        res.json({
          status: false,
          statusCode: 400,
          message: "Something Went Wrong",
          data: "",
        });
      }
    } else {
      res.json({
        status: false,
        statusCode: 200,
        message: "This Admin Already Exits",
        data: "",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      statusCode: 400,
      message: error.message,
      data: "",
    });
  }
});

/* POST Login */
router.post("/login", async function (req, res) {
  try {
    let { email, password } = req.body;

    let checkUser = await admin.findOne({
      email,
    });
    if (checkUser) {
      if (checkUser.password === password) {
        // let updateOtp=await user.updateOne({_id : checkUser._id}, {$set :{is_verified:1}});
        let payload = {
          id: checkUser._id,
          email: checkUser.email,
        };
        let token = await issueJWT(payload);
        res.json({
          status: true,
          statusCode: 200,
          message: "Admin Login Successfully",
          data: checkUser,
          token: token,
        });
      } else {
        res.json({
          status: false,
          statusCode: 400,
          message: "You Entered a Wrong Password .",
          data: "",
        });
      }
    } else {
      res.json({
        status: false,
        statusCode: 200,
        message: "This Admin does not Exits",
        data: "",
      });
    } //close of valid user if else
  } catch (error) {
    res.json({
      status: false,
      statusCode: 400,
      message: error.message,
      data: "",
    });
  }
});

/* GET learners. */
router.get("/allUser", async function (req, res, next) {
  let checkUser = await user.find();
  res.json({
    status: true,
    statusCode: 200,
    message: "user list",
    data: checkUser,
  });
});

router.post("/createPost", async function (req, res, next) {
  try {
    let { Heading, Description, startTime, endTime} = req.body;
    // let checkUser = await post.find();
    // console.log("checkUser... ", checkUser);
    let obj = {
        Heading,
        Description,
        startTime,
        endTime
      }
    let postObject = new post(obj);
    let savePost = await postObject.save();

    if (savePost) {
      res.json({
        status: true,
        statusCode: 201,
        message: "News and Announcements posted successfully",
        data: savePost,
      });
    } else {
      res.json({
        status: false,
        statusCode: 400,
        message: "Something Went Wrong",
        data: "",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      statusCode: 400,
      message: error.message,
      data: "",
    });
  }
});

module.exports = router;
