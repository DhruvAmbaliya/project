const mongoose = require('mongoose');

let connection = mongoose.connect("mongodb+srv://dhruvambaliya72:Dhruvambaliya2002@cluster0.iv4rqtw.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(connection => {
    console.log("Mongo Db Connected Successfully");
  }).catch(error => {
    console.log(error.message);
  }).catch(err => {
    console.log(err.message);
  })