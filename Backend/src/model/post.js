const mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    Heading: {
        type: String
    },
    Description: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
})

module.exports =  mongoose.model("Post",newsSchema)
