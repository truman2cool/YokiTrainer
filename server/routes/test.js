const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const test = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
test.route("/test").get(function (req, res) {
 let db_connect = dbo.getDb("Yoki");
 db_connect
   .collection("Test")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
test.route("/test/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("Test")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
test.route("/test/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    question: req.body.question,
    answerA: req.body.answerA,
    answerB: req.body.answerB,
    answerC: req.body.answerC,
    answerD: req.body.answerD,
    correctKey: req.body.correctKey,
 };
 db_connect.collection("Test").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
test.route("/updateTest/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    question: req.body.question,
    answerA: req.body.answerA,
    answerB: req.body.answerB,
    answerC: req.body.answerC,
    answerD: req.body.answerD,
    correctKey: req.body.correctKey,
   },
 };
 db_connect
   .collection("Test")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
test.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("Menu").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = test;