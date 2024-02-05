var express = require("express");
const post = require("../src/model/post");
var router = express.Router();

router.get("/newsList", async function (req, res, next) {
    let checkUser = await post.find()
    res.json({
      status: true,
      statusCode: 200,
      message: "news and announcement List",
      data: checkUser,
    });
  });

  module.exports = router;
