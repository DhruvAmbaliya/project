var express = require("express");
var router = express.Router();
const user = require('../src/model/user')
const {
    issueJWT
} = require('../src/utils/token')
const bcrypt = require('bcryptjs')

/* GET learners. */
router.get("/", function (req, res, next) {
    res.json({
        status: true,
        statusCode: 200,
        message: "Got the message",
        data: { name: "krishna" },
    });
});

/* GET Teachers. */
router.get("/studentGet", async function (req, res, next) {

    let checkUser = await user.find();
    let teachersData = checkUser.filter((val) => val.specialization);
    let StudentData = checkUser.filter((val) => val._id.toString() === req.query.id);
    let skillsData = StudentData[0].skills;
    let gradeLevel = StudentData[0].grade_level.toUpperCase();
    let compareData = teachersData.filter((val) => val.specialization.toLowerCase() === skillsData.toLowerCase());
    // console.log("reqreqreqreqreq/..... ", compareData, skillsData);
    // console.log("gradeLevel..... ", gradeLevel);
    let array = [];
    if (gradeLevel === "BEGINNER") {
        array = compareData.filter((val) => val.experience === "one")
    } else if (gradeLevel === "INTERMEDIATE") {
        array = compareData.filter((val) => val.experience === "two")
    } else if (gradeLevel === "ADVANCE") {
        array = compareData.filter((val) => val.experience === "three")
    } else if (gradeLevel === "PROFESSIONAL") {
        array = compareData.filter((val) => val.experience === "four")
    }
    // console.log("reqreqreqreqreq/..... ", array);

    res.json({
        status: true,
        statusCode: 200,
        message: "Got the message",
        data: {
            allTeachers: teachersData,
            assignTeacher: array
        }
    });
});

/* POST learners. */
router.post("/signup", async function (req, res, next) {
    try {
        let {
            name,
            email,
            password,
            grade_level,
            area_of_study,
            skills
        } = req.body

        let checkUser = await user.findOne({
            email
        })
        if (checkUser == null) {

            let userObject = new user({
                name,
                email,
                password,
                grade_level,
                area_of_study,
                skills,
                is_verified: 0,
                is_deleted: 0,
                role: 'Student'
            })
            let saveUser = await userObject.save()
            if (saveUser) {
                res.json({
                    status: true,
                    statusCode: 201,
                    message: "New Learner Created Successfully",
                    data: saveUser
                })
            } else {
                res.json({
                    status: false,
                    statusCode: 400,
                    message: "Something Went Wrong",
                    data: ""
                })
            }

        } else {
            res.json({
                status: false,
                statusCode: 200,
                message: "This User Already Exits",
                data: ""
            })
        }
    } catch (error) {
        res.json({
            status: false,
            statusCode: 400,
            message: error.message,
            data: ""
        })
    }
}
);

/* POST Teachers. */
router.post("/sign_up", async function (req, res, next) {
    try {
        let {
            name,
            email,
            password,
            experience,
            area_of_teaching,
            specialization
        } = req.body

        let checkUser = await user.findOne({
            email
        })
        if (checkUser == null) {

            let userObject = new user({
                name,
                email,
                password,
                experience,
                area_of_teaching,
                specialization,
                is_verified: 0,
                is_deleted: 0,
                role: 'Teacher'
            })
            let saveUser = await userObject.save()
            if (saveUser) {
                res.json({
                    status: true,
                    statusCode: 201,
                    message: "New Teacher Created Successfully",
                    data: saveUser
                })
            } else {
                res.json({
                    status: false,
                    statusCode: 400,
                    message: "Something Went Wrong",
                    data: ""
                })
            }

        } else {
            res.json({
                status: false,
                statusCode: 400,
                message: "This teacher is Already Exits",
                data: ""
            })
        }
    } catch (error) {
        res.json({
            status: false,
            statusCode: 400,
            message: error.message,
            data: ""
        })
    }
}
);

/* POST Login */
router.post("/login", async function (req, res) {
    try {
        let {
            email,
            password,
        } = req.body

        let checkUser = await user.findOne({
            email
        })

        if (checkUser) {
            if (checkUser.password === password) {
                let payload = {
                    id: checkUser._id,
                    email: checkUser.email
                }
                let token = await issueJWT(payload)
                res.json({
                    status: true,
                    statusCode: 200,
                    message: "User Login Successfully",
                    data: checkUser,
                    token: token
                })
            } else {
                res.json({
                    status: false,
                    statusCode: 400,
                    message: "You Entered a Wrong Password .",
                    data: ""
                })
            }

        } else {
            res.json({
                status: false,
                statusCode: 400,
                message: "This User does not Exits",
                data: ""
            })
        } //close of valid user if else
    } catch (error) {
        res.json({
            status: false,
            statusCode: 400,
            message: error.message,
            data: ""
        })
    }
}
);

module.exports = router;
