const express = require("express");
const app = express();
//session import
const session = require("express-session");
const store = require('connect-mongodb-session')(session);
// relax the security applied to an API
const cors = require("cors");
//loads env variable into a process.env
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
// get driver connection
const dbo = require("./db/conn");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Express-Session
const MAX_AGE = 1000 * 60 * 60 * 1; // 1000ms*60second*60min*1hr=1hr
app.use(session({
  name: "YokiCookie",
  secret:"CAPSTONE",
  resave: true,
  saveUninitialized: false,
  store: new store({
    mongoUrl: process.env.ATLAS_URI
  }),
  cookie:{
    maxAge: MAX_AGE,
      sameSite: false,
      //secure: ,
  }
}));

//routes
app.use(require("./routes/record"));
app.use(require("./routes/employee"));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});