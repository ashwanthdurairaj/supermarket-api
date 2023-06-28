const express = require('express');
const router = express.Router();
const { revokeDiscount, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, revokeDiscount);
module.exports = router;