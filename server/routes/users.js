const express = require("express");
const bcrypt = require("bcrypt");
const validation = require("validator");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const checkauth = require("../middleware/checkauth");
const {loginValidator, registerValidator} = require("../validators/validators");

const router = express.Router();


router.post("/register", (req, res)=>{
    const {errors, isValid} = registerValidator(req.body);
    if(!isValid){
        res.json({success: false, errors});
    }else{
        const{username, email, fullname, password} = req.body;
        const registerUser = new User({
            username,
            email,
            fullname,
            password,
        });
        bcrypt.genSalt(12, (err, salt)=>{
            bcrypt.hash(registerUser.password, salt, (hashErr, hash)=>{
                if (err||hashErr){
                    res.json({message: "Error occured hashing", success: false})
                    return; 
                }
                registerUser.password = hash;
                registerUser.save().then(()=>{
                    res.json({message:"User created successfully", "success":true});
                }).catch(er=> res.json({message:er.message, success: false}));
            })
        })
    }
})

module.exports = router;