const mongoose = require('mongoose');
const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        item_name: {
            type: String,
            required: [true, 'Please add an item name']
        },
        minimum_quantity: {
            type: Number,
            required: [true, 'Please add minimum quantity']
        },
        price: {
            type: Number,
            required: [true, 'Please add price of the item']
        },
        quantity_left: {
            type: Number,
            required: [true, 'Please add quantity']
        },
        item_type: {
            type: String,
            required: [true, 'Please add item type']
        },
        brand_name: {
            type: String,
            required: [true, 'Please add brand name']
        },
        sales: {
            type: Number,
            default: 0
        },
        quantity_sold: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Goal', goalSchema);