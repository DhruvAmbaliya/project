const mongoose = require('mongoose');

let connection = mongoose.connect("mongodb://127.0.0.1:27017/VirtualLearning_dbms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(connection => {
    console.log("Mongo Db Connected Successfully");
  }).catch(error => {
    console.log(error.message);
  }).catch(err => {
    console.log(err.message);
  })