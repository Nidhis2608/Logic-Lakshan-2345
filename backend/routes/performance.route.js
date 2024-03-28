const {PerformanceModel}=require("../model/performance.model")
const express=require("express")
const {auth} = require("../Middleware/Auth")

const performanceRoute=express.Router()

performanceRoute.get("/",auth, async(req,res)=>{
    try{
      const {username,userID}=req.body
      const performance=await PerformanceModel.find({username});
      res.json(performance)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

performanceRoute.post("/",auth,async(req,res)=>{
  try{
      const newPerformance= await PerformanceModel(req.body);
        newPerformance.save()
      res.status(201).json(newPerformance)
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }
})

// performanceRoute.put("/",auth,async(req,res)=>{
//     try{
//       const performance= await PerformanceModel.findById(req.params.id);
//       if(performance){
//         performance.user=req.body.user || performance.user;
//         performance.quiz = req.body.quiz || performance.quiz;
//         performance.score = req.body.score || performance.score;
//         performance.timeTaken = req.body.timeTaken || performance.timeTaken;
//         const updatedPerformance = await performance.save();
//         res.json(updatedPerformance);
//       } else {
//         res.status(404).json({msg:'Performance not found'});
//       }
//     }
//     catch(err){
//         res.status(400).json({msg: err.message});
//     }
// })

performanceRoute.patch("/:performanceID",auth,async(req,res)=>{
  const payload=req.body
  const {performanceID}=req.params
  try{
      const performance=await PerformanceModel.findOne({_id:performanceID})
      if(!performance){
           return res.status(404).json({ msg: "Invalid id" });
      } 
      if(req.body.userID===performance.userID){
    await PerformanceModel.findByIdAndUpdate({_id:performanceID},payload)
    res.json({msg:`The performance with ID:${performanceID} has been updated`})
      } else {
          res.json({msg:"You don't have access to update someone else's tasks"})
      }
  }
  catch (err){
     res.json({err})
  }
})

performanceRoute.delete("/:performanceID",auth,async(req,res)=>{
  const {performanceID}=req.params
  try{
      const performance=await PerformanceModel.findOne({_id:performanceID})
      if(!performance){
           return res.status(404).json({ msg: "Invalid id" });
      } 
      if(req.body.userID===performance.userID){
    await PerformanceModel.findByIdAndDelete({_id:performanceID})
    res.json({msg:`The performance with ID:${performanceID} has been deleted`})
      } else {
          res.json({msg:"You don't have access to delete someone else's tasks"})
      }
  }
  catch (err){
     res.json({err})
  }
})

module.exports={
    performanceRoute
}
