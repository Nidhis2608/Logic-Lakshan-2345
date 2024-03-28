const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true } 
}, { timestamps: true });

const PerformanceModel = mongoose.model('Performance', performanceSchema);

module.exports={
    PerformanceModel
}