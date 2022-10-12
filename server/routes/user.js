const express = require("express");
const userModel = require("../models/userModel");

//use to define our routes and as a middleware to take care of communication
const userRoutes = express.Router();

//connect to database
const dbo = require("../db/conn");

//help convert the id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

//get list of records
userRoutes.route("/user").get(function (req, res){
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
userRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

/*const handleNewUser = async (req, res) =>{
  const {user, pwd}= req.body;
  if(!user || !pwd) return res.status(400).json({"message":"email and password are required"})
  // check for duplicate usernames in the db
  const duplicate = usersDB.users.find(person=> person.email === user);
  if(duplicate) return res.sendStatus(409); //conflict
  try{
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
  }
}*/

// This section will help you create a new record.
userRoutes.route("/user/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = userModel(req);
    db_connect.collection("Users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
    
   // This section will help you update a record by id.
    userRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: email };
    let newvalues = {
      $set: {
        username: req.body.username,
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

   module.exports = userRoutes;