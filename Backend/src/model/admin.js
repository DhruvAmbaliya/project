const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    token:{
        type: String
    },
    role:{
        type: String
    }
})

module.exports =  mongoose.model("Admin",userSchema)
