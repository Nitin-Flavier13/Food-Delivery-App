import express from "express";
import {body,validationResult} from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const salt = await bcrypt.genSalt(10);
const jwtSecret = "UzumakiNarutoDateBayoHokage";

router.post("/loginuser",[body('email').isEmail()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    let mail = req.body.email,password = req.body.password;
   
    let encrypted_pass = await bcrypt.hash(password,salt);

    console.log(mail);
    console.log(encrypted_pass);

    try{
        console.log("reached here");
        let document = await User.findOne({email: mail});
        console.log(document);
        if(!document){
            return res.status(400).json({errors: "Try with correct Credentials"});
        }
        const pwdCompare = await bcrypt.compare(password, document.password);
        if(!pwdCompare)
            return res.status(400).json({errors: "Try with correct Credentials"});

        const data = {
            user: {
                id: document.id
            }
        } 
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({success: true,authToken: authToken});
    }
    catch(err){
        console.log("Error in createuser.js")
        res.json({success: false});
    }
});

router.post("/createuser",[body('email').isEmail(),body('password','Incorrect Password').isLength({min:5})],async (req,res)=>{
    // validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    
    let password = req.body.password;
    let encrypted_pass = await bcrypt.hash(password,salt);

    try{
        console.log("reached here");
        await User.create({
            name: req.body.name,
            password: encrypted_pass,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success: true});
    }
    catch(err){
        console.log("Error in createuser.js")
        res.json({success: false});
    }
});

export default router;