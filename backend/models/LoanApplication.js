const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  requestedAmount: { type: Number, required: true },
  loanProductId: { type: String, required: true }, // Can be ref to a LoanProduct model if exists
  purpose: { type: String },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed'],
    default: 'draft'
  },
  statusHistory: [
    {
      status: String,
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      note: String
    }
  ],
  assignedCoordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedVerifierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

loanApplicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
