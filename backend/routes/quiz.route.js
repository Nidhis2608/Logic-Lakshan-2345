const {QuizModel}=require("../model/quiz.model")
const express=require("express")
const {auth} = require("../Middleware/Auth")

const quizRoute=express.Router()

quizRoute.get("/",auth, async(req,res)=>{
    try{
        const quizzes = await QuizModel.find();
        res.json(quizzes);
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

quizRoute.post("/", auth,async(req,res)=>{
    try{
        const { title, category, createdBy, questions } = req.body;
        const newQuiz = new QuizModel({ title, category, createdBy, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})


quizRoute.patch("/:quizID",auth,async(req,res)=>{
    const payload=req.body
    const {quizID}=req.params
    try{
    //     const quiz=await QuizModel.findOne({_id:quizID})
    //     if(!quiz){
    //          return res.status(404).json({ msg: "Quiz not found" });
    //     } 
    //     if(req.body.userID===quiz.userID){
    //   await QuizModel.findByIdAndUpdate({_id:taskID},payload)
    //   res.json({msg:`The quiz with ID:${quizID} has been updated`})
    //     } else {
    //         res.json({msg:"You don't have access to update someone else's tasks"})
    //     }
    const quiz = await QuizModel.findById(quizID);
        if (!quiz) {
            return res.status(404).json({ msg: "Quiz not found" });
        }
        const updatedQuiz = await QuizModel.findByIdAndUpdate(quizID, payload, { new: true });
        res.json(updatedQuiz);
    }
    catch (err){
       res.json({err})
    }
})

quizRoute.delete("/:quizID",auth,async(req,res)=>{
    // const {quizID}=req.params
    // try{
    //     const quiz=await QuizModel.findOne({_id:quizID})
    //     if(!quiz){
    //          return res.status(404).json({msg:"Invalid id"});
    //     } 
    //     if(req.body.userID===quiz.userID){
    //   await QuizModel.findByIdAndDelete({_id:taskID})
    //   res.json({msg:`The quiz with ID:${quizID} has been deleted`})
    //     } else {
    //         res.json({msg:"You don't have access to delete someone else's tasks"})
    //     }
    // }
    const { quizID } = req.params;
    try {
        const deletedQuiz = await QuizModel.findByIdAndDelete(quizID);
        if (!deletedQuiz) {
            return res.status(404).json({ msg: "Quiz not found" });
        }
        res.json({ msg: `Quiz with ID ${quizID} has been deleted` });
    }
    catch (err){
       res.json({err})
    }
})

module.exports={
    quizRoute
}

