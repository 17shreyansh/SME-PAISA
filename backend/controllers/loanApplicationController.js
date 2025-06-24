const LoanApplication = require('../models/LoanApplication');
const Client = require('../models/Client');
const User = require('../models/User');

// Create a new loan application (Draft)
exports.createLoanApplication = async (req, res) => {
  try {
    const { requestedAmount, loanProductId, purpose } = req.body;
    const clientId = req.user.clientId || req.user._id; // support both user and client context
    const application = await LoanApplication.create({
      clientId,
      requestedAmount,
      loanProductId,
      purpose,
      status: 'draft',
      statusHistory: [{ status: 'draft', updatedBy: req.user._id }]
    });
    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating loan application', error });
  }
};

// Update loan application (details, purpose, etc.)
exports.updateLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const application = await LoanApplication.findByIdAndUpdate(id, updates, { new: true });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating loan application', error });
  }
};

// Submit loan application
exports.submitLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await LoanApplication.findById(id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    application.status = 'submitted';
    application.statusHistory.push({ status: 'submitted', updatedBy: req.user._id });
    await application.save();
    // TODO: Notify operations/coordinator
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting loan application', error });
  }
};

// Get all applications for a client
exports.getClientLoanApplications = async (req, res) => {
  try {
    const clientId = req.user.clientId || req.user._id;
    const applications = await LoanApplication.find({ clientId });
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching applications', error });
  }
};

// Get single application by ID
exports.getLoanApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await LoanApplication.findById(id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching application', error });
  }
};
