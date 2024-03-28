const {QuestionModel}=require("../model/question.model")
const express=require("express")
const {auth} = require("../Middleware/Auth")

const questionRoute=express.Router()

questionRoute.get("/",auth,async(req,res)=>{
    try{
      const questions=await QuestionModel.find()
      req.json(questions)
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})

questionRoute.post("/",auth,async(req,res)=>{
    const { quiz, questionText, options, correctAnswer } = req.body;
  try {
    const question = new QuestionModel({ quiz, questionText, options, correctAnswer });
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({msg:err.message});
  }
})

questionRoute.put("/:id",auth,async(req,res)=>{
    const questionId = req.params.id;
    const {questionText, options, correctAnswer} = req.body;
    try {
      const question = await QuestionModel.findByIdAndUpdate(
        questionId,
        {questionText, options, correctAnswer}
      );
      if (!question) {
        return res.status(404).json({msg:'Question not found'});
      }
      res.json(question);
    } catch (err) {
      res.status(500).json({msg:err.message});
    }
})

questionRoute.delete("/:id",auth,async(req,res)=>{
    const questionId = req.params.id;
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({msg:'Question not found'});
    }
    res.json({msg:'Question deleted'});
  } catch (err) {
    res.status(500).json({msg:err.message});
  }
})


module.exports={
    questionRoute
}
