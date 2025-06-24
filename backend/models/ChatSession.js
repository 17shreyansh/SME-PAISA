const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  coordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loanApplicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication' },
  startedAt: { type: Date, default: Date.now },
  closedAt: Date,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);
