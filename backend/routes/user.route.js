const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model");


const userRouter=express.Router()

userRouter.post("/register",(req,res)=>{
    const {username,email,password}=req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
             if(err){
                res.send(err)
             } else {
                const user=new UserModel({username,email,password:hash})
                await user.save()
                 //res.send({msg:"Registered"})
                 res.status(200).json({ message: "User registered successfully" });
             }
        });
    }
    catch(err){
        res.send({err})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try{
    const user=await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, (err, result) =>{
           if(result){
            const token= jwt.sign({userID:user._id,username:user.username},"masai")
            res.json({msg:"Login successfull",token})
           } else {
            res.json("Wrong credentials")
           }
        });
    } else {
        res.json("Please Register first...")
    }
  } catch(err){
    res.json({err})
 }
})