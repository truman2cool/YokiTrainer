const express = require("express");
const signupController = require("../controllers/signupController");
const bcrypt = require("bcrypt");
//use to define our routes and as a middleware to take care of communication
const employeeRoutes = express.Router();

//connect to database
const dbo = require("../db/conn");
const User = require("../models/userModel");


//help convert the id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

//get list of records
employeeRoutes.route("/employee").get(function (req, res){
    let db_connect = dbo.getDb("Yoki");
    db_connect
    .collection("Users")
    .find({})
    .toArray(function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you get a single record by id
employeeRoutes.route("/employee/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// This section will help you create a new record.
/*employeeRoutes.route("/employee/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password,
    }
    db_connect.collection("Users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });*/


// This section will help you create a new record.
employeeRoutes.route("/employee/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    const { username, email, fullname, password } = req.body;

    // Check required fields
    if (!username || !email || !fullname || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //Check password length
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password should be atleast 6 characters long" });
    }
    User.findOne({ username: username }).then((user) => {
      if (user) return res.status(400).json({ msg: "Username already exists" });
    //New User created
    const newUser = new User({
      username,
      email,
      fullname,
      password
    });

    //Password hashing
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        // Save user
        newUser.save().then(res.json({msg: "Successfully Registered"}))
          .catch((err) => console.log(err));
        })
        );
        //db_connect.collection("Users").insertOne(newUser);
    });
});

  //employeeRoutes.route("/employee/add").post(signupController.handleNewUser);

   // This section will help you update a record by id.
    employeeRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: email };
    let newvalues = {
      $set: {
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.username,
        password: req.body.password,
      },
    };
    db_connect
      .collection("Users")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 Employee document updated");
        response.json(res);
      });
   });
    
   // This section will help you delete a record
   employeeRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("Users").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 Employee document deleted");
      response.json(obj);
    });
   });
    
   module.exports = employeeRoutes;