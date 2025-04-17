const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  dueDate: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING }
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
