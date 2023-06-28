const express = require('express');
const router = express.Router();
const { search, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
router.put('/', protect, search);
module.exports = router;