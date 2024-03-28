const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }]
}, { timestamps: true });

const QuestionModel  = mongoose.model('Question', questionSchema);

module.exports={
    QuestionModel
}