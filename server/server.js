const express = require("express");
const app = express();
app.set("trust proxy",1)
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//session import
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
// relax the security applied to an API
const cors = require("cors");
//loads env variable into a process.env
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
// get driver connection
const dbo = require("./db/conn");
const Db = process.env.ATLAS_URI;

// setting up connect-mongodb-session store
const store = new MongoDBStore({
  uri: Db,
  databaseName:"sessions",
  collection: "userSession"
});

app.use(cors({
  credentials: true,
  origin:"http://localhost:3000",
  optionsSuccessStatus:200,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true, limit: "30mb"}));
app.use(bodyParser.json({limit:"30mb"}));

//Express-Session
const MAX_AGE = 1000 * 60 * 60 * 1; // 1000ms*60second*60min*1hr=1hr
app.use(session({
  name: "YokiCookie",
  secret:"CAPSTONE",
  resave: true,
  saveUninitialized: false,
  store: store,
  cookie:{
      maxAge: MAX_AGE,
      httpOnly: true,
  }
}));

//routes
app.use(require("./routes/record"));
app.use(require("./routes/employee"));
app.use(require("./routes/test"));
app.use(express.static('src'));
app.use(require("./routes/users"));
app.use(require("./routes/quizzes"));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});