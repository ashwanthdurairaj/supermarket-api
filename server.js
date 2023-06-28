const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./backend/middleware/errorMiddleware');
const connectDB = require('./backend/config/db');
connectDB();
const app = express();

//in order to handle body (data entered by the user through post method)
app.use(express.json())
app.use(express.urlencoded({extended : false}));

app.use('/api/goals', require('./backend/routes/goalRoutes')); //route
app.use('/api/users', require('./backend/routes/userRoutes'));
app.use('/api/billing', require('./backend/routes/billing'));  
app.use('/api/sortSales', require('./backend/routes/sortSales'));
app.use('/api/sortQuantity', require('./backend/routes/sortQuantity'))  
app.use('/api/search', require('./backend/routes/search'))   
app.use('/api/clear', require('./backend/routes/clear'))
app.use('/api/applyDiscount', require('./backend/routes/applyDiscount'))          
app.use('/api/revokeDiscount', require('./backend/routes/revokeDiscount'))
app.use(errorHandler); //middleware

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})