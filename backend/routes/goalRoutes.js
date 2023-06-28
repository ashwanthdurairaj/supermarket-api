const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();  
const {getGoals, postGoals, putGoals, deleteGoals, billing,} = require('../controllers/goalController')
//instead of messing this area up by writing functionalities inside each crud func., we can write them in controllers directory
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getGoals);

router.post('/', protect, postGoals);

router.put('/:id', protect, putGoals);

router.delete('/:id', protect, deleteGoals);

// router.put('/billing ', protect, billing);
module.exports = router;