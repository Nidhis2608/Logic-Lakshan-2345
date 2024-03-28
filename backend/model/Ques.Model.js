const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true, default: false }
}, { _id: false }); // Prevent automatic _id generation for options

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  category: { type: String, required: true } // Added category as a String type
}, { timestamps: true });

const QuestionModel = mongoose.model('Question', questionSchema);
module.exports=QuestionModel