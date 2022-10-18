const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dbo = require("../db/conn");
let db_connect = dbo.getDb();

const handleNewUser = async (req, res) =>{
  const {username, email, fullname, pwd}= req.body;
  //check fields
  if(!username || !email || !fullname || !pwd) return res.status(400).json({"message":"All fields are required"})
  // check for duplicate emails in the db
  const duplicate = await User.findOne({user: username}).exec();
  if(duplicate) return res.sendStatus(409); //conflict
  //check pw length
  if(pwd.length < 6){
    return res.status(400).json({ msg: "Password should be atleast 6 characters long" });
  }
  try{  
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store new user
    const result = await User.create({
      "username": username,
      "email": email,
      "fullname": fullname,
      "password": hashedPwd
    });
    db_connect.collection("Users").insertOne(result);
    console.log(result);
    res.status(201).json({"success":`New user ${User} created!`})
  }
  catch (err) {
        res.status(500).json({ 'message': err.message });
  }
}

module.exports = {handleNewUser};