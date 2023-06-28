const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    balance: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

