const express = require('express');
const router = express.Router();
const { clear, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, clear);
module.exports = router;