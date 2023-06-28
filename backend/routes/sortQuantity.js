const express = require('express');
const router = express.Router();
const { sortQuantity, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, sortQuantity);
module.exports = router;