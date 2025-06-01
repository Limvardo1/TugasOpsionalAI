const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/admin/summary
router.get('/summary', adminController.summary);

module.exports = router;
