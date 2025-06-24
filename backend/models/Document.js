const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  loanApplicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication' },
  type: { type: String, required: true }, // e.g., 'aadhar', 'pan', 'gst', 'bank_statement', etc.
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedBy: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['client', 'associate'], required: true }
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'clarification_needed'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

documentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Document', documentSchema);
