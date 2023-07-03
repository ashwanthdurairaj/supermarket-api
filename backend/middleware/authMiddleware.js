const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token
    //check authorization object of http headers
    console.log('ranjithame',req.headers.authorization)
    if(req.headers.authorization  && req.headers.authorization.startsWith('Bearer ')) {
        try
        {
            //get token from header
            token = req.headers.authorization.split(' ')[1] //get the token from bearer which bears the token
            //and splits into two indexes, first idex 'bearer', second index token
        
            //verify token
            const decoded = jwt.verify(token, 'abc123')

            //get user from the token
            req.user = await User.find({_id:decoded.id}).select('-password')
            console.log(req.user[0]._id)
            next()
 
        }catch(error)
        {
            console.log(error)
            res.status(401);
            throw new Error('Not authorized')
        }
    }
    if(!token)
    { 
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
//using this file we can protect getMe route
module.exports = { protect }