const mongoose = require('mongoose');

const dbConnect = async(mongoURI)=>{
    try {
       await mongoose.connect(mongoURI);
       console.log('database connected successfully...');
    } catch (err) {
        console.log('Database connection error',err);
    }
}

module.exports = dbConnect;