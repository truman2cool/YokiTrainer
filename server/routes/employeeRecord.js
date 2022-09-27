const express = require("express");

//use to define our routes and as a middleware to take care of communication
const employeeRecordRoutes = express.Router();

//connect to database
const dbo = require("../db/conn");

//help convert the id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

//get list of records
employeeRecordRoutes.route("employeeRecord").get(function (req, res){
    let db_connect = dbo.getDb("Menu");
    db_connect
    .collection("employeeRecords")
    .find({})
    .toArray(function (err, result){
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        username: req.body.username,
        name: req.body.name,
        birthday: req.body.birthday,
        position: req.body.category,
        phone: req.body.phone,
    };
    db_connect.collection("employeeRecords").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
    
   // This section will help you update a record by id.
   recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
       name: req.body.name,
       birthday: req.body.birthday,
       position: req.body.category,
       phone: req.body.phone,
      },
    };
    db_connect
      .collection("employeeRecords")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
   });
    
   // This section will help you delete a record
   recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("employeeRecords").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });
    
   module.exports = employeeRecordRoutes;