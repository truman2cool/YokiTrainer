const express = require("express");
const bcrypt = require("bcrypt");
const validation = require("validator");
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


// This section will help you create a new user.
employeeRoutes.route("/signup").post(async function (req, res) {
    let db_connect = dbo.getDb();
    const { username, email, fullname, password} = req.body;
    // Check required fields
    if (!username || !email || !fullname || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    // check email
    if(!validation.isEmail(email)){
      return res.status(400).json({msg: "Email not valid"})
    }
    //Check password length
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password should be atleast 6 characters long" });
    }
    //checks username
    User.findOne({ username: username } || {email: email}).then((user) => {
      if (user) return res.status(400).json({ msg: "Username or Email is already exists" });
      
    //New User created
    const newUser = new User({
      username,
      email,
      fullname,
      password,
    });

    //Password hashing
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        // Save user
        newUser.save().then(res.json({msg: "Successfully Registered"}) && console.log("Successfully Registered"))
          .catch((err) => console.log("Unsuccessful, please try again"));
        })
        );
    });
});

//login user
employeeRoutes.route("/login").post(async function (req, res) {
  const { username, password } = req.body;
  // basic validation
  if (!username || !password ) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for existing user
  User.findOne({ username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Invalid crendentials" });
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const sessUser = { username: user.username, fullname: user.fullname};
      req.session.sessUser = sessUser; // Auto saves session data
      res.json({ msg: " Logged In Successfully", sessUser });// sends cookie with sessionID automatically in response
      console.log("Logged in successfully", req.sessionID);
    });
  });
});

//logout user and deletes the cookie
employeeRoutes.route("/employee/logout").delete(async function (req, res){
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
});

//auth user
employeeRoutes.route("/auth").get(async function (req, res) {
  const sessUser = req.session.user;
  if (sessUser) {
    return res.json({ msg: " Authenticated Successfully", sessUser });
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

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