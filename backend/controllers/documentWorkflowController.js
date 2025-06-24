const Document = require('../models/Document');
const LoanApplication = require('../models/LoanApplication');
const User = require('../models/User');

// Upload document (for client or associate)
exports.uploadDocument = async (req, res) => {
  try {
    const { type, loanApplicationId } = req.body;
    const file = req.file;
    const document = await Document.create({
      ownerId: req.user._id,
      clientId: req.user.clientId || req.user._id,
      loanApplicationId,
      type,
      filename: file.filename,
      path: file.path,
      uploadedBy: { user: req.user._id, role: req.user.role },
      verificationStatus: 'pending'
    });
    res.status(201).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error uploading document', error });
  }
};

// Get documents for a client or application
exports.getDocuments = async (req, res) => {
  try {
    const { clientId, loanApplicationId } = req.query;
    const query = {};
    if (clientId) query.clientId = clientId;
    if (loanApplicationId) query.loanApplicationId = loanApplicationId;
    const documents = await Document.find(query);
    res.json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching documents', error });
  }
};

// Verifier updates document status
exports.verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const document = await Document.findById(id);
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    document.verificationStatus = status;
    document.verificationNotes = notes;
    document.verifiedBy = req.user._id;
    document.verifiedAt = new Date();
    await document.save();
    res.json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating document', error });
  }
};
