const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) =>{
  const {user, pwd}= req.body;
  if(!user || !pwd) return res.status(400).json({"message":"email and password are required"})
  // check for duplicate usernames in the db
  const duplicate = await user.findOne({email: user}).exec();
  if(duplicate) return res.sendStatus(409); //conflict
  try{
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store new user
    const result = await userModel.create({
      "email": email,
      "password": hashedPwd
    });

    console.log(result);
    res.status(201).json({"success":`New user ${user} created!`})
  }
  catch (err) {
        res.status(500).json({ 'message': err.message });
  }
}

module.exports = {handleNewUser};