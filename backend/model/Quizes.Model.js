const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Added category as a simple string. Adjust as necessary.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] // References to Question documents
}, { timestamps: true });

const QuizModel = mongoose.model('Quiz', quizSchema);


module.exports=QuizModel;