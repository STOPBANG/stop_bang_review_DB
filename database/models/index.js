const Sequelize = require('sequelize');

const Review = require('./tables/review');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); 

db.sequelize = sequelize;
db.Review = Review;

Review.init(sequelize);
Review.associate(db);

module.exports = db;