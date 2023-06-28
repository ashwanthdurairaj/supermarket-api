const express = require('express');
const router = express.Router();
const { billing, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, billing);
module.exports = router;