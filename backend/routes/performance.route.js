const {PerformanceModel}=require("../model/performance.model")
const express=require("express")

const performanceRoute=express.Router()

performanceRoute.get("/", async(req,res)=>{
    try{
      const performance=await PerformanceModel.find();
      res.json(performance)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

performanceRoute.post("/",async(req,res)=>{
    const performance= new PerformanceModel(req.body);
    try{
      const newPerformance=await performance.save()
      res.status(201).json(newPerformance)
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }
})

performanceRoute.put("/",async(req,res)=>{
    try{
      const performance= await PerformanceModel.findById(req.params.id);
      if(performance){
        performance.user=req.body.user || performance.user;
        performance.quiz = req.body.quiz || performance.quiz;
        performance.score = req.body.score || performance.score;
        performance.timeTaken = req.body.timeTaken || performance.timeTaken;
        const updatedPerformance = await performance.save();
        res.json(updatedPerformance);
      } else {
        res.status(404).json({msg:'Performance not found'});
      }
    }
    catch(err){
        res.status(400).json({msg: err.message});
    }
})

performanceRoute.delete("/",async(req,res)=>{
    try{
      const performance=await PerformanceModel.findById(req.params.id)
      if(performance){
        await performance.save()
        res.json({msg:"Performance deleted"})
      } else {
        res.status(404).json({msg:"Performance not found"})
      }
    }
    catch(err){
        res.status(400).json({msg: err.message});
    }
})

module.exports={
    performanceRoute
}
