const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });

const QuizModel  = mongoose.model('Quiz', quizSchema);

module.exports={
    QuizModel
}