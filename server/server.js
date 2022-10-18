const express = require("express");
const app = express();
//const session = require("express-session");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//routes
app.use(require("./routes/record"));
app.use(require("./routes/employee"));
app.use(require("./routes/user"));

// get driver connection
const dbo = require("./db/conn");

/*const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
// Express-Session
app.use(
  session({
    name: "localhost:5000", //name to be put in "key" field in postman etc
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: dbo,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: true
    }
  })
);*/

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});