const sequelize = require('../config/database');
const User = require('./user');
const Task = require('./task');

const syncDb = async () => {
await sequelize.sync({ alter: true });
};

module.exports = { sequelize, User, Task, syncDb };
