const { default: mongoose } = require("mongoose")
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('successfully connected to db');
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDb;