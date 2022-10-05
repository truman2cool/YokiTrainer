const express = require("express");

//use to define our routes and as a middleware to take care of communication
const employeeRoutes = express.Router();

//connect to database
const dbo = require("../db/conn");

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
employeeRoutes.route("/employee/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        email: req.body.email,
        password: req.body.password,
    }
    db_connect.collection("Users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
    
   // This section will help you update a record by id.
    employeeRoutes.route("/update/:id").post(function (req, response) {
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