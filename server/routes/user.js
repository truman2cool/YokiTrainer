const express = require('express');

//use to define our routes and as a middleware to take care of communication
const router = express.Router();

//connect to database
const db = require('mongoose');

//help convert the id from string to ObjectId
//const ObjectId = require("mongodb").ObjectId;

//controller functions
const { signupUser, loginUser } = require('../controllers/userController');

//login get route
router.get('/login', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

//login route
router.post('/login', loginUser)
/*{
    let db_connect =dbo.getDb();
};*/

//signup route
router.post('/signup', signupUser)

module.exports = router;