const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel') //to work with data in database

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({email});
    if(userExists)
    {
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create(
        {
            name,
            email,
            password,
        }
    )
    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error('Invalid data fields')
    }
})
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password)
    {
        throw new Error('Please add all fields')
    }
    const user = await User.findOne({email});
    if(user && user.password === password)
    {
        res.json({
            _id: user.id,
            email: user.email,
            name: user.name, 
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error('Invalid data fields')
    }
})
const getMe = asyncHandler(async(req, res) => {
    //const {_id, name, email} = await User.find({user : req.user.id})
    res.status(200).json(req.user[0]);
})
//generate JWT using user id

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser, loginUser, getMe,
}