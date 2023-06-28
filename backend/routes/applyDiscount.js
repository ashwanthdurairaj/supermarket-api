const express = require('express');
const router = express.Router();
const { applyDiscount, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, applyDiscount);
module.exports = router;