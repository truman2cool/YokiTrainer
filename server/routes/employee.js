const express = require("express");
const bcrypt = require("bcrypt");
const validation = require("validator");
//use to define our routes and as a middleware to take care of communication
const employeeRoutes = express.Router();
const jwt = require("jsonwebtoken");
//connect to database
const dbo = require("../db/conn");
const User = require("../models/userModel");
const checkauth = require("../middleware/checkauth");
//help convert the id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

//get list of records
/*employeeRoutes.route("/employee").get(function (req, res){
    let db_connect = dbo.getDb("Yoki");
    db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result){
        if (err) throw err;
        res.json(result);
    });
});*/

employeeRoutes.get("/employee", checkauth, (req, res)=>{
  let db_connect = dbo.getDb("Yoki");
  db_connect
  .collection("users")
  .find({})
  .toArray(function (err, result){
      if (err) throw err;
      res.json(result);
  });
});

// This section will help you get a single record by id
/*employeeRoutes.route("/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
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
    User.findOne( {$or:[{username}, {email}]}).then((user) => {
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
  User.findOne({username}).then((user) => {
    if (!user) return res.status(400).json({ msg: "Invalid crendentials" });
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      //const sessUser = { username: user.username, fullname: user.fullname};
      //req.session.sessUser = sessUser; // Auto saves session data
      //req.session.authorized = true;
      //res.set("Set-Cookie",`session=${req.sessionID}`);
      const payload ={
        id: user._id,
        username: user.username
      }
      jwt.sign(
        payload, 
        process.env.APP_SECRET, {expiresIn: 2155926},
        (err,token)=>{
          res.json({
            msg: "Logged In Successfully",
            user,
            token:"Bearer token: " + token,
            success: true
          })
        }
      )
      // sends cookie with sessionID automatically in response
      //res.json({ msg: "Logged In Successfully", username });
      //console.log("Logged in successfully", req.sessionID);
    });
  });
});

/*employeeRoutes.route("/login").post(async function (req, res) {
  const { errors, isValid } = loginValidator(req.body);
  if (!isValid) {
      res.json({ success: false, errors });
  } else {
      Users.findOne({ email: req.body.email }).then(user => {
          if (!user) {
              res.json({ message: 'Email does not exist', success: false });
          } else {
              bcrypt.compare(req.body.password, user.password).then(success => {
                  if (!success) {
                      res.json({ message: 'Invalid password', success: false });
                  } else {
                      const payload = {
                          id: user._id,
                          name: user.firstName
                      }
                      jwt.sign(
                          payload,
                          process.env.APP_SECRET, { expiresIn: 2155926 },
                          (err, token) => {
                              res.json({
                                  user,
                                  token: 'Bearer token: ' + token,
                                  success: true
                              })
                          }
                      )
                  }
              })
          }
      })
  }
})*/

//logout user and deletes the cookie
employeeRoutes.route("/logout").delete(async function (req, res){
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("YokiCookie"); // clears cookie containing expired sessionID
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


   employeeRoutes.get("/:id", checkauth, (req, res)=>{
    User.findOne({_id: req.params.id}).then(user=>{
      res.json({user, success: true})
    }).catch(er=>{
      res.json({success: false, message: er.message})
    })
  })

   module.exports = employeeRoutes;