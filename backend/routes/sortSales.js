const express = require('express');
const router = express.Router();
const { sortSales, } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware')
console.log('hola')
router.put('/', protect, sortSales);
module.exports = router;