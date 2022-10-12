const express = require("express");

//use to define our routes and as a middleware to take care of communication
const postsRoutes = express.Router();

//connect to database
const dbo = require("../db/conn");

// can be reached at localhost:5000/posts
postsRoutes.route("/posts").get(function (req, res){
    //let db_connect = dbo.getDb();
    res.send("Success");
})

module.exports = postsRoutes;