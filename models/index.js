const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;

const mongoURL = process.env.MONGO_URL;

const db = {};
db.mongoose = mongoose;
db.url = mongoURL;
db.tasks = require('./taskModel')(mongoose);
db.users = require('./userModel')(mongoose);
db.googleUser = require('./googleUsers')(mongoose);

module.exports = db;