const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async() => {
    try
    {
        const conn = await mongoose.connect('mongodb+srv://ashwanth08:achu2003@adcluster.3s8qojk.mongodb.net/goalapp?retryWrites=true&w=majority');
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;