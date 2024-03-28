const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  username:String,
  userID:String,
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true } 
}, { timestamps: true });

const PerformanceModel = mongoose.model('Performance', performanceSchema);

module.exports={
    PerformanceModel
}