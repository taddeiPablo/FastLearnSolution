require('dotenv').config();
const mongoose = require('mongoose');
console.log(`mongodb://${process.env.MONGO_HOST}/${process.env.DATABASE_NAME}`);
const db = mongoose.createConnection(`mongodb://${process.env.MONGO_HOST}/${process.env.DATABASE_NAME}`);


module.exports = {
    DB: db
};