const User = require('../models/User');
const Associate = require('../models/Associate');
const Client = require('../models/Client');

// List all associates with their clients and activity
const getAssociatesWithClients = async (req, res) => {
  try {
    const associates = await Associate.find()
      .populate('userId', 'firstName lastName email phone')
      .lean();

    const results = await Promise.all(associates.map(async (associate) => {
      const clients = await Client.find({ referredBy: associate._id })
        .populate('userId', 'firstName lastName email phone kycStatus')
        .lean();
      return {
        associate,
        clients,
        clientCount: clients.length,
        kycCompleted: clients.filter(c => c.userId.kycStatus === 'completed').length
      };
    }));

    res.json({ success: true, associates: results });
  } catch (error) {
    console.error('Error fetching associates:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Calculate commission for an associate (dynamic, based on profit and admin-set rate)
const getAssociateCommission = async (req, res) => {
  try {
    const { associateId } = req.params;
    const associate = await Associate.findById(associateId);
    if (!associate) return res.status(404).json({ success: false, message: 'Associate not found' });
    const clients = await Client.find({ referredBy: associate._id }).populate('userId', 'kycStatus');
    // Assume each client has a 'profit' field (profit from loan)
    let totalProfit = 0;
    let completed = 0;
    clients.forEach(c => {
      if (c.userId.kycStatus === 'completed' && c.profit) {
        totalProfit += c.profit;
        completed++;
      }
    });
    const commission = (associate.commissionRate / 100) * totalProfit;
    res.json({ success: true, commission, commissionRate: associate.commissionRate, totalProfit, completedClients: completed });
  } catch (error) {
    console.error('Error calculating commission:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAssociatesWithClients,
  getAssociateCommission
};
