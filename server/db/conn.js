const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
mongoose.connect(Db,{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  dbName: "Yoki",
  }).then(()=>{
    console.log("Mongo connected");
  }).catch(err => console.error(err));


module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("Yoki");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};