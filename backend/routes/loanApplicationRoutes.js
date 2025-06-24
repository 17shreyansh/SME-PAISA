const express = require('express');
const router = express.Router();
const {
  createLoanApplication,
  updateLoanApplication,
  submitLoanApplication,
  getClientLoanApplications,
  getLoanApplicationById
} = require('../controllers/loanApplicationController');
const { protect } = require('../middlewares/auth');

router.use(protect);

// Client creates a new loan application (draft)
router.post('/', createLoanApplication);

// Client updates a loan application (draft)
router.put('/:id', updateLoanApplication);

// Client submits a loan application
router.post('/:id/submit', submitLoanApplication);

// Get all applications for the logged-in client
router.get('/', getClientLoanApplications);

// Get a single application by ID
router.get('/:id', getLoanApplicationById);

module.exports = router;
