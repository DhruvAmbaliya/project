const mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        allowNull: false
    },
    password: {
        type: String
    },
    grade_level: {
        type: String
    },
    area_of_study: {
        type: String
    },
    skills: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    is_deleted: {
        type: Boolean
    },
    token:{
        type: String
    },
    user_id:{
        type : String
    },
    role:{
        type: String
    }
})

module.exports =  mongoose.model("Teacher",teacherSchema)
